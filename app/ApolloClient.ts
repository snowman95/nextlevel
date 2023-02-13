import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { PropsWithChildren, useMemo, useState } from "react";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createIsomorphLink() {
  if (typeof window === "undefined") {
    const { SchemaLink: schemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("../pages/api/graphql");
    return new schemaLink({ schema });
  } else {
    const { HttpLink: httpLink } = require("@apollo/client/link/http");
    return new httpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    });
  }
}

const options = {
  connectToDevTools: true,
  ssrMode: typeof window === "undefined",
  // link: createHttpLink({
  //   uri: "http://localhost:4000",
  //   credentials: "same-origin", // `credentials`나 `headers`같은 추가적 fetch() 옵션
  // }),
  link: createIsomorphLink(),
  cache: new InMemoryCache(),
};

function createApolloClient() {
  return new ApolloClient(options);
}

// 초기 상태를 기존 클라이언트 측 Apollo cache 와 merge 한 뒤 새로운 merge 데이터를 Apollo Client 의 새 cache 로 설정합니다.
export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Next.js에서 Apollo Client를 이용해 데이터를 가져오는 함수가 있다면, 초기 상태값이 여기에서 합쳐진다.
  if (initialState) {
    // 클라이언트에서의 받은 데이터인 현재 캐시 데이터를 가져온다.
    const existingCache = _apolloClient.extract();

    // 현재 캐시와 SSR 메소드인 getStaticProps/getServerSideProps로 부터 받은 데이터를 합친다.
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // 합쳐진 데이터를 저장한다
    _apolloClient.cache.restore(data);
  }

  // SSG(Server Side Generation)와 SSR(Server Side Rendering)은 항상 새로운 Apollo Client를 생성한다.
  if (typeof window === "undefined") return _apolloClient;

  // 클라이언트의 Apollo Client는 한 번만 생성한다.
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

// 이 함수는 Apollo의 캐시 데이터가 추가된 Apollo 클라이언트의 인스턴스를 가져오기 위해 initializeApollo()를 호출합니다.
// 이 클라이언트는 궁극적으로 ApolloProvider로 전달됩니다
export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}

// 현재 페이지에 대해 pageProps반환된 getStaticProps()/ 를 가져와 getServerSideProps()Apollo의 캐시 데이터에 추가합니다
// 거기에서 Next.js는 다른 페이지 관련 소품과 함께 Apollo의 캐시 데이터를 페이지 구성 요소로 전달하는 작업을 처리합니다.
export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
