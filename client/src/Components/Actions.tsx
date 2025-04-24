import { Printer, Trash2 } from "lucide-react";
import { ReactElement } from "react";

interface ActionsProps {
    onDelete: () => void;
}

export function Actions({ onDelete}: ActionsProps) {
  const onPrint = () => {
    print();
  }

  return (
    <div className="actions">
      <Printer className="icon" onClick={onPrint} />
      <Trash2 className="icon" onClick={onDelete} />
    </div>
  );
}
