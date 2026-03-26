import { Component } from '@angular/core';
import { input } from '@angular/core';
import { User } from '@my-workspace/users/data-access';

@Component({
  selector: 'lib-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  readonly user = input<User | null>(null);
}
