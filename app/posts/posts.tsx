"use client";

import { useGetPosts } from "@/api/hooks/useGetPosts";
import { SkeletonCard } from "@/ui/SkeletonCard";

// 서버 렌더링 중에 `<Hydrate>` 클라이언트 구성 요소 내에 중첩된 `useQuery` 에 대한 호출은
// 상태 속성에 제공된 미리 가져온 데이터에 액세스할 수 있습니다.
export default function Posts() {
  // This useQuery could just as well happen in some deeper child to
  // the "HydratedPosts"-component, data will be available immediately either way
  const { data, isFetching } = useGetPosts({ queries: [], enabled: true });

  // This query was not prefetched on the server and will not start
  // fetching until on the client, both patterns are fine to mix
  // const { data: otherData } = useGetPosts({
  //   queries: ["posts-2"],
  //   enabled: false,
  // });

  return (
    <section className="flex flex-col gap-5">
      {data?.map((item) => {
        return (
          <article key={item.id} className="flex flex-col border-2 ">
            <span className="font-bold">{`id: ${item.id}`}</span>
            <span>{`userId: ${item.userId}`}</span>
            <span>{`title: ${item.title}`}</span>
            <span>{`body: ${item.body}`}</span>
          </article>
        );
      })}
    </section>
  );
}
