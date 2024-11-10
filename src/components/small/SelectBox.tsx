import { Dispatch, SetStateAction } from "react";

interface SelectBoxProps {
  defaultItemText: string;
  items: { _id: string; name?: string; title?: string }[];
  state: { value: string; isValid: undefined | boolean };
  setState: Dispatch<
    SetStateAction<{
      value: string;
      isValid: undefined | boolean;
    }>
  >;
  optionPropName: "name" | "title";
  valuePropName?: "_id" | "name" | "title";
  className?: string;
}

export default function SelectBox({
  items,
  defaultItemText,
  state,
  setState,
  className = "my-1",
  optionPropName,
  valuePropName = "_id",
}: SelectBoxProps) {
  return (
    <select
      onChange={(e) =>
        setState({ value: e.target.value, isValid: e.target.value !== "f" })
      }
      className={`text-lg text-textColor/80 bg-bgColor h-12 rounded-lg outline-none cursor-pointer ${
        state.isValid === false
          ? "border-4 border-red-600"
          : state.isValid === true
          ? "border-4 border-green-500"
          : ""
      } ${className}`}
      value={state.value}
    >
      <option value="f">{defaultItemText}</option>
      {items.map((item) => (
        <option key={item[valuePropName]} value={item[valuePropName]}>
          {item[optionPropName]}
        </option>
      ))}
    </select>
  );
}
