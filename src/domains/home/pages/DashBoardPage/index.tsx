import { DashBoardCard } from "../../components/DashBoardCard";
import { useDashboard } from "../../hooks/useDashboard";

export function DashBoardPage() {
  const { data: dashboard, isLoading } = useDashboard();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="border border-gray-200 rounded-xl flex px-2 py-4">
        <DashBoardCard
          title="일"
          count={dashboard?.numOfTask || 0}
          isBorderRight
        />
        <DashBoardCard
          title="해야할 일"
          count={dashboard?.numOfRestTask || 0}
          isBorderRight
        />
        <DashBoardCard title="한 일" count={dashboard?.numOfDoneTask || 0} />
      </div>
    </div>
  );
}
