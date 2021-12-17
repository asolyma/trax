import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import PlayerLayout from "../components/PlayerLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
    </ChakraProvider>
  );
}

export default MyApp;
