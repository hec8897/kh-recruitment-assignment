import { Button, Modal } from "@/shared";

interface ErrorModalProps {
  isOpen: boolean;
  errorMessage: string;
  onClose: () => void;
}

export function ErrorModal({ isOpen, onClose, errorMessage }: ErrorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="mb-4">{errorMessage}</h2>
        <Button onClick={onClose}>닫기</Button>
      </div>
    </Modal>
  );
}
