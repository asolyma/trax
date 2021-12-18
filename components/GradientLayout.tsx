import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { ReactChildren, ReactElement, ReactNode } from "react";

const GradientLayout: React.FC<{
  color: string;
  image: string;
  title: string;
  description: string;
  rounded: boolean;
  subTitle: string;
  children: ReactNode;
}> = ({ image, title, subTitle, description, color, rounded, children }) => {
  return (
    <Box
      height={"100%"}
      overflow={"auto"}
      bgGradient={`linear(${color}.500 0%,${color}.600 15%,${color}.700 40%,rgba(0,0,0,0.95) 70%)`}
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray.700",
          borderRadius: "24px",
        },
      }}
    >
      <Flex bgColor={`${color}.600`} padding={"40px"} align={"end"}>
        <Box padding={"30px"}>
          <Image
            alt="avatar"
            boxSize={"160px"}
            boxShadow={"2xl"}
            src={image}
            borderRadius={rounded ? "100%" : "none"}
          />
        </Box>
        <Box padding={"px"} lineHeight={"40px"} color={"white"}>
          <Text fontSize={"xs"} fontWeight={"bold"} casing={"uppercase"}>
            {subTitle}
          </Text>
          <Text fontSize={"6xl"} fontWeight={"bold"}>
            {title}
          </Text>
          <Text fontSize={"xs"} fontWeight={"100"} color={"whiteAlpha.700"}>
            {description}
          </Text>
        </Box>
      </Flex>
      <Box paddingY={"50px"}>{children}</Box>
    </Box>
  );
};

export default GradientLayout;
