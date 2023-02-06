import { useQuery } from "@tanstack/react-query";
import { PostData } from "@type-posts";
import { API } from "../api";
import { QUERY_KEYS } from "../queries";
import { QueryOption } from "../types";

export const useGetPosts = ({ enabled, queries }: QueryOption<PostData>) => {
  // const token = localStorage.getItem(TOKEN) || ''

  const res = useQuery(
    [QUERY_KEYS.POST.조회, ...queries],
    () => API.POST.조회(),
    {
      enabled,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      keepPreviousData: true,
      suspense: true,
      useErrorBoundary: true,
    }
  );
  return res;
};
