import Sidebar from "@/ui/Sidebar";
import { Suspense } from "react";
import HydratedPosts from "./hydratedPosts";
import PostsLoading from "./postsLoading";

export default function Page() {
  return (
    <main className="flex w-full">
      <Sidebar />
      <section className="flex flex-col box-border rounded-xl w-full mt-[101px] mx-5 ">
        <header className="z-1 fixed top-0 flex align-center w-full h-[101px] bg-white">
          useQuery + prefetchQuery 예시
        </header>
        <Suspense fallback={<PostsLoading />}>
          {/* @ts-expect-error Server Component */}
          <HydratedPosts />
        </Suspense>
      </section>
    </main>
  );
}
