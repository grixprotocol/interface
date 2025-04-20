import { Text } from '@chakra-ui/react';
import React from 'react';

type BoldGrixProps = {
  text: string;
};

export const BoldGrix: React.FC<BoldGrixProps> = ({ text }) => {
  const parts = text.split(/(GRIX|esGRIX)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (part === 'GRIX' || part === 'esGRIX') {
          return (
            <Text as="b" key={index}>
              {part}
            </Text>
          );
        }
        return part;
      })}
    </>
  );
};
