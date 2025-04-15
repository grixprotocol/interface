import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';

import { OptionPriceListItem } from '@/pages/TradePage/components/OptionPicker/OptionPriceListItem';

import { OptionMatrixAccessor, OptionMatrixItem } from '../types';

export const OptionsSelector = ({
  item,
  accessor,
  onClose,
}: {
  item?: OptionMatrixItem;
  accessor?: OptionMatrixAccessor;
  onClose: VoidFunction;
}) => (
  <Modal isCentered isOpen={!!item} onClose={onClose}>
    <ModalOverlay />
    <ModalContent bgColor="base.black" borderWidth={1} borderColor="gray.800" maxW="480px">
      <ModalHeader color="base.white">Protocols</ModalHeader>
      <ModalCloseButton />
      <Divider borderColor="gray.500" />
      <ModalBody maxH="400px" overflow="scroll" p={4}>
        {accessor &&
          item?.[accessor].map((option) => (
            <OptionPriceListItem key={option.optionId} isSelected={false} option={option} onSelect={() => undefined} />
          ))}
      </ModalBody>
    </ModalContent>
  </Modal>
);
