"use client";

import validate, { ValidationRule } from "@/validation/inputs/validation-rules";
import {
  ChangeEvent,
  Dispatch,
  HTMLInputTypeAttribute,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface TextBoxProps {
  state: { value: string; isValid: undefined | boolean };
  setState: Dispatch<
    SetStateAction<{
      value: string;
      isValid: undefined | boolean;
    }>
  >;
  placeholder: string;
  icon?: ReactNode;
  validationRules?: ValidationRule[];
  type?: HTMLInputTypeAttribute;
  inputDir?: "rtl" | "ltr";
}

export default function TextBox({
  state,
  setState,
  placeholder,
  icon,
  validationRules = [],
  type = "text",
  inputDir = "rtl",
}: TextBoxProps) {
  const [message, setMessage] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let isValid = true;
    const value = e.target.value;
    const messages = validate(value, validationRules);

    if (messages.length > 0) {
      isValid = false;
      setMessage(messages[0]);
    } else setMessage("");

    setState({ value: value, isValid });
  };

  return (
    <>
      <div
        className="bg-bgColor flex items-center p-3 rounded-xl 
          justify-between "
      >
        <input
          type={type}
          className="text-right outline-none w-full bg-bgColor text-textColor font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
          placeholder={placeholder}
          value={state.value}
          onChange={onInputChange}
          style={{ direction: inputDir }}
        />
        {icon}
      </div>

      <p className="text-red-600">{message}</p>
    </>
  );
}
