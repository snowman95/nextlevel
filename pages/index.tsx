import Link from "next/link";

export default function IndexPage() {
  return (
    <div className="flex flex-col justify-center w-full h-full gap1">
      <Link href={"/login"} className="border w-fit">
        로그인
      </Link>
      <Link href={"/buca"} className="border w-fit">
        뿌카
      </Link>
      <Link href={"/photos"} className="border w-fit">
        이미지들
      </Link>
      <Link href={"/posts"} className="border w-fit">
        게시물들
      </Link>
      <Link href={"/animals"} className="border w-fit">
        동물들
      </Link>
    </div>
  );
}
