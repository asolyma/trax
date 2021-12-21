// import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import PlayerLayout from "../components/PlayerLayout";
import { ExtendedAppProps } from "../lib/types";
import { StoreProvider } from "easy-peasy";
import store from "../lib/store";

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  return (
    <ChakraProvider>
      <StoreProvider store={store}>
        {Component.auth ? (
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
