import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/config/gqlClient";
import ClientOnly from "@/ui/ClientOnly";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const apolloClient = useApollo(pageProps);

  // 각 페이지에 레이아웃이 있다면 넣어주는 코드입니다.
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <ClientOnly>{getLayout(<Component {...pageProps} />)}</ClientOnly>
    </ApolloProvider>
  );
}
export default MyApp;
