import { InfoIcon } from '@chakra-ui/icons';
import { IconButton, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';

import { InfoPopoverProps } from '../../interfaces/general';

export const InfoPopover = ({ data, iconColor = 'black', sizeBox }: InfoPopoverProps & { iconColor?: string }) => (
  <Popover trigger="hover">
    <PopoverTrigger>
      <IconButton
        icon={<InfoIcon boxSize="0.8rem" color={iconColor} />}
        size="xs"
        aria-label="Info"
        variant="ghost"
        _hover={!iconColor ? { backgroundColor: '#000000' } : {}} // The desired background color on hover
      />
    </PopoverTrigger>
    <PopoverContent p={1} bg="white" color="black" border="1px solid #E2E8F0" maxW={sizeBox}>
      <PopoverBody textAlign="center" fontSize="sm">
        {data}
      </PopoverBody>
    </PopoverContent>
  </Popover>
);
