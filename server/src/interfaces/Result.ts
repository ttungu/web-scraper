export interface Result {
  totalPages?: number;
  currentPage?: number;
  totalRowsInDb?: number;
  rowCount?: number;
  results?: Array<object>;
}
