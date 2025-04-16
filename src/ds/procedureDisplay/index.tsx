import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Link, Spinner, Text, Tooltip } from '@chakra-ui/react';
import { format } from 'date-fns';

import { ProcedureSteps } from '@/api';
import { addressShortcut } from '@/utils/web3Util';

export const ProcedureDisplay = ({ procedure }: { procedure: { steps: { [key: string]: ProcedureSteps } } }) => {
  const stepsMap = procedure.steps;

  const procedureStatus = {
    solverSelectionProcess: stepsMap['1'] !== undefined, // Solver Selection Process
    optionSettlement: stepsMap['2'] !== undefined, // Option Settlement
    finalClearing: stepsMap['3'] !== undefined, // Final Clearing
  };

  let spinnerShown = false; // Track if the spinner has been shown
  const formatDate = (date: string) => format(new Date(parseInt(date, 10) * 1000), 'MMM d, h:mm:ss a');

  const createArbiscanLink = (hash: string) => `https://arbiscan.io/tx/${hash}`;

  return (
    <Box backgroundColor="black" padding={4} borderRadius="md">
      <Flex direction="row" alignItems="start" justifyContent="start">
        <Box position="relative" height="150px" width="2px" bg="gray.700" borderRadius="md">
          {/* Green bars representing progress */}
          <Box
            position="absolute"
            top="0"
            height={procedureStatus.solverSelectionProcess ? '50%' : '0%'}
            width="2px"
            backgroundColor="teal.400"
            transition="height 0.3s ease-in-out"
          />
          <Box
            position="absolute"
            bottom="0"
            height={procedureStatus.optionSettlement ? '50%' : '0%'}
            width="2px"
            backgroundColor="teal.400"
            transition="height 0.3s ease-in-out"
          />

          {/* Circle indicators for each step */}
          <Box position="absolute" top="0" left="-5px">
            <Box
              width="12px"
              height="12px"
              backgroundColor={procedureStatus.solverSelectionProcess ? 'teal.400' : 'gray.500'}
              borderRadius="50%"
              transition="background-color 0.3s ease"
            />
          </Box>
          <Box position="absolute" top="50%" left="-5px" transform="translateY(-50%)">
            <Box
              width="12px"
              height="12px"
              backgroundColor={procedureStatus.optionSettlement ? 'teal.400' : 'gray.500'}
              borderRadius="50%"
              transition="background-color 0.3s ease"
            />
          </Box>
          <Box position="absolute" bottom="0" left="-5px">
            <Box
              width="12px"
              height="12px"
              backgroundColor={procedureStatus.finalClearing ? 'teal.400' : 'gray.500'}
              borderRadius="50%"
              transition="background-color 0.3s ease"
            />
          </Box>
        </Box>

        {/* Adjusted spacing between the line and the text */}
        <Flex direction="column" ml={10} height="150px" justifyContent="space-between">
          {/* Solver Selection Process */}
          <Flex alignItems="center">
            <Text color={procedureStatus.solverSelectionProcess ? 'teal.300' : 'gray.500'} fontWeight="bold" fontSize="md">
              Solver Selection Process
            </Text>
            <Tooltip
              label={`${stepsMap['1']?.description || ''}${
                stepsMap['1']?.updated_at ? ` (Created: ${formatDate(stepsMap['1']?.updated_at)})` : ''
              }`}
              aria-label="Solver Selection Process Description"
            >
              <Icon as={InfoOutlineIcon} color="gray.500" ml={2} />
            </Tooltip>
            {procedureStatus.solverSelectionProcess
              ? null
              : !spinnerShown && (spinnerShown = true) && <Spinner thickness="2px" speed="0.65s" color="gray.500" size="sm" ml={2} />}
          </Flex>

          {/* Option Settlement */}
          <Flex alignItems="center">
            <Text color={procedureStatus.optionSettlement ? 'blue.300' : 'gray.500'} fontWeight="bold" fontSize="md">
              Option Settlement
            </Text>
            <Tooltip
              label={`${stepsMap['2']?.description || ''}${
                stepsMap['2']?.updated_at ? ` (Created: ${formatDate(stepsMap['2']?.updated_at)})` : ''
              }`}
              aria-label="Option Settlement Description"
            >
              <Icon as={InfoOutlineIcon} color="gray.500" ml={2} />
            </Tooltip>
            {stepsMap['2']?.transactionHash && (
              <Link href={createArbiscanLink(stepsMap['2'].transactionHash)} isExternal ml={2}>
                <Text color="gray.300">{addressShortcut(stepsMap['2'].transactionHash)}</Text>
              </Link>
            )}
            {procedureStatus.optionSettlement
              ? null
              : !spinnerShown && (spinnerShown = true) && <Spinner thickness="2px" speed="0.65s" color="gray.500" size="sm" ml={2} />}
          </Flex>

          {/* Final Clearing */}
          <Flex alignItems="center">
            <Text color={procedureStatus.finalClearing ? 'whiteAlpha.800' : 'gray.500'} fontWeight="bold" fontSize="md">
              Final Clearing
            </Text>
            <Tooltip
              label={`${stepsMap['3']?.description || ''}${
                stepsMap['3']?.updated_at ? ` (Created: ${formatDate(stepsMap['3']?.updated_at)})` : ''
              }`}
              aria-label="Final Clearing Description"
            >
              <Icon as={InfoOutlineIcon} color="gray.500" ml={2} />
            </Tooltip>
            {stepsMap['3']?.transactionHash && (
              <Link href={createArbiscanLink(stepsMap['3'].transactionHash)} isExternal ml={2}>
                <Text color="gray.300">{addressShortcut(stepsMap['3'].transactionHash)}</Text>
              </Link>
            )}
            {procedureStatus.finalClearing
              ? null
              : !spinnerShown && (spinnerShown = true) && <Spinner thickness="2px" speed="0.65s" color="gray.500" size="sm" ml={2} />}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};
