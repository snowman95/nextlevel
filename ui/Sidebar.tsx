import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-[375px] whitespace-pre-line break-words break-keep ">
      <div>사이드바</div>
      <Link href={"/"} className="bg-blue-300 border w-fit">
        Home
      </Link>
    </aside>
  );
};

export default Sidebar;
