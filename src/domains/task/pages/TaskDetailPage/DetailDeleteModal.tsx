import { Button, Input, Modal } from "@/shared";

interface DetailDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DetailDeleteModal({ isOpen, onClose }: DetailDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-2">
        <Input placeholder="삭제할 아이디를 입력하세요" />
      </div>
      <div className="flex justify-end gap-2">
        <Button>삭제</Button>
        <Button variant="secondary" onClick={onClose}>
          닫기
        </Button>
      </div>
    </Modal>
  );
}
