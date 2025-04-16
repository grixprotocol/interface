import { Button, ButtonProps, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { componentStyleVariants } from '@/configDesign';

export const ToastBox = ({
  icon,
  title,
  description,
  buttonProps,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  buttonProps: ButtonProps;
}) => (
  <VStack paddingTop={componentStyleVariants.header.headerFlexStyle.h}>
    <HStack
      borderRadius={6}
      borderWidth={1}
      borderColor="primary.600"
      paddingX={5}
      paddingY={3}
      gap={5}
      bgColor="primary.950"
      minW="380px"
    >
      {icon}
      <VStack w="full" align="flex-start" spacing={1}>
        <Text fontWeight="600" color="white.950">
          {title}
        </Text>
        {description && <Text color="white.950">{description}</Text>}
        <Flex w="full" justify="flex-end">
          <Button bgColor="primary.500" color="white.950" {...buttonProps} />
        </Flex>
      </VStack>
    </HStack>
  </VStack>
);
