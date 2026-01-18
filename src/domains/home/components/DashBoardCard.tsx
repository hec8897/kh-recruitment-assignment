import { memo } from "react";

import clsx from "clsx";

interface DashBoardCardProps {
  title: string;
  count: number;
  isBorderRight?: boolean;
}

/**
 * 대시보드 카드 컴포넌트
 * React.memo로 불필요한 리렌더링 방지
 */
export const DashBoardCard = memo(function DashBoardCard({
  title,
  count,
  isBorderRight,
}: DashBoardCardProps) {
  return (
    <div
      className={clsx(
        "flex-1 px-1 flex flex-col gap-2 justify-center items-center",
        {
          "border-r border-gray-200": isBorderRight,
        }
      )}>
      <b>{title}</b>
      <span className="text-2xl text-gray-500">{count}</span>
    </div>
  );
});
