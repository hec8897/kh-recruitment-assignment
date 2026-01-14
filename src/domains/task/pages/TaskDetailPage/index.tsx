import { useParams } from "react-router-dom";
import { getTaskDetail } from "@/mocks/handlers/task";
import { Trash2 } from "lucide-react";

export function TaskDetailPage() {
  const { id } = useParams();

  const task = getTaskDetail(Number(id));

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-bold">{task?.title}</h1>
          <button>
            <Trash2 size={24} />
          </button>
        </div>
        <p className="text-sm text-gray-500">{task?.registerDatetime}</p>
      </div>
      <textarea
        value={task?.memo}
        className="w-full h-full border border-gray-300 rounded-md p-4 resize-none min-h-[100px]"
        readOnly
      />
    </div>
  );
}
