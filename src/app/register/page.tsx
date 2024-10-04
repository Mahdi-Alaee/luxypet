/* eslint-disable @next/next/no-img-element */
"use client";
export default function Register() {
  return (
    <main>
      <div className="flex flex-col mt-20 max-w-md px-6 mx-auto justify-center">
        <img
          className="w-32 mb-2 mx-auto"
          src="/images/logo2.png"
          alt="Delpoosh logo"
        />
        <div
          className="bg-gray-100 flex flex-col items-center border 
      border-gray-200 rounded-2xl p-5 w-full mx-auto gap-y-5"
        >
          <h1
            className="relative text-4xl font-vazirMedium text-gray-600 
        before:w-1/2 before:bg-mainPurple before:bg-opacity-60 
        before:absolute before:right-0 before:bottom-0"
          >
            فرم عضویت
          </h1>
          <div className="text-lg">
            <span>قبلا ثبت نام کرده‌اید؟</span>{" "}
            <a className="text-mainPurple" href="/login">
              وارد شوید
            </a>
          </div>
          <form className="w-full flex flex-col gap-y-2">
            <div
              className="bg-white flex items-center p-3 rounded-xl 
          justify-between "
            >
              <input
                type="text"
                className="text-right outline-none w-full font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
                placeholder="نام و نام خوانوادگی"
                value=""
              />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                className="text-gray-400 md:text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M496 128a144 144 0 0 0-119.74 224H263.74A144 144 0 1 0 144 416h352a144 144 0 0 0 0-288zM64 272a80 80 0 1 1 80 80 80 80 0 0 1-80-80zm432 80a80 80 0 1 1 80-80 80 80 0 0 1-80 80z"></path>
              </svg>
            </div>
            <div
              className="bg-white flex items-center p-3 rounded-xl 
          justify-between "
            >
              <input
                type="text"
                className="text-right outline-none w-full font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
                placeholder="نام کاربری"
                value=""
              />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="text-gray-400 md:text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
            </div>
            <div
              className="bg-white flex items-center p-3 rounded-xl 
          justify-between "
            >
              <input
                type="text"
                className="text-right outline-none w-full font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
                placeholder="شماره تلفن"
                value=""
              />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="text-gray-400 md:text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
              </svg>
            </div>
            <div
              className="bg-white flex items-center p-3 rounded-xl 
          justify-between "
            >
              <input
                type="text"
                className="text-right outline-none w-full font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
                placeholder="آدرس ایمیل"
                value=""
              />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="text-gray-400 md:text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
              </svg>
            </div>
            <div
              className="bg-white flex items-center p-3 rounded-xl 
          justify-between "
            >
              <input
                type="password"
                className="text-right outline-none w-full font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
                placeholder="رمز عبور"
                value=""
              />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                className="text-gray-400 cursor-pointer md:text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
              </svg>
            </div>
            <div
              className="bg-white flex items-center p-3 rounded-xl 
          justify-between "
            >
              <input
                type="password"
                className="text-right outline-none w-full font-lg placeholder:text-sm md:placeholder:text-lg md:text-lg"
                placeholder="تکرار رمز عبور"
                value=""
              />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                className="text-gray-400 cursor-pointer md:text-2xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path>
              </svg>
            </div>
            <button
              className="bg-mainPurple text-white w-full rounded-lg 
          py-3 duration-100 hover:bg-opacity-90 opacity-60"
              type="submit"
              disabled
            >
              ادامه
            </button>
          </form>
        </div>
        <p className="mx-auto text-center mt-4 md:text-lg">
          با عضویت در سایت، تمامی{" "}
          <a className="text-mainPurple" href="/terms-conditions">
            قوانین و شرایط
          </a>{" "}
          استفاده از خدمت فروشگاه اینترنتی دل پوش را پذیرفته اید.
        </p>
      </div>
    </main>
  );
}
