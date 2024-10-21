import { Dispatch, SetStateAction } from "react";

interface SelectBoxProps {
  defaultItemText: string;
  items: { _id: string; name?: string; title?: string }[];
  optionPropName: "name" | "title";
  state: { value: string; isValid: undefined | boolean };
  setState: Dispatch<
    SetStateAction<{
      value: string;
      isValid: undefined | boolean;
    }>
  >;
  className?:string
}

export default function SelectBox({
  items,
  defaultItemText,
  optionPropName,
  state,
  setState,
  className = 'my-1'
}: SelectBoxProps) {
  return (
    <select
      onChange={(e) =>
        setState({ value: e.target.value, isValid: e.target.value !== "f" })
      }
      className={`text-lg text-gray-400 h-12 rounded-lg outline-none cursor-pointer ${
        state.isValid === false
          ? "border-4 border-red-500"
          : state.isValid === true
          ? "border-4 border-green-500"
          : ""
      } ${className}`}
    >
      <option value="f">{defaultItemText}</option>
      {items.map((item) => (
        <option key={item._id} value={item._id}>
          {item[optionPropName]}
        </option>
      ))}
    </select>
  );
}
