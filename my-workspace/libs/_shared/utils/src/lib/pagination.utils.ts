import { PageParams } from '@oper/shared-types';

export function buildPageParams(page: number, pageSize: number): PageParams {
  return { page, pageSize };
}

export function calcTotalPages(totalCount: number, pageSize: number): number {
  return Math.ceil(totalCount / pageSize);
}

export function defaultPaginationState(): PageParams {
  return { page: 1, pageSize: 20 };
}
