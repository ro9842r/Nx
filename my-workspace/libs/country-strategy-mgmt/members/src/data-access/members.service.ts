import { Injectable } from '@angular/core';
import { Member } from '../types';

@Injectable({ providedIn: 'root' })
export class MembersService {
  loadMembers(_entityId: string, _entityType: string): Member[] {
    return [];
  }
}
