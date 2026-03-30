const ROLE_NAME_MAP: Record<string, string> = {
  TL: 'Team Lead',
  PM: 'Programme Manager',
  M: 'Member',
};

export function getRoleNameFromCode(code: string): string {
  return ROLE_NAME_MAP[code] ?? code;
}

export function getGroupFromRoleAndCountry(
  role: string,
  countryCode: string
): string {
  return `${countryCode}-${role}`;
}

export function sortMembersTeamLeadFirst<
  T extends { roleCode: string },
>(members: T[]): T[] {
  return [...members].sort((a, b) =>
    a.roleCode === 'TL' ? -1 : b.roleCode === 'TL' ? 1 : 0
  );
}
