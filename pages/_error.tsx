// 프로덕션에서만 사용됩니다. 개발 중에 오류가 발생한 위치를 알기 위해 호출 스택에 오류가 발생합니다.
import { NextPageContext } from "next";

interface ErrorComponentProps {
  statusCode?: number;
}

function ErrorComponent({ statusCode }: ErrorComponentProps): JSX.Element {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

ErrorComponent.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorComponent;

/**
 * import Error from 'next/error'
 * 
 * export default function Page({ errorCode, stars }) {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }
}
 */
