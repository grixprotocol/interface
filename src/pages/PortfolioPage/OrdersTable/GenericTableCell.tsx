import { Box, HStack, Img, ImgProps, Text, TextProps, Tooltip, VStack } from '@chakra-ui/react';
import React from 'react';

type GenericTableCellProps = {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  titleProps?: TextProps;
  description?: string;
  descriptionProps?: TextProps;
  descriptionSecondary?: string;
  descriptionSecondaryProps?: TextProps;
  rightIcon?: React.ReactNode;
  img?: string | undefined;
  imgProps?: ImgProps;
  navigateToProps?: {
    as: 'a';
    href: string;
    target: '_blank' | '_self' | '_parent' | '_top';
    rel: 'noopener noreferrer' | 'noopener' | 'noreferrer';
  };
  btn?: React.ReactNode;
  isInline?: boolean;
  tooltipText?: string;
};

export const GenericTableCell = ({
  icon,
  title,
  titleProps,
  description,
  descriptionProps,
  descriptionSecondary,
  descriptionSecondaryProps,
  rightIcon,
  img,
  imgProps,
  navigateToProps,
  btn,
  isInline = true,
  tooltipText,
}: GenericTableCellProps) => {
  const IconComponent = icon && (
    <Box borderRadius="50%" bgColor="gray.800" p="10px" border="1px solid" borderColor="gray.700">
      {icon}
    </Box>
  );

  const ImageComponent = img && (
    <Img src={img} width="25px" height="25px" borderRadius="50%" border="1px solid" borderColor="gray.700" p={1} m={1} {...imgProps} />
  );

  const TitleComponent =
    typeof title === 'string' ? (
      <Text w="full" color="gray.300" {...titleProps}>
        {title}
      </Text>
    ) : (
      title
    );

  const DescriptionComponent = (
    <HStack justify="flex-start" w="full" visibility={description ? undefined : 'hidden'}>
      <Text color="gray.700" {...descriptionProps}>
        {description ?? '-'}
      </Text>
      <Text {...descriptionSecondaryProps}>{descriptionSecondary}</Text>
    </HStack>
  );

  return (
    <HStack gap={4}>
      {IconComponent}
      <Box display="flex" alignItems="center" justifyContent="center" {...navigateToProps}>
        {btn}
        {ImageComponent}
        {isInline ? (
          <>
            {TitleComponent}
            {DescriptionComponent}
          </>
        ) : (
          <>
            {tooltipText ? (
              <Tooltip label={tooltipText} placement="top" hasArrow>
                <VStack>
                  {TitleComponent}
                  {DescriptionComponent}
                </VStack>
              </Tooltip>
            ) : (
              <VStack>
                {TitleComponent}
                {DescriptionComponent}
              </VStack>
            )}
          </>
        )}
      </Box>
      {rightIcon}
    </HStack>
  );
};
