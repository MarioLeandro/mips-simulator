import React, { useEffect, useState } from "react";
import * as hexToBinary from "hex-to-binary";
import * as bin from "binary-to-decimal";
import Data from "./utils/instructions.json";
import {
  Box,
  Button,
  ChakraProvider,
  extendTheme,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Text,
  HStack,
  Divider,
  Center,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { AttachmentIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useDropzone } from "react-dropzone";
import ModalChakra from "./components/ModalChakra";

function Fon() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [file, setFile] = useState<any>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/JSON": [".json"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      acceptedFiles.map((file) => {
        setFile(file);
        console.log(file);
      });
    },
  });

  const [instruction, setInstruction] = useState("");

  const Instructions = Data;

  function getInstruction() {
    var hexString = "02114020";
    var binString = hexToBinary(hexString);
    console.log(bin.decimal("001"));
    var instruction = Instructions.find((instruction) => {
      if (binString.slice(0, 6) === "000000") {
        return (
          instruction.opcode === binString.slice(0, 6) &&
          instruction.function === binString.slice(-6)
        );
      }
    });

    /* console.log(
      `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`
    ); */

    setInstruction(
      `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`
    );
  }

  useEffect(() => {
    if (!file) return;

    const fr = new FileReader();

    fr.readAsText(file);
    fr.onload = () => {
      console.log(JSON.parse(fr.result as string));
    };
    getInstruction();
  }, [file]);

  return (
    <>
      <Flex w="100%" align={"center"} justify={"flex-end"}>

        <ModalChakra/>
        <IconButton
          mr={4}
          mt={4}
          bg={"inherit"}
          variant="outline"
          borderColor={"gray.600"}
          onClick={toggleColorMode}
          color={useColorModeValue("white", "gray.800")}
          icon={
            <Icon
              as={useColorModeValue(MoonIcon, SunIcon)}
              color={useColorModeValue("black", "white")}
              size="lg"
            />
          }
          aria-label="Change theme"
          isRound
        />
      </Flex>
      <Flex
        w="100%"
        h="calc(100vh - 56px)"
        align={"center"}
        justify={"space-evenly"}
      >
        <Flex
          w={"96"}
          h={"52"}
          border={useColorModeValue("2px dashed gray", "2px dashed white")}
          borderRadius={5}
          align={"center"}
          justify={"center"}
          direction={"column"}
          cursor={"pointer"}
          {...getRootProps()}
        >
          {file ? (
            <Text color={"green.300"} fontSize={"2xl"}>
              {file.name}
            </Text>
          ) : (
            <>
              <input {...getInputProps()} />
              <AttachmentIcon w={6} h={6} mb={4} />
              <Text color={isDragActive ? "green.300" : "inherit"}>
                Clique ou Arraste algum arquivo
              </Text>
            </>
          )}
        </Flex>
        <Center height="80%">
          <Divider orientation="vertical" border={"4px"} />
        </Center>
        <Flex
          w={"750px"}
          h={"700px"}
          bg={useColorModeValue("gray.300", "gray.900")}
          borderRadius={5}
          boxShadow="xl"
        >
          <Text
            fontFamily={"courier new"}
            fontWeight={600}
            color={useColorModeValue("green.500", "green.300")}
            fontSize={"lg"}
            p={4}
          >
            {instruction}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Fon;
