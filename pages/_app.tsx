import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  const PublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  // const isRedirectLoop = req.headers.get('x-clerk-auth-message') === 'Infinite redirect loop detected';
  if (!PublishableKey) {
    throw new Error("Missing CLERK_PUBLISHABLE_KEY environment variable.");
  }
  return (
    <ClerkProvider
      {...pageProps}
      publishableKey={PublishableKey}
      appearance={{
        baseTheme: dark,
      }}
    >
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
}
