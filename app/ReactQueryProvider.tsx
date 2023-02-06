"use client";

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren, useState } from "react";

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

const options = {
  defaultOptions: {
    queries: {
      retry: 1,
      // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
};
export default function ReactQueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(options));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
        toggleButtonProps={{
          style: {
            filter: "grayscale(100%)",
            opacity: "0.3",
          },
        }}
      />
    </QueryClientProvider>
  );
}
