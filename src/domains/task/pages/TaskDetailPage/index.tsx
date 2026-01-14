import { useParams } from "react-router-dom";
import { getTaskDetail } from "@/mocks/handlers/task";
import { Trash2 } from "lucide-react";
import { Modal } from "@/shared";
import { useState } from "react";

export function TaskDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const task = getTaskDetail(Number(id));

  const handleDelete = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h2>삭제</h2>
          <p>정말 삭제하시겠습니까?</p>
        </div>
      </Modal>
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
