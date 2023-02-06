"use client";

import * as React from "react";
import { Masonry, useInfiniteLoader } from "masonic";
import { Card } from "./Card";
import { useGetPhotos } from "@/api/hooks/useGetPhotos";

let page = 1;

const Masonic = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useGetPhotos({
      page,
      enabled: true,
      queries: [],
    });

  const lastPageCount =
    data?.pages && data?.pages.length > 0
      ? data?.pages[data?.pages.length - 1].length
      : 0;

  const photos = React.useMemo(() => {
    return data?.pages.flatMap((page) => page) || [];
  }, [data?.pages, lastPageCount]);

  const itemCount = photos ? photos?.length : 0;

  // 무한 스크롤
  const maybeLoadMore = useInfiniteLoader(
    async (start, end, currentItems) => {
      if (hasNextPage && !isFetching) {
        const nextPage = ++page;
        console.log("nextPage", nextPage);
        fetchNextPage({ pageParam: page });
      }
    },
    {
      isItemLoaded: (index, items) => !!items[index],
      minimumBatchSize: 30, // 한 번에 로드할 항목의 최소 개수
      threshold: 3, // 데이터를 미리 가져올 임계점
      // number: number // 최종 로드해야할 총 항목의 수 (알고 있는 경우에 입력)
    }
  );

  return (
    <Masonry
      onRender={maybeLoadMore}
      items={photos}
      columnGutter={30}
      columnWidth={347}
      overscanBy={1.25}
      render={Card}
    />
  );
};

export default Masonic;
