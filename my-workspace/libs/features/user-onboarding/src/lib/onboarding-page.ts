import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '@my-workspace/users-core';
import { CatalogService } from '@my-workspace/catalog-core';

@Component({
  selector: 'lib-onboarding-page',
  imports: [],
  templateUrl: './onboarding-page.html',
  styleUrl: './onboarding-page.scss',
})
export class OnboardingPage {
  private readonly auth = inject(AuthService);
  private readonly catalog = inject(CatalogService);

  constructor() {
    this.auth.login('new-user@demo.com');
    this.catalog.load();
  }

  get summary(): string {
    return `welcome ${this.auth.store.currentUser()?.name ?? 'user'} - recommended products: ${this.catalog.store.products().length}`;
  }
}
