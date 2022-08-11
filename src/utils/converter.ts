import * as bin from "binary-to-decimal";
import Data from "./instructions.json";

const Instructions = Data;

export function getInstruction(binString: string) {
  const instruction = Instructions.find((instruction) => {
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

  if (instruction?.instruction === "add") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "sub") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "slt") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "and") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "or") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "xor") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "nor") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "mfhi") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "mflo") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "addu") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "subu") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "mult") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction}  $${bin.decimal(
        binString.slice(6, 11)
      )} $${bin.decimal(binString.slice(11, 16))}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "multu") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction}  $${bin.decimal(
        binString.slice(6, 11)
      )} $${bin.decimal(binString.slice(11, 16))}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "div") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction}  $${bin.decimal(
        binString.slice(6, 11)
      )} $${bin.decimal(binString.slice(11, 16))}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "divu") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction}  $${bin.decimal(
        binString.slice(6, 11)
      )} $${bin.decimal(binString.slice(11, 16))}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "sll") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(11, 16))} ${bin.decimal(
        binString.slice(21, 26)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(11, 16)),
        src2: bin.decimal(binString.slice(21, 26)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "srl") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(11, 16))} ${bin.decimal(
        binString.slice(21, 26)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(11, 16)),
        src2: bin.decimal(binString.slice(21, 26)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "sra") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )} $${bin.decimal(binString.slice(11, 16))} ${bin.decimal(
        binString.slice(21, 26)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(11, 16)),
        src2: bin.decimal(binString.slice(21, 26)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "sllv") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )}  $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "srlv") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )}  $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "srav") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(16, 21)
      )}  $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
        binString.slice(11, 16)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "jr") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(6, 11)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: "$" + bin.decimal(binString.slice(11, 16)),
        dest: "$" + bin.decimal(binString.slice(16, 21)),
      },
    };
  } else if (instruction?.instruction === "lui") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )} ${bin.decimal(binString.slice(16, binString.length))}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "slti") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  $${bin.decimal(binString.slice(6, 11))}  ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "andi") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  $${bin.decimal(binString.slice(6, 11))}  ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "ori") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  $${bin.decimal(binString.slice(6, 11))}  ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "xori") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  $${bin.decimal(binString.slice(6, 11))}  ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "lw") {
    console.log(
      `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )} ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`
    );
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "sw") {
    console.log(
      `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )} ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`
    );
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "bltz") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(6, 11)
      )} ${bin.decimal(binString.slice(16, binString.length))}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "beq") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(6, 11)
      )} $${bin.decimal(binString.slice(11, 16))} ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "bne") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(6, 11)
      )} $${bin.decimal(binString.slice(11, 16))} ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "addiu") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  $${bin.decimal(binString.slice(6, 11))}  ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "lb") {
    console.log(
      `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )} ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`
    );
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "lbu") {
    console.log(
      `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )} ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`
    );
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "sb") {
    console.log(
      `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )} ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`
    );
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  ${bin.decimal(binString.slice(16, binString.length))}($${bin.decimal(
        binString.slice(6, 11)
      )})`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "j") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} ${bin.decimal(
        binString.slice(6, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(6, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "jal") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} ${bin.decimal(
        binString.slice(6, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(6, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "syscall") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} ${bin.decimal(
        binString.slice(6, 26)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(6, 26))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  } else if (instruction?.instruction === "addi") {
    return {
      instruction: instruction?.instruction,
      text: `${instruction?.instruction} $${bin.decimal(
        binString.slice(11, 16)
      )}  $${bin.decimal(binString.slice(6, 11))}  ${bin.decimal(
        binString.slice(16, binString.length)
      )}`,
      regs: {
        src1: "$" + bin.decimal(binString.slice(6, 11)),
        src2: String(bin.decimal(binString.slice(16, binString.length))),
        dest: "$" + bin.decimal(binString.slice(11, 16)),
      },
    };
  }

  /* return `${instruction?.instruction} $${bin.decimal(
    binString.slice(16, 21)
  )} $${bin.decimal(binString.slice(6, 11))} $${bin.decimal(
    binString.slice(11, 16)
  )}`; */
}
