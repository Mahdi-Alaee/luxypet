import { ReactNode, useState } from "react";

interface DeleteButtonProps {
  //   isOpenModal: boolean;
  children: ReactNode;
  className?: string;
  modalMessage?: string;
  onDelete: (_id: string) => void;
  _id: string;
}

export default function DeleteButton({
  //   isOpenModal,
  children,
  className,
  modalMessage = "از حذف این آیتم اطمینان دارید؟",
  onDelete,
  _id,
}: DeleteButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {/* button */}
      <button
        className={`bg-red-600 text-lg text-textColor px-4 rounded-md ${className}`}
        onClick={() => setIsOpenModal(true)}
      >
        {children}
      </button>
      {/* modal */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/80 transition-opacity duration-75 ${
          isOpenModal ? "z-50 opacity-100" : "-z-50 opacity-0"
        }`}
        onClick={() => setIsOpenModal(false)}
      >
        {/* modal box */}
        <div
          className="bg-gray-200 p-4 flex flex-col gap-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* question */}
          <p className="text-xl text-black">{modalMessage}</p>
          {/* buttons */}
          <div className="flex gap-x-4 justify-center">
            <button
              className="bg-red-600 text-textColor p-2 rounded-md"
              onClick={() => {
                onDelete(_id);
                setIsOpenModal(false);
              }}
            >
              حذف
            </button>
            <button
              className="border-2 p-2 text-black"
              onClick={() => setIsOpenModal(false)}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
