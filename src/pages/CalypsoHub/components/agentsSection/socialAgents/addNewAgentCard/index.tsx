import {
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FaChartLine, FaPlus, FaRobot, FaUsers } from 'react-icons/fa';

import { useCreateSocialAgent } from '@/api/socialAgents/createAgent/useCreateSocialAgent';
import { useGrixToast } from '@/components/useToast/useToast';
import { useUserAccount } from '@/utils/web3Util';

import { StepFour } from './components/StepFour';
import { StepOne } from './components/StepOne';
import { StepThree } from './components/StepThree';
import { StepTwo } from './components/StepTwo';
import { useNewAgentForm } from './hooks/useNewAgentForm';

export const NewAgentCard = () => {
  const { mutate: createAgent, isPending: isLoading } = useCreateSocialAgent();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { step, setStep, formData, setFormData, handleNext, handleBack } = useNewAgentForm();

  const { address } = useUserAccount();
  const grixToast = useGrixToast();

  const handleOpenNewAgentModal = () => {
    if (!address) {
      grixToast({
        title: 'Please connect your wallet to create an agent',
        status: 'error',
      });
      return;
    }
    onOpen();
  };

  const handleCloseModal = () => {
    setFormData({
      name: '',
      personality: '',
      task_target: [],
      prompt: '',
      action_rate: '',
      agentTask_actios_types: [],
      target_credentials: {},
      pictureURL: '',
      owner: '',
    });
    setStep(1);
    onClose();
  };

  const handleCreateAgent = () => {
    if (!address) {
      grixToast({
        title: 'Please connect your wallet to create an agent',
        status: 'error',
      });
      return;
    }
    createAgent({
      name: formData.name,
      owner: address,
      personality: formData.personality,
      prompt: formData.prompt,
      action_rate: formData.action_rate,
      task_target: formData.task_target,
      pictureURL: formData.pictureURL,
      agentTask_actios_types: formData.agentTask_actios_types,
      target_credentials: formData.target_credentials,
    });
    handleCloseModal();
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne formData={formData} setFormData={setFormData} />;
      case 2:
        return <StepTwo formData={formData} setFormData={setFormData} />;
      case 3:
        return <StepThree formData={formData} setFormData={setFormData} />;
      case 4:
        return <StepFour formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        p={4}
        bg="whiteAlpha.50"
        borderRadius="xl"
        cursor="pointer"
        _hover={{
          bg: 'whiteAlpha.100',
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        onClick={handleOpenNewAgentModal}
        mb={4}
        borderWidth={1}
        borderColor="whiteAlpha.200"
        transition="all 0.2s"
      >
        <VStack spacing={3}>
          <Box p={2} borderRadius="full" bg="whiteAlpha.100">
            <FaPlus size={20} color="white" />
          </Box>
          <Text color="white" fontWeight="medium">
            Create new social agent
          </Text>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent bg="gray.900" borderWidth={1} borderColor="whiteAlpha.200">
          <ModalHeader color="white">
            <HStack spacing={3}>
              {step === 1 && <Icon as={FaRobot} color="blue.400" />}
              {step === 2 && <Icon as={FaUsers} color="blue.400" />}
              {step === 3 && <Icon as={FaChartLine} color="blue.400" />}
              Configure New Social Agent ({step}/4)
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />

          <ModalBody pb={6}>{renderStep()}</ModalBody>

          <ModalFooter>
            {step > 1 && (
              <Button variant="ghost" mr={3} onClick={handleBack} color="white">
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button colorScheme="blue" onClick={handleNext} isDisabled={!formData.isStepComplete}>
                Next
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                onClick={handleCreateAgent}
                isLoading={isLoading}
                loadingText="Creating Agent"
                isDisabled={!formData.isStepComplete}
              >
                Create Agent
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
