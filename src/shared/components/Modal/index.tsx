import { Portal } from "./Portal";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: ModalProps) {
  const onClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <Portal>
      <div
        className="fixed inset-0 bg-dim bg-opacity-50 flex justify-center items-center z-50"
        onClick={onClickOutside}>
        <div className="bg-white rounded-xl p-4 w-full max-w-[320px]">
          {children}
        </div>
      </div>
    </Portal>
  );
}
