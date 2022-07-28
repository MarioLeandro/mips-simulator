import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import instructions from "../utils/instructions.json"

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useColorModeValue
} from '@chakra-ui/react'

function ModalChakra() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
      <>
        <Button 
        mr={4}
        mt={4}
        bg={"inherit"}
        variant="outline"
        borderColor={"gray.600"}
        onClick={onOpen}>Instruções</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size={"xl"} >
          <ModalOverlay />
          <ModalContent minW='1000px' minH='600px' borderRadius="10">
            <ModalHeader borderRadius="10">Instruções MIPS</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table
                  size={"lg"} 
                  variant='striped'
                  colorScheme= "green">
                  <Thead>
                    <Tr>
                      <Th>Instrução</Th>
                      <Th>Tipo</Th>
                      <Th>Opcode</Th>
                      <Th>Função</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      instructions.map((instruction) => (
                        <Tr>
                          <Td>{instruction.instruction}</Td>
                          <Td>{instruction.type}</Td>
                          <Td>{instruction.opcode}</Td>
                          <Td>{instruction.function ? instruction.function : 0}</Td>
                        </Tr>
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    ) 
}

export default ModalChakra;