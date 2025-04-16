/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseIcon, WarningIcon } from '@chakra-ui/icons';
import { Box, Button, Icon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React from 'react';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  additionalInfo?: any;
  origin: string;
};

export const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, message, additionalInfo, origin }) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent mx="4" bg="white" borderRadius="lg" boxShadow="xl">
      <ModalHeader display="flex" alignItems="center" justifyContent="space-between" borderBottomWidth="1px" paddingBottom="1rem">
        <Box display="flex" alignItems="center">
          <Icon as={WarningIcon} w={8} h={8} color="red.500" mr="3" />
          <Text fontSize="xl" fontWeight="bold">
            Error
          </Text>
        </Box>
        <Button variant="ghost" onClick={onClose}>
          <Icon as={CloseIcon} w={6} h={6} />
        </Button>
      </ModalHeader>

      <ModalBody>
        <Box fontSize="lg" color="gray.700" my="4" textAlign="center">
          <Text mb="2">{message}</Text>
          {origin && (
            <Text fontWeight="medium" mb="2">
              Origin: {origin}
            </Text>
          )}
          {additionalInfo && (
            <Text fontSize="sm" color="gray.500">
              {additionalInfo}
            </Text>
          )}
        </Box>
      </ModalBody>

      <ModalFooter justifyContent="center">
        <Button variant="solid" colorScheme="red" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
