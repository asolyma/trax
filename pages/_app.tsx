// import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import PlayerLayout from "../components/PlayerLayout";
import { ExtendedAppProps } from "../lib/types";

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  return (
    <ChakraProvider>
      {Component.auth ? (
        <Component {...pageProps} />
      ) : (
        <PlayerLayout>
          <Component {...pageProps} />
        </PlayerLayout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
