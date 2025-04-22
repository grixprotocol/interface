import {
  Box,
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { formatBalance } from '../utils/formatters';

type WithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: () => void;
  isLoading: boolean;
  claimableGS: string;
  vestingAmount: string;
  totalReserved: string;
};

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onClose,
  onWithdraw,
  isLoading,
  claimableGS,
  vestingAmount,
  totalReserved,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(5px)" />
      <ModalContent bg="#111" maxW="360px">
        <ModalHeader p={4} display="flex" alignItems="center" justifyContent="space-between">
          <Text color="white" fontSize="md">
            Withdraw
          </Text>
          <ModalCloseButton position="static" color="gray.400" _hover={{ color: 'white' }} />
        </ModalHeader>

        <Box px={4} pb={4}>
          <VStack spacing={3} align="stretch">
            <VStack spacing={2} align="stretch">
              <HStack justify="space-between" bg="#1A1A1A" p={3} borderRadius="md">
                <Text color="gray.400" fontSize="sm">
                  Claimable GRIX
                </Text>
                <Text color="white" fontSize="sm">
                  {formatBalance(claimableGS)} GRIX
                </Text>
              </HStack>

              <HStack justify="space-between" bg="#1A1A1A" p={3} borderRadius="md">
                <Text color="gray.400" fontSize="sm">
                  Vesting
                </Text>
                <Text color="white" fontSize="sm">
                  {formatBalance(vestingAmount)} esGS
                </Text>
              </HStack>

              <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={2}>
                <HStack justify="space-between" p={2}>
                  <Text color="gray.400" fontSize="sm">
                    Total reserved
                  </Text>
                  <Text color="white" fontSize="sm">
                    {formatBalance(totalReserved)} tokens
                  </Text>
                </HStack>
              </Box>
            </VStack>

            <Button
              onClick={onWithdraw}
              isLoading={isLoading}
              loadingText="Withdrawing"
              bg="primary.500"
              color="white"
              size="lg"
              width="full"
              height="40px"
              fontSize="sm"
              _hover={{ bg: 'primary.600' }}
              _active={{ bg: 'primary.700' }}
            >
              Withdraw
            </Button>
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};
