export interface QueryResult<T> {
  isError: boolean;
  isLoading: boolean;
  data?: T;
  error: unknown;
}
