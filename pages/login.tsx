import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface ApiLogInBody {
  phoneNumber: string;
  password: string;
}

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
    <section className="flex justify-center w-full h-full align-center ">
      <div className="flex flex-col justify-center align-center w-[300px] h-[300px]">
        <span className="font-bold text-center font-lg">로그인 해주세요</span>
        <div className="flex flex-col gap-3">
          <LoginForm />
          <button
            className="bg-green-500 border-2 border-black rounded-md"
            onClick={() => signIn("kakao")}
          >
            카카오 로그인
          </button>
          <button
            className="bg-yellow-300 border-2 border-black rounded-md"
            onClick={() => signIn("naver")}
          >
            네이버 로그인
          </button>
        </div>
      </div>
    </section>
  );
}

const LoginForm = () => {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    async (body: ApiLogInBody) => {
      try {
        // body에 로그인을 위해 입력한 id와 password가 들어있음
        const { phoneNumber, password } = body;
        const result = await signIn("credentials", {
          // 로그인 실패 시 새로고침 여부
          redirect: false,
          phoneNumber,
          password,
          // ...body
        });
        console.log("result", result);

        // "authorize()"에서 날린 "throw new Error("")"가 "result.error"로 들어옴
        if (result?.error) {
          return result.error;
          // return toast.error(result.error);
        }

        // 만약 에러가 없다면 로그인 성공
        // 세션 쿠키가 생성됨
        // toast.success("로그인 성공. 메인 페이지로 이동합니다.");
        router.push("/");
      } catch (error) {
        console.error("error >> ", error);

        // toast.error("알 수 없는 에러로 로그인에 실패했습니다. 잠시후에 다시 시도해주세요!");
      }
    },
    [router]
  );
  return (
    <form className="flex flex-col gap-3">
      <div className="flex gap-3">
        <label htmlFor="phoneNumber">전화번호</label>
        <input
          className="bg-gray-100 "
          id="phoneNumber"
          value={phoneNumber}
          placeholder="01012345678"
          onChange={(e) => {
            const input = e.target.value;
            setPhoneNumber(input);
          }}
        />
      </div>
      <div className="flex gap-3">
        <label htmlFor="password">비밀번호</label>
        <input
          className="bg-gray-100 "
          id="password"
          type="password"
          value={password}
          placeholder="********"
          onChange={(e) => {
            const input = e.target.value;
            setPassword(input);
          }}
        />
      </div>
      <button
        className="border-2 border-black"
        onClick={() => onSubmit({ phoneNumber, password })}
      >
        로그인
      </button>
    </form>
  );
};
