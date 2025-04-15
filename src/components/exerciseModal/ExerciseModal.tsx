/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

export const ExerciseModal = ({ isOpen, onClose }: any) => (
  <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" closeOnOverlayClick size="md">
    <ModalOverlay />
    <ModalContent borderRadius="12px" boxShadow="0 4px 20px 0 rgba(0, 0, 0, 0.12)" transition="0.3s">
      <ModalHeader fontSize="2xl" fontWeight="semibold" color="#2C3E50" borderBottomWidth="1px" pb={4} mb={4}>
        Feature in Progress
      </ModalHeader>
      <ModalCloseButton
        _focus={{
          boxShadow: '0 0 1px 2px rgba(66, 153, 225, 0.6)',
        }}
      />
      <ModalBody>
        <Text fontSize="md" color="#34495E" mb={4} lineHeight="1.6">
          <Text as="span" fontWeight="semibold">
            This is a Grix future feature:
          </Text>
          We're putting our best efforts into.
        </Text>
      </ModalBody>
      <ModalFooter>
        <Box
          as={Button}
          bg="#3498DB"
          color="white"
          px={7}
          py={4}
          rounded="8px"
          _hover={{ bg: '#2980B9' }}
          _active={{ bg: '#1A5276', transform: 'scale(0.98)' }}
          onClick={onClose}
        >
          Understand
        </Box>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
