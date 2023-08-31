export default function Roadmaps() {
  return (
    <div className="flex items-center justify-center min-h-[100vh]">
      <button
        className="bg-purple text-white font-semibold p-3 pl-8 pr-8 rounded-md flex items-center gap-1 scale-150 cursor-wait select-none transition-all hover:bg-primepurple hover:rotate-[-10deg]"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <path d="m18.75 6.938-.99-1.152A8.973 8.973 0 0 0 11.25 3c-4.969 0-9 4.031-9 9s4.031 9 9 9a9.004 9.004 0 0 0 8.488-6"></path>
          <path
            fill="#ffffff"
            stroke="none"
            d="M21.75 4.565v5.183a.75.75 0 0 1-.75.75h-5.184a.75.75 0 0 1-.53-1.28l5.184-5.184a.75.75 0 0 1 1.28.53Z"
          ></path>
        </svg>
        Coming Soon
      </button>
    </div>
  );
}
