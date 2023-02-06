"use client";

import * as React from "react";
import { Masonry, useInfiniteLoader } from "masonic";
import { faker } from "@faker-js/faker";
import { CardData } from "@type-buca";
import { Card } from "./Card";

const Masonic = () => {
  const [items, setItems] = React.useState<CardData[]>([]);

  // 무한 스크롤
  const maybeLoadMore = useInfiniteLoader(
    async (start, end, currentItems) => {
      const nextItems = await getFakeItemsPromise({ start, end });
      setItems((prev) => [...prev, ...nextItems]);
    },
    {
      isItemLoaded: (index, items) => !!items[index],
      minimumBatchSize: 30, // 한 번에 로드할 항목의 최소 개수
      threshold: 3, // 데이터를 미리 가져올 임계점
      // number: number // 최종 로드해야할 총 항목의 수 (알고 있는 경우에 입력)
    }
  );

  React.useEffect(() => {
    const nextItems = getFakeItems({ start: 0, end: 100 });
    setItems((prev) => [...prev, ...nextItems]);
  }, []);

  return (
    <Masonry
      onRender={maybeLoadMore}
      items={items}
      columnGutter={30}
      columnWidth={347}
      overscanBy={1.25}
      render={Card}
    />
  );
};

export default Masonic;

interface RangeFetch {
  start?: number;
  end?: number;
}

const getFakeItems = ({ start = 0, end = 100 }: RangeFetch) => {
  const fakeItems: CardData[] = [];
  for (let i = start; i < end; i++)
    fakeItems.push({
      id: faker.datatype.string(),
      x: 127.061621658,
      y: 37.507968429,
      name: "NH금융타워(타워2)",
      address: "서울 영등포 여의도",
      date: "2022.3",
      price: 1380000,
      view: faker.datatype.number(),
      src: `https://picsum.photos/id/${i}/374/150`,
      // src: `https://picsum.photos/374/150`,
      detail: {
        지번주소: "서울특별시 서초구 양재동 11-149",
        주용도: "업무시설",
        건물유형: "토지건물",
        사용승인: "2012. 7. 9",
        토지면적: "3,502.90m2 (1,059.62평)",
        건물연면적: "44,093.47m2 (13,321.94평)",
        법정용적률: 800,
        현황용적률: 764,
        규모: "지하 6층 / 지상 20층",

        거래금액: 400000000000,
        거래시점: "2022. 1. 18",
        건물거래면적: "44,093.47m2 (13,338.27평)",
        건물거래단가: "907만원/m2 (3000만원/평)",
        토지거래면적: "3,502.90m2 (1,059.63평)",
        토지거래단가: "1억1419만원/m2 (3억7750만원/평)",
        거래유형: "토지건물 통거래",

        등기원인: "2022.01.18",
        등기접수: "2022.01.26",
        매도: "주식회사코크랩양재위탁관리부동산투자회사",
        매수: "주식회사코람코지속성장오피스제1의2호위탁관리자부동산투자회사",

        출처: "건축물대장 공공데이터, 실거래가 공개시스템, 등기사항증명서",
        메모: [
          "2021년 설정된 코람코지속성장오피스리츠에 편입",
          "SPC그룹, 휠라코리아 본사 건물",
        ],
      },
    });
  return fakeItems;
};

const getFakeItemsPromise = async ({ start, end }: RangeFetch) =>
  await Promise.resolve(getFakeItems({ start, end }));
