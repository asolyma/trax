import { Box, Flex, Input, Button, Divider } from "@chakra-ui/react";
import router from "next/router";
import { FormEvent, useRef, useState } from "react";
import { SWRConfig } from "swr";
import NextImage from "next/image";
import { auth } from "../lib/mutaion";
import { authMode, authReq } from "../lib/types";
import Error from "./Error";
//caching refeatching and validating //react query

const AuthForm: React.FC<{ mode: authMode }> = ({ mode }) => {
  const [loading, setLoading] = useState(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [showError, setShowerror] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const userinput: authReq = {
      email: email.current!.value,
      password: password.current!.value,
    };
    const response = await auth(mode, userinput);
    if (response.message) {
      setLoading(false);
      setShowerror(true);
      setErrormessage(response.message);
      setTimeout(() => {
        setShowerror(false);
      }, 3000);
    } else {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <Box height={"100vh"} width={"100vw"} bgColor={"black"} color={"white"}>
      <Flex justify={"center"} align={"center"} height={"100px"}>
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex
        flexDir={"column"}
        justify={"center"}
        align={"center"}
        height={"calc(100vh - 100px)"}
      >
        {showError && <Error msg={errormessage} />}
        <Box
          as="form"
          padding={"50px"}
          bgColor={"blackAlpha.900"}
          onSubmit={handleSubmit}
        >
          <Input placeholder="Email" type={"email"} ref={email}></Input>
          <Divider />
          <Input
            placeholder="password"
            type={"password"}
            ref={password}
          ></Input>
          <Button
            type="submit"
            color={"white"}
            isLoading={loading}
            bgColor={"green"}
          >
            {mode}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
