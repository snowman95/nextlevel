import { GET_POSTS } from "@/gql/query";
import {
  addApolloStateAndReturnPageProps,
  initializeApollo,
} from "@/config/gqlClient";
import Sidebar from "@/ui/Sidebar";
import { PostData } from "@type-posts";
import Head from "next/head";
import { Suspense } from "react";
import { SkeletonCard } from "@/ui/SkeletonCard";
import { NextPage } from "next";

export default function Posts({ data }: { data: PostData[] }) {
  return (
    <Suspense fallback={<PostsLoading />}>
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
    </Suspense>
  );
}

Posts.getLayout = function getLayout(page: NextPage) {
  return (
    <>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full">
        <Sidebar />
        <section className="flex flex-col box-border rounded-xl w-full mt-[101px] mx-5 ">
          <header className="z-1 fixed top-0 flex align-center w-full h-[101px] bg-white">
            useQuery + prefetchQuery 예시
          </header>
          <>{page}</>
        </section>
      </main>
    </>
  );
};

// 개발 모드에서는 getStaticProps가 대신 각 요청에서 실행됩니다.
export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<{ posts: PostData[] }>({
    query: GET_POSTS,
  });

  return addApolloStateAndReturnPageProps(apolloClient, {
    props: {
      data: data.posts,
    },
  });
}

function PostsLoading() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-medium text-gray-400/80">Loading...</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SkeletonCard isLoading={true} />
        <SkeletonCard isLoading={true} />
        <SkeletonCard isLoading={true} />
        <SkeletonCard isLoading={true} />
        <SkeletonCard isLoading={true} />
        <SkeletonCard isLoading={true} />
      </div>
    </div>
  );
}
