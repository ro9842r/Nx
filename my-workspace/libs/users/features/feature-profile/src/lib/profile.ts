import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Avatar } from '@my-workspace/users/ui-components';
import { AuthService } from '@my-workspace/users/data-access';

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
