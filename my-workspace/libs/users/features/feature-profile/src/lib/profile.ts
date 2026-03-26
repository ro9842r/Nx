import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Avatar } from '../../../../ui-components/src/lib/avatar';
import { AuthService } from '@my-workspace/users';

@Component({
  selector: 'lib-profile',
  imports: [Avatar],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  private readonly auth = inject(AuthService);
  readonly user = this.auth.store.currentUser;
}
