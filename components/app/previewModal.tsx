import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type modalProp = {
  setPreviewURL: Dispatch<SetStateAction<string>>;
  previewURL: string
}

export default function PreviewModal({ setPreviewURL, previewURL }:modalProp) {
  return (
    <div className="w-full h-full p-1 fixed bg-guild top-0 left-0 md:p-20 lg:p-20">
      <div
        className="flex justify-end p-1 absolute top-5 right-5 cursor-pointer"
        onClick={() => setPreviewURL("")}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m5 5 14 14M5 19 19 5"></path>
        </svg>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Image
          className="w-[100%] max-w-[900px] h-[200px] object-fill rounded-lg md:h-auto lg:h-auto"
          src={previewURL ? previewURL : "/hub/Next Blur Data.png"}
          width={500}
          height={500}
          priority={true}
          unoptimized
          placeholder="blur"
          blurDataURL="/hub/Next Blur Data.png"
          alt="Preview of project"
        />
      </div>
    </div>
  );
}
