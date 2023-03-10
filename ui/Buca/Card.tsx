import { useState } from "react";
import Image from "next/image";
import { CardData } from "@type-buca";

interface CardProps {
  data: CardData;
  style?: React.CSSProperties;
}
const CARD = {
  WIDTH: 347,
  HEIGHT: 287,
};

const headerClassName = "flex flex-col min-w-[100px]";

export const BucaCard = ({ style, data }: CardProps) => {
  const { x, y, name, address, date, price, view, src } = data;

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toggle = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <article
      style={{
        ...style,
        width: `${CARD.WIDTH}px`,
        boxShadow: `0px 0px 10px rgba(51, 61, 74, 0.2)`,
      }}
      className={`cursor-pointer flex flex-col bg-white box-border rounded-xl hover:shadow-sm rounded-t-xl`}
      onClick={toggle}
    >
      <section className="relative w-full h-[150px]">
        <Image
          src={src}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-[150px] rounded-t-xl"
          alt={"토지건물 이미지"}
        />
      </section>
      <section className="absolute flex gap-2 top-[109px] left-[14px] text-2xl leading-6 ">
        <div className="px-1 py-1 text-base text-gray-800 bg-gray-200 rounded">
          임대사례
        </div>
        <div className="px-1 py-1 text-base text-gray-800 bg-gray-200 rounded">
          업무
        </div>
      </section>
      <section className="flex flex-col items-start text-xl leading-6 p-[14px] pb-[9px] w-full not-italic">
        <div className="flex flex-col gap-1 pb-[14px] w-full ">
          <header className="flex justify-between pb-[1px]">
            <span>{date}</span>
            <div>
              <span className="font-bold">{price}</span>
            </div>
          </header>
          <span>{name}</span>
          <span>{address}</span>
        </div>
        {isOpened ? (
          <section className="text-sm ">
            <div className="flex">
              <div className={headerClassName}>
                <span>지번주소</span>
                <span>주용도</span>
                <span>건물유형</span>
                <span>사용승인</span>
                <span>토지면적</span>
                <span>건물연면적</span>
                <span>법정용적률</span>
                <span>현황용적률</span>
                <span>규모</span>
              </div>
              <div className="flex flex-col">
                <span>{data.detail.address}</span>
                <span>{data.detail.mainUse}</span>
                <span>{data.detail.buildType}</span>
                <span>{data.detail.approvalDate}</span>
                <span>{data.detail.landArea}</span>
                <span>{data.detail.buildingArea}</span>
                <span>{data.detail.statutoryFloorAreaRatio}</span>
                <span>{data.detail.currentStatusFloorAreaRatio}</span>
                <span>{data.detail.scale}</span>
              </div>
            </div>
            <div className="flex">
              <div className={headerClassName}>
                <span>거래금액</span>
                <span>거래시점</span>
                <span>건물거래면적</span>
                <span>건물거래단가</span>
                <span>토지거래면적</span>
                <span>토지거래단가</span>
                <span>거래유형</span>
              </div>
              <div className="flex flex-col">
                <span>{data.detail.dealAmount}</span>
                <span>{data.detail.dealPoint}</span>
                <span>{data.detail.buildingDealArea}</span>
                <span>{data.detail.buildingDealUnitPrice}</span>
                <span>{data.detail.landDealArea}</span>
                <span>{data.detail.landDealUnitPrice}</span>
                <span>{data.detail.dealType}</span>
              </div>
            </div>
            <div className="flex">
              <div className={headerClassName}>
                <span>등기원인</span>
                <span>등기접수</span>
                <span>매도</span>
                <span>매수</span>
              </div>
              <div className="flex flex-col">
                <span>{data.detail.registrationReason}</span>
                <span>{data.detail.registrationReceipt}</span>
                <span>{data.detail.sell}</span>
                <span>{data.detail.buy}</span>
              </div>
            </div>
            <div className="flex">
              <div className={headerClassName}>
                <span>출처</span>
                <span>메모</span>
              </div>
              <div className="flex flex-col">
                <span>{data.detail.source}</span>
                <span>{data.detail.notes}</span>
              </div>
            </div>
          </section>
        ) : (
          <></>
        )}

        <footer className="w-full text-base not-italic font-normal text-red-500">
          {view}K
        </footer>
      </section>
    </article>
  );
};
