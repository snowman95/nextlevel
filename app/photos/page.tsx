import Sidebar from "@/ui/Sidebar";
import HydratedPhotos from "./hydratedPhotos";

export default function Page() {
  return (
    <main className="flex w-full">
      <Sidebar />
      <section className="flex flex-col box-border rounded-xl w-full mt-[101px] mx-5 ">
        <header className="z-1 fixed top-0 flex align-center w-full h-[101px] bg-white">
          useInfiniteQuery + prefetchQuery 예시
        </header>
        {/* @ts-expect-error Server Component */}
        <HydratedPhotos />
      </section>
    </main>
  );
}
