import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

interface HeaderProp {
  styles: {
    readonly [key: string]: string;
  };
}

export default function Header({ styles }: HeaderProp) {
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.inputBx}>
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#a9aaab"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z"></path>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" placeholder="Search" />
      </div>
      <div
        className={styles.home}
        title="home"
        onClick={() => router.push("/")}
      >
        <svg
          width="20"
          height="20"
          fill="#a9aaab"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.68 19.32v-4.206c0-.294.3-.594.6-.594h2.4c.3 0 .6.3.6.6v4.2a.6.6 0 0 0 .6.6h4.8a.6.6 0 0 0 .6-.6v-8.4a.602.602 0 0 0-.175-.425L18.48 8.872V4.92a.6.6 0 0 0-.6-.6h-1.2a.6.6 0 0 0-.6.6v1.552l-3.175-3.177a.6.6 0 0 0-.85 0l-7.2 7.2a.6.6 0 0 0-.175.425v8.4a.6.6 0 0 0 .6.6h4.8a.6.6 0 0 0 .6-.6Z"></path>
        </svg>
      </div>
      <div
        className={styles.dailyproj}
        title="daily projects"
        onClick={() => router.push("/daily/projects")}
      >
        <svg
          width="20"
          height="20"
          fill="none"
          stroke="#a9aaab"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m13.5 5.25-3 15"></path>
          <path d="m7.5 6.75-5.25 6 5.25 6"></path>
          <path d="m16.5 6.75 5.25 6-5.25 6"></path>
        </svg>
      </div>
      <div
        className={styles.work}
        title="Job"
        onClick={() => router.push("/job")}
      >
        <svg
          width="20"
          height="20"
          fill="#a9aaab"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.25 5.461v1.42l-1.694.138a2.61 2.61 0 0 0-2.367 2.184c-.041.258-.08.516-.114.775a.298.298 0 0 0 .169.308l.077.036c5.429 2.57 11.93 2.57 17.358 0l.077-.036a.298.298 0 0 0 .168-.308 26.748 26.748 0 0 0-.113-.775 2.61 2.61 0 0 0-2.367-2.184l-1.694-.137v-1.42a1.75 1.75 0 0 0-1.49-1.731l-1.22-.183a13.75 13.75 0 0 0-4.08 0l-1.22.183a1.75 1.75 0 0 0-1.49 1.73Zm6.567-.43a12.25 12.25 0 0 0-3.634 0l-1.22.183a.25.25 0 0 0-.213.247v1.315a56.826 56.826 0 0 1 6.5 0V5.461a.25.25 0 0 0-.213-.247l-1.22-.183Z"
            clipRule="evenodd"
          ></path>
          <path d="M21.118 12.07a.2.2 0 0 0-.282-.17c-5.571 2.467-12.101 2.467-17.672 0a.2.2 0 0 0-.282.17 26.88 26.88 0 0 0 .307 5.727 2.61 2.61 0 0 0 2.367 2.184l1.872.152c3.043.245 6.1.245 9.144 0l1.872-.151a2.61 2.61 0 0 0 2.367-2.185c.306-1.895.41-3.815.307-5.726Z"></path>
        </svg>
      </div>
      <div className={styles.UserProfile}>
        <UserButton />
      </div>
    </div>
  );
}
