import clsx from "clsx";

interface DashBoardCardProps {
  title: string;
  count: number;
  isBorderRight?: boolean;
}

export function DashBoardCard({
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
}
