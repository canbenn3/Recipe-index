interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  setInput: (value: string) => void;
  input: string;
  instruction?: string;
}

export function Input({ input, setInput, instruction, ...props }: InputProps) {
  function setHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  return (
    <textarea
      {...props}
      onChange={(e) => {
        setInput(e.target.value);
        setHeight(e.target);
      }}
      value={input}
      placeholder={instruction ?? "Enter text here..."}
    />
  );
}
