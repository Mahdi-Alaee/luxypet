import { ChangeEvent, Dispatch, ReactNode, SetStateAction } from "react";

interface TextBoxProps {
  state: { value: string; isValid: undefined | boolean };
  setState: Dispatch<
    SetStateAction<{
      value: string;
      isValid: undefined | boolean;
    }>
  >;
  placeholder: string;
  icon: ReactNode;
}

export default function TextBox({
  state,
  setState,
  placeholder,
  icon,
}: TextBoxProps) {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let isValid = false;
    const value = e.target.value;
    if (value) isValid = true;
    console.log('test');
    
    setState({ value, isValid });
  };

  return (
    <div
      className="bg-white flex items-center p-3 rounded-xl 
          justify-between "
    >
      <input
        type="text"
        className="text-right outline-none w-full font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
        placeholder={placeholder}
        value={state.value}
        onChange={onInputChange}
      />
      {icon}
    </div>
  );
}
