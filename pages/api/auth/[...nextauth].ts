import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    // 커스텀 인증 ( "phoneNumber" + "password" )
    CredentialsProvider({
      // 여기서 입력한 이름을 "signIn(이름)" 형태로 사용합니다.
      name: "Credentials",
      // 여기서 작성한 타입 그대로 아래 "authorize()"의 "credentials"의 타입 적용
      // 또한 "next-auth"에서 생성해주는 로그인창에서 사용 ( http://localhost:3000/api/auth/signin )
      credentials: {
        phoneNumber: {
          label: "전화번호",
          type: "text",
          placeholder: "전화번호를 입력하세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력하세요.",
        },
      },

      // 로그인 유효성 검사
      // 로그인 요청인 "signIn("credentials", { id, password })"에서 넣어준 "id", "password"값이 그대로 들어옴
      async authorize(credentials, req) {
        if (!credentials)
          throw new Error("잘못된 입력값으로 인한 오류가 발생했습니다.");

        const { phoneNumber, password } = credentials;

        // const exUser = await prisma.user.findUnique({
        //   where: { id },
        //   include: { photo: true },
        // });
        // if (!exUser) throw new Error("존재하지 않는 아이디입니다.");

        // const result = await bcrypt.compare(password, exUser.password);
        // if (!result) throw new Error("비밀번호가 불일치합니다.");

        // 반환하는 값중에 name, email, image만 살려서 "session.user"로 들어감

        const exUser = {
          id: "1",
          name: "김철수",
          email: "kim.gmail.com",
          image: "",
        };

        return exUser; // 이 값은 callbacks 의 session 으로 들어갑니다.
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ session }) {
      // 여기서 session 은 Provider 에서 넘겨받은 정보입니다.
      // DB 에서 유저 정보 조회하여 반환하도록 해야합니다.
      console.log("Provider 에서 넘겨받은 정보", session); // 이 콘솔은 Next.js 앱 실행한 터미널에 찍힙니다.

      // const exUser = await prisma.user.findUnique({
      //   where: { name: session.user?.name },
      //   select: {
      //     idx: true,
      //     id: true,
      //     name: true,
      //     email: true,
      //     phone: true,
      //     address: true,
      //     photo: {
      //       select: {
      //         path: true,
      //       },
      //     },
      //   },
      // });

      // 기존에 "user"의 형태가 정해져있기 때문에 변경하기 위해서는 타입 재정의가 필요합니다.
      const exUser = {
        // next-auth.d.ts 에서 재정의한 타입 입니다.
        idx: 2,
        id: "2",
        name: "이철수",
        email: "jh.han@valueofspace.com",
        image: "",
      };

      session.user = exUser;

      // 여기서 반환한 session값이 "useSession()"의 "data"값이 됨
      return session;
    },
  },
  // secret: process.env.SECRET,
});
