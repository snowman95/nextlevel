// pages/login.tsx

import { signIn, useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log("session", session);


  if (session) {
    return (
      <>
        {session.user?.name}님 반갑습니다 <br />
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <>
      로그인되지 않았습니다 <br />
      <button onClick={() => signIn("kakao")}>카카오 로그인</button>
      <button onClick={() => signIn("naver")}>네이버 로그인</button>
    </>
  );
}
