import { Button, Flex, VStack } from '@chakra-ui/react';

import { layoutConstants } from '@/configDesign';
import { Table } from '@/ds';
import { PNLChart } from '@/ds/PNLChart';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import { useCalculatorFields } from './components/useCalculatorFields';
import { useCalculatorTable } from './components/useCalculatorTable';

export const CalculatorPage = () => {
  const { fields, addRow, removeRow, onChange } = useCalculatorFields();

  const debouncedFields = useDebouncedValue(fields);
  const table = useCalculatorTable({ data: fields, onChange, onRemoveRow: removeRow });

  return (
    <VStack
      backgroundColor="base.black"
      minHeight={layoutConstants.mainContentHeight}
      data-testid="calculator-page"
      align="center"
      w="full"
      gap={24}
    >
      <VStack w="full" gap={12}>
        <Table table={table} />
        <Button onClick={addRow}>Add Row</Button>
      </VStack>
      <Flex w="80%" justifyContent="center" borderWidth={1} borderColor="gray.800">
        <PNLChart attributes={debouncedFields[0]} />;
      </Flex>
    </VStack>
  );
};
