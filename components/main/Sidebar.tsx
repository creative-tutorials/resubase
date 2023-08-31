import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type SidebarProp = {
  styles: {
    readonly [key: string]: string;
  };
  isSidebarActive: boolean;
  setIsSidebarActive: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({
  styles,
  isSidebarActive,
  setIsSidebarActive,
}: SidebarProp) {
  return (
    <div
      id={styles.layoutsidebar}
      data-status={isSidebarActive ? "active" : null}
      onMouseLeave={() => setIsSidebarActive(false)}
      onTouchMove={() => setIsSidebarActive(false)}
      className="fixed top-0 right-[-100%] bg-darkbg border z-10 border-border-dark-hue h-[100%] w-[100%] max-w-xs p-8 transition-all duration-200 ease-in-out"
    >
      <nav className="flex flex-col gap-4">
        <Link
          href="/app"
          className="p-2 pl-5 bg-sidebar-link-bg text-white rounded-[5px] hover:bg-sidebar-hoverlink-bg"
        >
          Challenge
        </Link>
        <Link
          href="/jobs"
          className="p-2 pl-5 bg-sidebar-link-bg text-white rounded-[5px] hover:bg-sidebar-hoverlink-bg"
        >
          Jobs
        </Link>
        <Link
          href="/submissions"
          className="p-2 pl-5 bg-sidebar-link-bg text-white rounded-[5px] hover:bg-sidebar-hoverlink-bg"
        >
          Submissions
        </Link>
        <Link
          href="/roadmaps"
          className="p-2 pl-5 bg-sidebar-link-bg text-white rounded-[5px] hover:bg-sidebar-hoverlink-bg"
        >
          Roadmaps
        </Link>
      </nav>
    </div>
  );
}
