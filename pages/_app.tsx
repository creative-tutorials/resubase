import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function App({ Component, pageProps }: AppProps) {
  const PublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider
      {...pageProps}
      publishableKey={PublishableKey}
      appearance={{
        baseTheme: dark,
      }}
    >
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
