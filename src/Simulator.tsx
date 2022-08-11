import React, { useEffect, useState } from "react";
import * as hexToBinary from "hex-to-binary";
import * as bin from "binary-to-decimal";
import getSigned32BitInt from "get-signed-32-bit-int";

import {
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  Text,
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
  const { toggleColorMode } = useColorMode();

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
    $28: 268468224,
    $29: 2147479548,
    $30: 0,
    $31: 0,
    $pc: 4194304,
    $hi: 0,
    $lo: 0,
  });
  const [mem, setMem] = useState<any>({});

  function convert(stringToConvert: string[]) {
    const instructions: any = [];
    let localRegs = { ...regs };
    let localMem = { ...mem };
    stringToConvert.forEach((element, index) => {
      var hexString = element.slice(2, element.length);
      var binString = hexToBinary(hexString);
      var decString = bin.decimal(binString);
      const value = getInstruction(binString);

      if (index === 0) {
        localMem = { ...localMem, ["4194304"]: String(decString) };
        localRegs = { ...localRegs, $pc: Number(4194304) };
      } else {
        localMem = {
          ...localMem,
          [String(4194300 + (index + 1) * 4)]: String(decString),
        };
        localRegs = { ...localRegs, $pc: 4194300 + (index + 1) * 4 };
      }
      console.log("memoria", localMem);
      console.log("regs", localRegs);

      if (value?.instruction === "add") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(localRegs[value.regs.src1]) +
              Number(localRegs[value.regs?.src2]) >
              2147483647 ||
            Number(localRegs[value.regs.src1]) +
              Number(localRegs[value.regs?.src2]) <
              -2147483647
          ) {
            overflow = "overflow";
            result = getSigned32BitInt(
              Number(localRegs[value.regs.src1]) +
                Number(localRegs[value.regs?.src2])
            );
          } else {
            result =
              Number(localRegs[value.regs.src1]) +
              Number(localRegs[value.regs?.src2]);
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sub") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(localRegs[value.regs.src1]) -
              Number(localRegs[value.regs?.src2]) >
              2147483647 ||
            Number(localRegs[value.regs.src1]) -
              Number(localRegs[value.regs?.src2]) <
              -2147483647
          ) {
            overflow = "overflow";
            result = getSigned32BitInt(
              Number(localRegs[value.regs.src1]) -
                Number(localRegs[value.regs?.src2])
            );
          } else {
            result =
              Number(localRegs[value.regs.src1]) -
              Number(localRegs[value.regs?.src2]);
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "slt") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) <
              Number(localRegs[value.regs?.src2])
                ? 1
                : 0,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "and") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) &
              Number(localRegs[value.regs?.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "or") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) |
              Number(localRegs[value.regs?.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "xor") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) ^
              Number(localRegs[value.regs?.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "nor") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]: ~(
              Number(localRegs[value.regs.src1]) |
              Number(localRegs[value.regs?.src2])
            ),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "mfhi") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]: localRegs.hi,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "mflo") {
        let overflow = "";
        if (value.regs) {
          setRegs({
            ...localRegs,
            [value.regs.dest]: localRegs.lo,
          });
          localRegs = {
            ...localRegs,
            [value.regs.dest]: localRegs.lo,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "addu") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(localRegs[value.regs.src1]) +
              Number(localRegs[value.regs?.src2]) >
              2147483647 ||
            Number(localRegs[value.regs.src1]) +
              Number(localRegs[value.regs?.src2]) <
              -2147483647
          ) {
            result = getSigned32BitInt(
              Number(localRegs[value.regs.src1]) +
                Number(localRegs[value.regs?.src2])
            );
          } else {
            result =
              Number(localRegs[value.regs.src1]) +
              Number(localRegs[value.regs?.src2]);
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "subu") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            Number(localRegs[value.regs.src1]) -
              Number(localRegs[value.regs?.src2]) >
              2147483647 ||
            Number(localRegs[value.regs.src1]) -
              Number(localRegs[value.regs?.src2]) <
              -2147483647
          ) {
            result = getSigned32BitInt(
              Number(localRegs[value.regs.src1]) -
                Number(localRegs[value.regs?.src2])
            );
          } else {
            result =
              Number(localRegs[value.regs.src1]) -
              Number(localRegs[value.regs?.src2]);
          }
          localRegs = {
            ...localRegs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "mult") {
        const mult = (
          Number(localRegs[value.regs.src1]) *
          Number(localRegs[value.regs?.src2])
        )
          .toString(2)
          .padStart(64, "0");
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            hi: Number(bin.decimal(mult.slice(0, 31))),
            lo: Number(bin.decimal(mult.slice(31, mult.length))),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "multu") {
        const mult = (
          Number(localRegs[value.regs.src1]) *
          Number(localRegs[value.regs?.src2])
        )
          .toString(2)
          .padStart(64, "0");
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            hi: Number(bin.decimal(mult.slice(0, 31))),
            lo: Number(bin.decimal(mult.slice(31, mult.length))),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "div") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            hi:
              Number(localRegs[value.regs.src1]) %
              Number(localRegs[value.regs.src2]),
            lo:
              Number(localRegs[value.regs.src1]) /
              Number(localRegs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "divu") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            hi:
              Number(localRegs[value.regs.src1]) %
              Number(localRegs[value.regs.src2]),
            lo:
              Number(localRegs[value.regs.src1]) /
              Number(localRegs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sll") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) << Number(value.regs.src2),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "srl") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) >>> Number(value.regs.src2),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sra") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) >> Number(value.regs.src2),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sllv") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) <<
              Number(localRegs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "srlv") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) >>>
              Number(localRegs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "srav") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) >>
              Number(localRegs[value.regs.src2]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "jr") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            pc: Number(localRegs[value.regs.src1]),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "lui") {
        const im = Number(value.regs.src2).toString(2).padStart(16, "0");
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]: Number(bin.decimal(im + "0".padStart(16, "0"))),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "slti") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) < Number(value.regs?.src2)
                ? 1
                : 0,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "andi") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) & Number(value.regs?.src2),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "ori") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) | Number(value.regs?.src2),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "xori") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            [value.regs.dest]:
              Number(localRegs[value.regs.src1]) ^ Number(value.regs?.src2),
          };

          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "lw") {
        let overflow = "";
        if (value.regs) {
          console.log(
            String(localRegs[value.regs.src1] + Number(value.regs?.src2))
          );
          if (
            !localMem[
              String(localRegs[value.regs.src1] + Number(value.regs?.src2))
            ]
          ) {
            localMem = {
              ...localMem,
              [String(localRegs[value.regs.src1] + Number(value.regs?.src2))]:
                "0",
            };
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: Number(
              localMem[
                String(localRegs[value.regs.src1] + Number(value.regs?.src2))
              ]
            ),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sw") {
        let overflow = "";
        if (value.regs) {
          if (
            !localMem[
              String(localRegs[value.regs.src1] + Number(value.regs?.src2))
            ]
          ) {
            localMem = {
              ...localMem,
              [String(localRegs[value.regs.src1] + Number(value.regs?.src2))]:
                "0",
            };
          }

          localMem = {
            ...localMem,
            [String(localRegs[value.regs.src1] + Number(value.regs?.src2))]:
              String(localRegs[value.regs.dest]),
          };

          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "bltz") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            $pc:
              localRegs[value.regs.src1] < 0
                ? (localRegs.$pc + Number(value.regs.src2)) << 2
                : localRegs.$pc,
          };

          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "beq") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            $pc:
              localRegs[value.regs.src1] === localRegs[value.regs.dest]
                ? (localRegs.$pc + Number(value.regs.src2)) << 2
                : localRegs.$pc,
          };

          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "bne") {
        let overflow = "";
        if (value.regs) {
          localRegs = {
            ...localRegs,
            $pc:
              localRegs[value.regs.src1] !== localRegs[value.regs.dest]
                ? (localRegs.$pc + Number(value.regs.src2)) << 2
                : localRegs.$pc,
          };

          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "addiu") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            localRegs[value.regs.src1] + Number(value.regs?.src2) >
              2147483647 ||
            localRegs[value.regs.src1] + Number(value.regs?.src2) < -2147483647
          ) {
            result = getSigned32BitInt(
              localRegs[value.regs.src1] + Number(value.regs?.src2)
            );
          } else {
            result = localRegs[value.regs.src1] + Number(value.regs?.src2);
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "lb") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            !localMem[
              String(localRegs[value.regs.src1] + Number(value.regs.src2))
            ]
          ) {
            localMem = {
              ...localMem,
              [String(localRegs[value.regs.src1] + Number(value.regs.src2))]:
                "0",
            };
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: Number(
              localMem[
                String(localRegs[value.regs.src1] + Number(value.regs.src2))
              ]
            ),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "lbu") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            !localMem[
              String(localRegs[value.regs.src1] + Number(value.regs.src2))
            ]
          ) {
            localMem = {
              ...localMem,
              [String(localRegs[value.regs.src1] + Number(value.regs.src2))]:
                "0",
            };
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: Number(
              localMem[
                String(localRegs[value.regs.src1] + Number(value.regs.src2))
              ]
            ),
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "sb") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            !localMem[
              String(localRegs[value.regs.src1] + Number(value.regs.src2))
            ]
          ) {
            localMem = {
              ...localMem,
              [String(localRegs[value.regs.src1] + Number(value.regs.src2))]:
                "0",
            };
          }

          localMem = {
            ...localMem,
            [String(Number(value.regs.src2) + localRegs[value.regs.src1])]:
              String(255 & localRegs[value.regs.dest]),
          };

          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      } else if (value?.instruction === "addi") {
        let overflow = "";
        let result = 0;
        if (value.regs) {
          if (
            localRegs[value.regs.src1] + Number(value.regs?.src2) >
              2147483647 ||
            localRegs[value.regs.src1] + Number(value.regs?.src2) < -2147483647
          ) {
            result = getSigned32BitInt(
              localRegs[value.regs.src1] + Number(value.regs?.src2)
            );
          } else {
            result = localRegs[value.regs.src1] + Number(value.regs?.src2);
          }

          localRegs = {
            ...localRegs,
            [value.regs.dest]: result,
          };
          let nzr = {};
          Object.keys(localRegs).forEach((key: string) => {
            if (localRegs[key] !== 0) {
              nzr = { ...nzr, [key]: localRegs[key] };
            }
          });
          let nzrm = {};
          Object.keys(localMem).forEach((key: string) => {
            if (localMem[key] !== "0") {
              nzrm = { ...nzrm, [key]: localMem[key] };
            }
          });

          instructions.push({
            hex: "0x" + hexString,

            text: value.text,
            regs: nzr,
            mem: nzrm,
            stdout: overflow,
          });
        }
      }
    });
    setMem(localMem);
    setRegs(localRegs);
    return instructions;
  }

  useEffect(() => {
    if (!file) return;

    const fr = new FileReader();

    fr.readAsText(file);
    fr.onload = () => {
      const value = JSON.parse(fr.result as string);
      setTexts(value);
      setMem({ ...value.data, ["4194304"]: "0" });
    };
    //convert();
  }, [file]);

  useEffect(() => {
    if (texts) {
      console.log(texts.text);
      setInstruction(convert(texts.text));
    }
  }, [texts]);

  function jsonDownload() {
    var json = JSON.stringify(instruction, null, 2);
    var blob = new Blob([json], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "Mario_Luan_Lucas.MIPSSimulator.output.json";
    a.click();
  }

  return (
    <>
      <Flex w="100%" align={"center"} justify={"flex-end"}>
        <Button
          mr={4}
          mt={4}
          bg={"inherit"}
          variant="outline"
          borderColor={"gray.600"}
          onClick={jsonDownload}
        >
          Download
        </Button>

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
