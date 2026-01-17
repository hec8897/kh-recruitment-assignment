import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { PATHS } from "@/routes/paths";
import { Button, Input, Modal } from "@/shared";

import { useDeleteTask } from "../../hook";

interface DetailDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export function DetailDeleteModal({
  isOpen,
  onClose,
  id,
}: DetailDeleteModalProps) {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<string>("");
  const { mutate: deleteTask } = useDeleteTask({
    onSuccess: () => {
      navigate(PATHS.TASK);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDelete = () => {
    deleteTask(Number(inputValue));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-2">
        <Input
          placeholder="삭제할 아이디를 입력하세요"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button disabled={inputValue !== id} onClick={handleDelete}>
          삭제
        </Button>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </div>
    </Modal>
  );
}
