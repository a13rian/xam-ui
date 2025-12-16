'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Sidebar state
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;

  // Modal state
  activeModal: string | null;
  modalData: Record<string, unknown> | null;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      sidebarOpen: false,
      sidebarCollapsed: false,
      activeModal: null,
      modalData: null,

      // Sidebar actions
      setSidebarOpen: (open) =>
        set({ sidebarOpen: open }, false, 'ui/setSidebarOpen'),

      toggleSidebar: () =>
        set(
          (state) => ({ sidebarOpen: !state.sidebarOpen }),
          false,
          'ui/toggleSidebar'
        ),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }, false, 'ui/setSidebarCollapsed'),

      toggleSidebarCollapsed: () =>
        set(
          (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
          false,
          'ui/toggleSidebarCollapsed'
        ),

      // Modal actions
      openModal: (modalId, data = {}) =>
        set(
          { activeModal: modalId, modalData: data },
          false,
          'ui/openModal'
        ),

      closeModal: () =>
        set({ activeModal: null, modalData: null }, false, 'ui/closeModal'),
    }),
    { name: 'UIStore' }
  )
);

// Selector hooks for optimized re-renders
export const useSidebarOpen = () => useUIStore((state) => state.sidebarOpen);
export const useSidebarCollapsed = () =>
  useUIStore((state) => state.sidebarCollapsed);
export const useActiveModal = () => useUIStore((state) => state.activeModal);
export const useModalData = () => useUIStore((state) => state.modalData);
