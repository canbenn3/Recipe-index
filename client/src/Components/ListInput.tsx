import { Input } from "./Input";

interface ListInputProps extends React.HTMLAttributes<HTMLElement> {
  input: { [key: string]: string };
  setInput: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  instruction?: string;
  ordered?: boolean;
}

export function ListInput({
  input,
  setInput,
  instruction,
  ordered = false,
  ...props
}: ListInputProps) {
  return ordered ? (
    <ol className="list-items" {...props}>
      <ListContents
        input={input}
        setInput={setInput}
        instruction={instruction}
      />
    </ol>
  ) : (
    <ul className="list-items" {...props}>
      <ListContents
        input={input}
        setInput={setInput}
        instruction={instruction}
      />
    </ul>
  );
}

function ListContents({ input, setInput, instruction }: ListInputProps) {
  const doEdit = (index: number) => {
    return (value: string) => {
      setInput((prev) => {
        const newObj = { ...prev };
        newObj[`${index}`] = value;
        return newObj;
      });
    };
  };
  return Object.keys(input).length > 0 ? (
    Object.keys(input).map((key, index) => {
      return (
        <li key={index}>
          <Input
            input={input[key]}
            setInput={doEdit(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setInput((prev) => {
                  const newObj = { ...prev };
                  newObj[`${Object.keys(prev).length}`] = "";
                  return newObj;
                });
              } else if (e.key === "Backspace" && input[`${index}`] === "") {
                e.preventDefault();
                setInput((prev) => {
                  const newObj = { ...prev };
                  delete newObj[`${index}`];
                  return newObj;
                });
              }
            }}
          />
        </li>
      );
    })
  ) : (
    <li>
      <Input input="" setInput={doEdit(0)} instruction={instruction} />
    </li>
  );
}
