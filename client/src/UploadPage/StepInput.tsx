import { stepInputProps } from "../types/types";

export function StepInput({ step, stepNum, setStep }: stepInputProps) {
  function setHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <div className="list-item">
      <label>
        <div>{stepNum}</div>
        <textarea
          onChange={(e) => {
            setStep(e.target.value);
            setHeight(e.target);
          }}
          value={step}
        />
      </label>
    </div>
  );
}
