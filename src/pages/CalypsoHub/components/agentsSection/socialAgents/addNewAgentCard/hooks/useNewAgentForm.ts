import { useState } from 'react';

import { CreateSocialAgentPayload, TaskTarget } from '@/api/socialAgents/createAgent/types';

export const useNewAgentForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CreateSocialAgentPayload>({
    name: '',
    pictureURL: '',
    task_target: [TaskTarget.DISCORD],
    personality: '',
    prompt: '',
    action_rate: '24H',
    owner: '',
    target_credentials: {
      [TaskTarget.DISCORD]: {
        webhookUrl: '',
      },
      [TaskTarget.TELEGRAM]: {
        chatId: '',
      },
    },
    agentTask_actios_types: [],
  });

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return (
          formData.name &&
          formData.task_target.length > 0 &&
          formData.target_credentials &&
          Object.keys(formData.target_credentials).length > 0 &&
          formData.target_credentials[TaskTarget.DISCORD] !== undefined &&
          formData.target_credentials[TaskTarget.DISCORD].webhookUrl.length > 0
        );
      case 2:
        return formData.personality.length > 0;
      case 3:
        return formData.action_rate && formData.agentTask_actios_types && formData.agentTask_actios_types.length > 0;
      case 4:
        return formData.prompt && formData.pictureURL;
      default:
        return false;
    }
  };

  return {
    step,
    setStep,
    formData: {
      ...formData,
      isStepComplete: isStepComplete(),
    },
    setFormData,
    handleNext,
    handleBack,
  };
};
