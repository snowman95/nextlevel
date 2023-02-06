import { API } from "@/api/api";
import { QUERY_KEYS } from "@/api/queries";
import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "../../api/hooks/getQueryClient";
import HydrateOnClient from "../../api/hooks/hydrateOnClient";
import Posts from "./posts";

// 미리 가져온 쿼리를 사용하는 클라이언트 구성 요소보다 구성 요소 트리에서 상위에 있는 서버 구성 요소에서 데이터를 가져옵니다.
// 미리 가져온 쿼리는 구성 요소 트리 아래의 모든 구성 요소에서 사용할 수 있습니다.
// - `QueryClient` 싱글톤 인스턴스 검색
// - 클라이언트의 prefetchQuery 메서드를 사용하여 데이터를 미리 가져오고 완료될 때까지 기다립니다.
// - 'dehydrate' 를 사용 하여 쿼리 캐시에서 프리페치된 쿼리의 탈수 상태를 얻습니다.
// - `<Hydrate>` 클라이언트 구성 요소 내부에 프리페치된 쿼리가 필요한 구성 요소 트리를 래핑하고 디하이드레이트 상태를 제공합니다.
export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([QUERY_KEYS.POST.조회], API.POST.조회);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrateOnClient state={dehydratedState}>
      <Posts />
    </HydrateOnClient>
  );
}
