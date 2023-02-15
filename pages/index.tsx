import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="flex flex-col justify-center w-full h-full gap1">
      <Link href={"/buca"} className="bg-blue-200 border w-fit">
        뿌카
      </Link>
      <Link href={"/photos"} className="bg-blue-300 border w-fit">
        이미지들
      </Link>
      <Link href={"/posts"} className="bg-blue-300 border w-fit">
        게시물들
      </Link>
      <Link href={"/animals"} className="bg-blue-300 border w-fit">
        동물들
      </Link>
    </div>
  );
}
