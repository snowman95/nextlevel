import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface QueryOption<T> {
  enabled: boolean;
  queries: QueryKey[] | string[];
  options?: UseQueryOptions<T>;
}
// query hook 내부에서 select 를 하여 다른 값을 반환할 때 이것을 사용하면 됩니다. T:API응답값, R:가공한 반환타입
export interface QueryOptionWithReturn<T, R> {
  enabled: boolean;
  queries: QueryKey[] | string[];
  options?: UseQueryOptions<T, AxiosError, R>;
}
