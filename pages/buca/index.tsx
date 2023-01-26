import Masonic from "@/components/Buca/Masonic";

const Buca = () => {
  return (
    <main className="flex w-full">
      <aside className="w-[375px] whitespace-pre-line break-words break-keep ">
        <div>사이드바</div>
      </aside>
      <section className="flex flex-col box-border rounded-xl w-full mt-[101px] mx-5 ">
        <header className="z-1 fixed top-0 flex align-center w-full h-[101px] bg-white">
          테그 들어갈 부분
        </header>
        <Masonic />
      </section>
    </main>
  );
};

export default Buca;
