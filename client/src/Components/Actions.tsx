import { Pencil, Printer, Trash2 } from "lucide-react";

interface ActionsProps {
  onDelete: () => void;
  onEdit: () => void;
  isHorizontal?: boolean;
}

export function Actions({ onDelete, onEdit, isHorizontal }: ActionsProps) {
  const onPrint = () => {
    print();
  };
  let className = "actions";
  if (isHorizontal) {
    className += " horizontal";
  }

  return (
    <div className={className}>
      <Printer className="icon" onClick={onPrint} />
      <Trash2 className="icon" onClick={onDelete} />
      <Pencil className="icon" onClick={onEdit} />
    </div>
  );
}
