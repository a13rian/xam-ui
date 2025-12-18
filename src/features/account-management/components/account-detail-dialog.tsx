'use client';

import { format } from 'date-fns';
import { User, Briefcase, MapPin, Award, FileText, Globe } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import type { Account } from '../types';

interface AccountDetailDialogProps {
  account: Account;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  suspended: 'bg-gray-100 text-gray-800 border-gray-200',
};

export function AccountDetailDialog({
  account,
  open,
  onOpenChange,
}: AccountDetailDialogProps) {
  const Icon = account.type === 'individual' ? User : Briefcase;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <span>{account.displayName}</span>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline" className="capitalize text-xs">
                  {account.type}
                </Badge>
                <Badge
                  className={`${statusColors[account.status]} border text-xs`}
                  variant="outline"
                >
                  {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                </Badge>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 pr-4">
            {/* Basic Info */}
            <div>
              <h3 className="font-semibold mb-3">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Account ID</p>
                  <p className="font-mono text-xs">{account.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">User ID</p>
                  <p className="font-mono text-xs">{account.userId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p>{format(new Date(account.createdAt), 'PPP')}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Updated</p>
                  <p>{format(new Date(account.updatedAt), 'PPP')}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Professional Info */}
            {account.type === 'individual' && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Professional Information
                </h3>
                <div className="space-y-3 text-sm">
                  {account.specialization && (
                    <div>
                      <p className="text-muted-foreground">Specialization</p>
                      <p>{account.specialization}</p>
                    </div>
                  )}
                  {account.yearsExperience !== null && (
                    <div>
                      <p className="text-muted-foreground">Years of Experience</p>
                      <p>{account.yearsExperience} years</p>
                    </div>
                  )}
                  {account.certifications && account.certifications.length > 0 && (
                    <div>
                      <p className="text-muted-foreground mb-1">Certifications</p>
                      <div className="flex flex-wrap gap-1">
                        {account.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Business Info */}
            {account.type === 'business' && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Business Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {account.businessName && (
                    <div>
                      <p className="text-muted-foreground">Business Name</p>
                      <p>{account.businessName}</p>
                    </div>
                  )}
                  {account.taxId && (
                    <div>
                      <p className="text-muted-foreground">Tax ID</p>
                      <p>{account.taxId}</p>
                    </div>
                  )}
                  {account.businessLicense && (
                    <div>
                      <p className="text-muted-foreground">Business License</p>
                      <p>{account.businessLicense}</p>
                    </div>
                  )}
                  {account.companySize && (
                    <div>
                      <p className="text-muted-foreground">Company Size</p>
                      <p>{account.companySize}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Separator />

            {/* Bio / Description */}
            {account.personalBio && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Bio
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {account.personalBio}
                </p>
              </div>
            )}

            {/* Portfolio */}
            {account.portfolio && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Portfolio
                </h3>
                <a
                  href={account.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {account.portfolio}
                </a>
              </div>
            )}

            {/* Location */}
            {(account.city || account.district) && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h3>
                <p className="text-sm">
                  {[account.district, account.city].filter(Boolean).join(', ')}
                </p>
              </div>
            )}

            {/* Rejection Reason */}
            {account.status === 'rejected' && account.rejectionReason && (
              <>
                <Separator />
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Rejection Reason
                  </h3>
                  <p className="text-sm text-red-700">{account.rejectionReason}</p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
