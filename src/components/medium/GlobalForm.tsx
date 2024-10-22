import { FormEvent, ReactNode } from "react";

interface GlobalFormProps {
  formSubmit: (e: FormEvent<HTMLFormElement>) => void;
  title: string;
  isFormValid: boolean;
  loading: boolean;
  children: ReactNode;
  topOfFormChildren?: ReactNode;
}

export default function GlobalForm({
  formSubmit,
  isFormValid,
  loading,
  children,
  topOfFormChildren,
  title,
}: GlobalFormProps) {
  return (
    <div
      className="bg-gray-100 flex flex-col items-center border 
      border-gray-200 rounded-2xl p-5 w-full mx-auto gap-y-5"
    >
      <h1
        className="relative text-4xl font-vazirMedium text-gray-600 
        before:w-1/2 before:bg-mainPurple before:bg-opacity-60 
        before:absolute before:right-0 before:bottom-0"
      >
        {title}
      </h1>
      {topOfFormChildren}
      <form className="w-full flex flex-col gap-y-2" onSubmit={formSubmit}>
        {children}
        <button
          className="bg-mainPurple text-white w-full rounded-lg 
          py-3 duration-100 cursor-pointer hover:bg-opacity-80 disabled:opacity-40"
          type="submit"
          disabled={!isFormValid || loading}
        >
          ثبت
        </button>
      </form>
    </div>
  );
}
