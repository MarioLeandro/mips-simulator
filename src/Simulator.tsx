import React, { useEffect, useState } from "react";
import * as hexToBinary from "hex-to-binary";
import * as bin from "binary-to-decimal";
import getSigned32BitInt from "get-signed-32-bit-int";

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
import { getInstruction } from "./utils/converter";
type Instruction = {
  hex?: string;
  instruction: string;
  text: string;
  regs?: {};
  mem?: {};
  stdout?: {};
};

function Simulator() {
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

  const [instruction, setInstruction] = useState<Instruction[]>([]);
  const [texts, setTexts] = useState<any>(null);
  const [regs, setRegs] = useState<any>({
    $0: 0,
    $1: 0,
    $2: 0,
    $3: 0,
    $4: 0,
    $5: 0,
    $6: 0,
    $7: 0,
    $8: 0,
    $9: 0,
    $10: 0,
    $11: 0,
    $12: 0,
    $13: 0,
    $14: 0,
    $15: 0,
    $16: 0,
    $17: 0,
    $18: 0,
    $19: 0,
    $20: 0,
    $21: 0,
    $22: 0,
    $23: 0,
    $24: 0,
    $25: 0,
    $26: 0,
    $27: 0,
    $28: 0,
    $29: 0,
    $30: 0,
    $31: 0,
    $pc: 0,
    $hi: 0,
    $lo: 0,
  });

  let nonZeroRegs = {};
  //const Instructions = Data;

  function convert(stringToConvert: string[]) {
    const instructions: any = [];
    stringToConvert.forEach((element) => {
      var hexString = element.slice(2, element.length);
      var binString = hexToBinary(hexString);

      const value = getInstruction(binString);

      if (value?.instruction === "add") {
        let inRegs: any = {};
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2]) >
              2147483647 ||
            Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2]) <
              -2147483647
          ) {
            overflow = "overflow";
            result = getSigned32BitInt(
              Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2])
            );
          } else {
            result =
              Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2]);
          }
          setRegs({
            ...regs,
            [value.regs.dest]: result,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sub") {
        let inRegs: any = {};
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2]) >
              2147483647 ||
            Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2]) <
              -2147483647
          ) {
            overflow = "overflow";
            result = getSigned32BitInt(
              Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2])
            );
          } else {
            result =
              Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2]);
          }
          setRegs({
            ...regs,
            [value.regs.dest]: result,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "slt") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) < Number(regs[value.regs?.src2])
                ? 1
                : 0,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) < Number(regs[value.regs?.src2])
                ? 1
                : 0,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "and") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) & Number(regs[value.regs?.src2]),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) & Number(regs[value.regs?.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "or") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) | Number(regs[value.regs?.src2]),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) | Number(regs[value.regs?.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "xor") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) ^ Number(regs[value.regs?.src2]),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) ^ Number(regs[value.regs?.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "nor") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]: ~(
              Number(regs[value.regs.src1]) | Number(regs[value.regs?.src2])
            ),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: ~(
              Number(regs[value.regs.src1]) | Number(regs[value.regs?.src2])
            ),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "mfhi") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]: regs.hi,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: regs.hi,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "mflo") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]: regs.lo,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: regs.lo,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "addu") {
        let inRegs: any = {};
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2]) >
              2147483647 ||
            Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2]) <
              -2147483647
          ) {
            result = getSigned32BitInt(
              Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2])
            );
          } else {
            result =
              Number(regs[value.regs.src1]) + Number(regs[value.regs?.src2]);
          }
          setRegs({
            ...regs,
            [value.regs.dest]: result,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "subu") {
        let inRegs: any = {};
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2]) >
              2147483647 ||
            Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2]) <
              -2147483647
          ) {
            result = getSigned32BitInt(
              Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2])
            );
          } else {
            result =
              Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2]);
          }
          setRegs({
            ...regs,
            [value.regs.dest]: result,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "mult") {
        const mult = (
          Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2])
        )
          .toString(2)
          .padStart(64, "0");
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            hi: Number(bin.decimal(mult.slice(0, 31))),
            lo: Number(bin.decimal(mult.slice(31, mult.length))),
          });
          inRegs = {
            ...regs,
            hi: Number(bin.decimal(mult.slice(0, 31))),
            lo: Number(bin.decimal(mult.slice(31, mult.length))),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "multu") {
        const mult = (
          Number(regs[value.regs.src1]) - Number(regs[value.regs?.src2])
        )
          .toString(2)
          .padStart(64, "0");
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            hi: Number(bin.decimal(mult.slice(0, 31))),
            lo: Number(bin.decimal(mult.slice(31, mult.length))),
          });
          inRegs = {
            ...regs,
            hi: Number(bin.decimal(mult.slice(0, 31))),
            lo: Number(bin.decimal(mult.slice(31, mult.length))),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "div") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            hi: Number(regs[value.regs.src1]) % Number(regs[value.regs.src2]),
            lo: Number(regs[value.regs.src1]) / Number(regs[value.regs.src2]),
          });
          inRegs = {
            ...regs,
            hi: Number(regs[value.regs.src1]) % Number(regs[value.regs.src2]),
            lo: Number(regs[value.regs.src1]) / Number(regs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "divu") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            hi: Number(regs[value.regs.src1]) % Number(regs[value.regs.src2]),
            lo: Number(regs[value.regs.src1]) / Number(regs[value.regs.src2]),
          });
          inRegs = {
            ...regs,
            hi: Number(regs[value.regs.src1]) % Number(regs[value.regs.src2]),
            lo: Number(regs[value.regs.src1]) / Number(regs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sll") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) << Number(value.regs.src2),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) << Number(value.regs.src2),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "srl") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >>> Number(value.regs.src2),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >>> Number(value.regs.src2),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sra") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >> Number(value.regs.src2),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >> Number(value.regs.src2),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sllv") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) << Number(regs[value.regs.src2]),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) << Number(regs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "srlv") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >>> Number(regs[value.regs.src2]),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >>> Number(regs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "srav") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >> Number(regs[value.regs.src2]),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) >> Number(regs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "jr") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            pc: Number(regs[value.regs.src1]),
          });
          inRegs = {
            ...regs,
            pc: Number(regs[value.regs.src1]),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "lui") {
        const im = Number(value.regs.src2).toString(2).padStart(16, "0");
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]: Number(bin.decimal(im + "0".padStart(16, "0"))),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: Number(bin.decimal(im + "0".padStart(16, "0"))),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "slti") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) < Number(value.regs?.src2) ? 1 : 0,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) < Number(value.regs?.src2) ? 1 : 0,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "andi") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) & Number(value.regs?.src2),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) & Number(value.regs?.src2),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "ori") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) | Number(value.regs?.src2),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) | Number(value.regs?.src2),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "xori") {
        let inRegs: any = {};
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) ^ Number(value.regs?.src2),
          });
          inRegs = {
            ...regs,
            [value.regs.dest]:
              Number(regs[value.regs.src1]) ^ Number(value.regs?.src2),
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "addi") {
        let inRegs: any = {};
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            regs[value.regs.src1] + Number(value.regs?.src2) > 2147483647 ||
            regs[value.regs.src1] + Number(value.regs?.src2) < -2147483647
          ) {
            result = getSigned32BitInt(
              regs[value.regs.src1] + Number(value.regs?.src2)
            );
          } else {
            result = regs[value.regs.src1] + Number(value.regs?.src2);
          }
          setRegs({
            ...regs,
            [value.regs.dest]: result,
          });
          inRegs = {
            ...regs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(inRegs).forEach((key: string) => {
            if (inRegs[key] !== 0) {
              nzr = { ...nzr, [key]: inRegs[key] };
              console.log(inRegs[key]);
              console.log(key);
              console.log(nzr);
            }
          });

          instructions.push({
            hex: "0x" + hexString,
            instruction: value.instruction,
            text: value.text,
            regs: nzr,
            stdout: overflow,
          });
        }
      }
    });
    return instructions;
  }

  useEffect(() => {
    if (!file) return;

    const fr = new FileReader();

    fr.readAsText(file);
    fr.onload = () => {
      setTexts(JSON.parse(fr.result as string));
    };
    //convert();
  }, [file]);

  useEffect(() => {
    if (texts) {
      setInstruction(convert(texts.text));
    }
  }, [texts]);

  return (
    <>
      <Flex w="100%" align={"center"} justify={"flex-end"}>
        <ModalChakra />
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
          overflowY={"scroll"}
          bg={useColorModeValue("gray.300", "gray.900")}
          borderRadius={5}
          boxShadow="xl"
          p={4}
        >
          <Text
            fontFamily={"courier new"}
            fontWeight={600}
            color={useColorModeValue("green.500", "green.300")}
            fontSize={"lg"}
            p={4}
          >
            <Flex direction="column" gap={4}>
              {instruction?.map((el, index) => (
                <pre key={index}>{JSON.stringify(el, undefined, 2)}</pre>
              ))}
            </Flex>
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default Simulator;
