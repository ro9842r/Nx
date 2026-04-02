import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuditEntityType } from '@oper/shared-types';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  readonly countryStrategyListLink = ['/country-strategy/list'];
  readonly countryStrategyDetailLink = ['/country-strategy/detail', '64'];
  readonly resultMatrixListLink = ['/result-matrix/list'];
  readonly resultMatrixCreateLink = ['/result-matrix/create'];
  readonly resultMatrixDetailLink = ['/result-matrix/detail', 'rm-101'];
  readonly auditEntityType = AuditEntityType.CountryStrategy;
}
