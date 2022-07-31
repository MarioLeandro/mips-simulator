import * as hexToBinary from "hex-to-binary";
import * as bin from "binary-to-decimal";
import Data from "./instructions.json";

const Instructions = Data;

export function getInstruction(binString: string) {
  var instruction = Instructions.find((instruction) => {
    if (binString.slice(0, 6) === "000000") {
      //tipo R
      return (
        instruction.opcode === binString.slice(0, 6) &&
        instruction.function === binString.slice(-6)
      );
    } else {
      return instruction.opcode === binString.slice(0, 6);
    }
  });

  return `${instruction?.instruction} $${bin.decimal(
    binString.slice(16, 21)
  )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
    binString.slice(11, 16)
  )}`;
}
