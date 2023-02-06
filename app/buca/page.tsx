import Masonic from "@/app/buca/Masonic";
import Sidebar from "@/ui/Sidebar";

export default function Page() {
  return (
    <main className="flex w-full">
      <Sidebar />
      <section className="flex flex-col box-border rounded-xl w-full mt-[101px] mx-5 ">
        <header className="z-1 fixed top-0 flex align-center w-full h-[101px] bg-white">
          테그 들어갈 부분
        </header>
        <Masonic />
      </section>
    </main>
  );
}
