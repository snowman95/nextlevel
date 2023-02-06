"use client";

// `<Hydrate>` 구성 요소를 클라이언트 구성 요소로 다시 내보냅니다 .
// 이렇게 하면 `<Hydrate>` 가 클라이언트에서 실행되고 클라이언트 전용 기능을 사용할 수 있습니다
// 추후 'use client' 가 react-query 에 추가되면 제거해도 됩니다.
import { Hydrate as HydrateOnClient } from "@tanstack/react-query";
export default HydrateOnClient;
