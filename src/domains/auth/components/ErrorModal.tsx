import { Button, Modal } from "@/shared";

interface ErrorModalProps {
  errorMessage: string;
  onClose: () => void;
}

export function ErrorModal({ onClose, errorMessage }: ErrorModalProps) {
  return (
    <Modal isOpen={!!errorMessage} onClose={onClose}>
      <div>
        <h2 className="mb-4">{errorMessage}</h2>
        <Button onClick={onClose}>닫기</Button>
      </div>
    </Modal>
  );
}
