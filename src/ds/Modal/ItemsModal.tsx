import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useCallback } from 'react';

export const ItemsModal = ({
  isOpen,
  onClose,
  onSelection,
  title,
  items,
  value,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  onSelection: (value: string) => void;
  title: string;
  value: string;
  items: {
    label: string;
    value: string;
    description?: string;
    badge?: string;
  }[];
}) => {
  const handleSelection = (value: string) => {
    onSelection(value);
    onClose();
  };

  const selectedBtnRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      node.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  }, []);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="base.black" borderWidth={1} borderColor="gray.800" maxW="320px">
        <ModalHeader color="base.white">{title}</ModalHeader>
        <ModalCloseButton />
        <Divider borderColor="gray.500" />
        <ModalBody maxH="400px" overflow="scroll" p={4}>
          {items.map((item, index) => (
            <Button
              key={item.value}
              onClick={() => handleSelection(item.value)}
              variant="unstyled"
              w="full"
              ref={item.value === value ? selectedBtnRef : undefined}
            >
              <HStack spacing={1} w="full" h="40px" justify="space-between">
                <HStack>
                  <Box color="gray.25" fontSize="m" fontWeight="600">
                    {item.label}
                  </Box>
                  <Box>{item.description}</Box>
                  {item.badge ? <Badge variant="primaryBlue">{item.badge}</Badge> : undefined}
                </HStack>
                {value === item.value && <Badge variant="primary">Selected</Badge>}
              </HStack>
              {index === items.length - 1 ? null : <Divider borderColor="gray.800" />}
            </Button>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
