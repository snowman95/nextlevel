import { ApolloClient, ApolloProvider, SuspenseCache } from "@apollo/client";
import "../styles/globals.css";
import Animals from "./Animals";
import { initializeApollo, useApollo } from "./ApolloClient";
import ApolloClientProvider from "./ApolloClientProvider";
// import ReactQueryProvider from "./ReactQueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [queryClient] = useApollo(pageProps.initialApolloState));
  // const client = new ApolloClient();
  const client = initializeApollo(null);

  return (
    <html lang="en">
      <head />
      <body className="overflow-y-scroll">
        <ApolloClientProvider
          initialApolloState={JSON.stringify(client.cache.extract())} // Extract the cache from the server client
        >
          <Animals />
          {/* {children} */}
        </ApolloClientProvider>
        {/* <ApolloProvider client={client} suspenseCache={new SuspenseCache()}>
          {children}
        </ApolloProvider> */}
        {/* <ReactQueryProvider>{children}</ReactQueryProvider> */}
      </body>
    </html>
  );
}
