import { API } from "@/api/api";
import { QUERY_KEYS } from "@/api/queries";
import { dehydrate } from "@tanstack/query-core";
import getQueryClient from "../../api/hooks/getQueryClient";
import HydrateOnClient from "../../api/hooks/hydrateOnClient";
import Masonic from "./Masonic";

export default async function HydratedPhotos() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([QUERY_KEYS.PHOTO.조회], () =>
    API.PHOTO.조회({ page: 0 }).then((data) => {
      return {
        pages: [data],
      };
    })
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrateOnClient state={dehydratedState}>
      <Masonic />
    </HydrateOnClient>
  );
}
