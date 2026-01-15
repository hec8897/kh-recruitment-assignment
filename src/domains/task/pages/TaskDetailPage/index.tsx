import { useState } from "react";

import { useParams } from "react-router-dom";

import { DetailDeleteModal } from "./DetailDeleteModal";
import { Trash2 } from "lucide-react";
import { useTaskDetail } from "../../hook";

export function TaskDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const { data: task, isLoading, error } = useTaskDetail(Number(id));

  const handleDelete = () => {
    setIsOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>not-found</h2>
      </div>
    );
  }

  return (
    <div>
      <DetailDeleteModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="mb-8">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-2xl font-bold">{task?.title}</h1>
          <button onClick={handleDelete}>
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
