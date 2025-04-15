import {
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export const GenericModal = ({
  isOpen,
  onClose,
  header,
  body,
  footer,
  size,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalContentProps['maxW'];
}) => (
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent bgColor="base.black" borderWidth={1} borderColor="gray.800" maxW={size}>
      <ModalHeader color="base.white">{header}</ModalHeader>
      <ModalCloseButton />
      <Divider borderColor="gray.500" />
      <ModalBody maxH="400px" overflow="scroll" p={4}>
        {body}
      </ModalBody>
      {footer ? <ModalFooter>{footer}</ModalFooter> : null}
    </ModalContent>
  </Modal>
);
