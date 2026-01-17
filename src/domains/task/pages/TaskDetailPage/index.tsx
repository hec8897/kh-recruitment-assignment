import { useState } from "react";

import { Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

import { DetailDeleteModal } from "./DetailDeleteModal";
import { useTaskDetail } from "../../hook";

export function TaskDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading, error } = useTaskDetail(id ?? "");



  const handleDelete = () => {
    setIsOpen(true);
  };


  if (!id) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500">잘못된 접근입니다</h2>
          <p className="text-gray-500 mt-2">올바른 Task ID가 필요합니다</p>
        </div>
      </div>
    );
  }


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
      <DetailDeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={id}
      />
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
