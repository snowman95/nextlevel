import { useInfiniteQuery } from "@tanstack/react-query";
import { PhotoData } from "@type-photos";
import { API } from "../api";
import { QUERY_KEYS } from "../queries";
import { QueryOption } from "../types";

interface useGetPhotosProps {
  page: number;
}

export const useGetPhotos = ({
  page,
  enabled,
  queries,
}: useGetPhotosProps & QueryOption<PhotoData[]>) => {
  // const token = localStorage.getItem(TOKEN) || ''

  const res = useInfiniteQuery(
    [QUERY_KEYS.PHOTO.조회, ...queries],
    () => API.PHOTO.조회({ page }),
    {
      // 다음 페이지를 호출할 때 사용 될 pageParam 입니다. 외부에서 fetchPreviousPage 호출시 수동으로 입력해줄 수도 있습니다.
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0;
      },
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
