const STATUS_CONFIG: Record<string, { cssClass: string; label: string }> = {
  draft: { cssClass: 'status-draft', label: 'Draft' },
  active: { cssClass: 'status-active', label: 'Active' },
  closed: { cssClass: 'status-closed', label: 'Closed' },
};

export function getStatusClass(status: string): string {
  return STATUS_CONFIG[status]?.cssClass ?? 'status-unknown';
}

export function getStatusLabel(status: string): string {
  return STATUS_CONFIG[status]?.label ?? status;
}
