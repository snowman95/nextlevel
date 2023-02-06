declare module "@type-buca" {
  interface CardData {
    id: string;
    x: number;
    y: number;
    name: string;
    address: string;
    date: string;
    price: number;
    view: number;
    src: string;
    detail: CardDetailData;
  }

  interface CardDetailData {
    지번주소: string;
    주용도: string;
    건물유형: string;
    사용승인: string;
    토지면적: string;
    건물연면적: string;
    법정용적률: number;
    현황용적률: number;
    규모: string;

    거래금액: number;
    거래시점: string;
    건물거래면적: string;
    건물거래단가: string;
    토지거래면적: string;
    토지거래단가: string;
    거래유형: string;

    등기원인: string;
    등기접수: string;
    매도: string;
    매수: string;

    출처: string;
    메모: string[];
  }
}

declare module "@type-photos" {
  interface PhotoData {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    detail: any;
  }
}

declare module "@type-posts" {
  interface PostData {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
}
