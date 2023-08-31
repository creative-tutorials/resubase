import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type typeShwcase = {
  setPreviewURL: Dispatch<SetStateAction<string>>;
};

export default function AdsShwcase({ setPreviewURL }: typeShwcase) {
  return (
    <div className="p-4 w-[100%] max-w-md bg-guild border border-guildbc flex flex-col items-center text-center rounded-lg gap-2 cursor-pointer select-none">
      <div className="">
        <h3 className="text-white">Checkout Page</h3>
      </div>
      <div className="w-[100%] h-[100%] rounded-lg overflow-hidden relative">
        <Image
          className="w-[100%] h-[300px] object-cover rounded-lg overflow-hidden hover:scale-110 transition-all"
          src={process.env.NEXT_PUBLIC_PRO as string}
          width={500}
          height={500}
          onClick={() => setPreviewURL(process.env.NEXT_PUBLIC_PRO as string)}
          placeholder="blur"
          blurDataURL="/vercel.svg"
          alt="Pro Image"
        />
        <div className="absolute w-[100%] h-[100%] bottom-0 p-2 bg-purple/20 flex items-center justify-center backdrop-blur-md">
          <span className="text-2xl flex flex-col items-center text-white font-medium">
            <svg
              width="50"
              height="50"
              fill="#ffff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="m7.306 7.758.343 3.088-.694.055a2.111 2.111 0 0 0-1.915 1.764 20.641 20.641 0 0 0 0 6.67A2.111 2.111 0 0 0 6.955 21.1l1.496.12c2.362.188 4.736.188 7.098 0l1.496-.12a2.111 2.111 0 0 0 1.916-1.764 20.64 20.64 0 0 0 0-6.67 2.111 2.111 0 0 0-1.916-1.764l-.694-.055.343-3.088a5.01 5.01 0 0 0 0-1.095l-.023-.205a4.7 4.7 0 0 0-9.342 0l-.023.205a4.96 4.96 0 0 0 0 1.095ZM12.374 3.8A3.2 3.2 0 0 0 8.82 6.624l-.023.205a3.46 3.46 0 0 0 0 .764l.349 3.139c1.9-.122 3.807-.122 5.708 0l.349-3.14a3.46 3.46 0 0 0 0-.763l-.023-.205a3.2 3.2 0 0 0-2.806-2.825ZM12 14.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
                clipRule="evenodd"
              ></path>
            </svg>{" "}
            Unlock PRO
          </span>
        </div>
      </div>
      <div className="w-[100%] mt-3">
        <Link href="/">
          <button className="w-[100%] p-3 bg-purple text-white font-semibold rounded-md transition-all hover:bg-primepurple">
            Start Challenge
          </button>
        </Link>
      </div>
    </div>
  );
}
