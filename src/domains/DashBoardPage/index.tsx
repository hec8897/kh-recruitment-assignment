import { DashBoardCard } from "./DashBoardCard";
// 임시
import { mockDashboard } from "@/mocks/handlers/dashboard";

export function DashBoardPage() {
  return (
    <div>
      <div className="border border-gray-200 rounded-xl flex px-2 py-4">
        <DashBoardCard
          title="일"
          count={mockDashboard.numOfDoneTask || 0}
          isBorderRight
        />
        <DashBoardCard
          title="해야할 일"
          count={mockDashboard.numOfRestTask || 0}
          isBorderRight
        />
        <DashBoardCard title="한 일" count={mockDashboard.numOfTask || 0} />
      </div>
    </div>
  );
}
