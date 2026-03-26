import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuditEntityType } from '@my-workspace/shared/interfaces';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly countryStrategyListLink = ['/country-strategy/list'];
  readonly countryStrategyDetailLink = ['/country-strategy/detail', '64'];
  readonly auditCountryStrategyLink = [
    '/audit',
    AuditEntityType.CountryStrategy,
    '64',
  ];
}
