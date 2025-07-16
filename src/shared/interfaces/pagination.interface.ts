export interface PaginationInterface {
  page: number;
  pageSize: number;
  orderBy: string;
  order: 'asc' | 'desc';
}
