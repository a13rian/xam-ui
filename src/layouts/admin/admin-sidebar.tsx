'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { adminNavSections, type AdminNavItem } from '@/config/admin-nav';
import { useSidebarCollapsed, useUIStore } from '@/stores';
import { ChevronLeft } from 'lucide-react';

function NavItemComponent({
  item,
  isCollapsed,
}: {
  item: AdminNavItem;
  isCollapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-indigo-100 text-indigo-900'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        isCollapsed && 'justify-center px-2',
        item.disabled && 'pointer-events-none opacity-50'
      )}
      title={isCollapsed ? item.label : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-xs font-medium text-white">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

export function AdminSidebar() {
  const isCollapsed = useSidebarCollapsed();
  const toggleCollapsed = useUIStore((s) => s.toggleSidebarCollapsed);

  return (
    <aside
      className={cn(
        'hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:border-r lg:border-gray-200 lg:bg-slate-50 transition-all duration-300',
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      )}
    >
      {/* Collapse toggle */}
      <button
        onClick={toggleCollapsed}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 text-gray-500 transition-transform',
            isCollapsed && 'rotate-180'
          )}
        />
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-6">
          {adminNavSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && !isCollapsed && (
                <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItemComponent
                    key={item.href}
                    item={item}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Admin Footer */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 px-4 py-3">
          <p className="text-xs text-gray-500">
            Admin v1.0.0
          </p>
        </div>
      )}
    </aside>
  );
}
