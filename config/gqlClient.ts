import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";

// export const httpLink = createHttpLink({
//   uri: process.env.NEXT_PUBLIC_FAUNA_DOMAIN,
// });

// const authLink = setContext((_, { headers }) => {
//   const faunaKey = process.env.NEXT_PUBLIC_FAUNA_KEY;
//   return {
//     headers: {
//       ...headers,
//       authorization: `Bearer ${faunaKey}`,
//     },
//   };
// });

// export const setAuthToken = (token: string) =>
//   setContext((_, { headers }) => ({
//     headers: {
//       ...headers,
//       authorization: `Bearer ${token}`,
//     },
//   }));

// next 내부 api 사용시 이것을 사용하세요.
// function createIsomorphLink() {
//   if (typeof window === "undefined") {
//     const { SchemaLink: schemaLink } = require("@apollo/client/link/schema");
//     const { schema } = require("../pages/api/graphql");
//     return new schemaLink({ schema });
//   } else {
//     const { HttpLink: httpLink } = require("@apollo/client/link/http");
//     return new httpLink({
//       uri: "/api/graphql",
//       credentials: "same-origin",
//     });
//   }
// }

const options = {
  connectToDevTools: true,
  // ssrMode: typeof window === "undefined",
  link: createHttpLink({
    uri: "http://localhost:4000",
    credentials: "same-origin", // `credentials`나 `headers`같은 추가적 fetch() 옵션
  }),
  // link: createIsomorphLink(),
  cache: new InMemoryCache(),
};

export const client = new ApolloClient(options);
