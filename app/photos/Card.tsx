import Image from "next/image";
import { PhotoData } from "@type-photos";

interface CardProps {
  data: PhotoData;
  style?: React.CSSProperties;
}
const CARD = {
  WIDTH: 347,
  HEIGHT: 287,
};

export const Card = ({ style, data }: CardProps) => {
  const { albumId, id, title, url, thumbnailUrl } = data;

  return (
    <article
      style={{
        ...style,
        width: `${CARD.WIDTH}px`,
        boxShadow: `0px 0px 10px rgba(51, 61, 74, 0.2)`,
      }}
      className={`cursor-pointer flex flex-col bg-white box-border rounded-xl hover:shadow-sm rounded-t-xl`}
    >
      <section className="relative w-full h-[150px]">
        <Image
          src={url}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-[150px] rounded-t-xl"
          alt={"이미지"}
        />
      </section>
      <section className="flex flex-col items-start text-xl leading-6 p-[14px] pb-[9px] w-full not-italic">
        <div className="flex flex-col gap-1 pb-[14px] w-full ">
          <div className="flex justify-between pb-[1px]">
            <span>{title}</span>
          </div>
        </div>
      </section>
    </article>
  );
};
