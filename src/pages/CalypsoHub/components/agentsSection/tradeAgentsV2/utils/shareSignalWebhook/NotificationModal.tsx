/* eslint-disable max-lines */
import { QuestionOutlineIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';

import { getStatusInfo } from './getModalStatus';
import { TelegramGuideModal } from './TelegramGuideModal';
import { NotificationModalProps, WebhookDestination } from './types';

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onSubmit,
}) => {
  const [showBotToken, setShowBotToken] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Add validation logic
  const isDiscordValid = settings.type === WebhookDestination.DISCORD && settings.webhookUrl?.trim();
  const isTelegramValid =
    settings.type === WebhookDestination.TELEGRAM && settings.botToken?.trim() && settings.chatId?.trim();
  const isValid = settings.type === WebhookDestination.DISCORD ? isDiscordValid : isTelegramValid;

  const statusInfo = getStatusInfo(settings);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          bg="blackAlpha.900"
          borderWidth="2px"
          borderColor="blue.400"
          borderRadius="xl"
          boxShadow="0 0 20px rgba(66, 153, 225, 0.3)"
          transform="scale(1)"
          transition="transform 0.2s"
          _hover={{ transform: 'scale(1.01)' }}
        >
          <ModalHeader
            borderBottomWidth="1px"
            borderColor="blue.400"
            fontSize="lg"
            fontWeight="bold"
            color="white"
            textAlign="center"
          >
            Connect Your Channels
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel fontSize="sm" color="gray.400">
                Type
              </FormLabel>
              <Select
                value={settings.type}
                onChange={(e) => {
                  const newType = e.target.value as WebhookDestination;
                  onSettingsChange({
                    type: newType,
                    // Reset all fields when changing type
                    webhookUrl: newType === WebhookDestination.DISCORD ? settings.webhookUrl : undefined,
                    botToken: newType === WebhookDestination.TELEGRAM ? settings.botToken : undefined,
                    chatId: newType === WebhookDestination.TELEGRAM ? settings.chatId : undefined,
                  });
                }}
                color="gray.400"
              >
                <option value="discord">Discord</option>
                <option value="telegram">Telegram</option>
              </Select>
            </FormControl>

            {settings.type === WebhookDestination.DISCORD && (
              <FormControl mt={4}>
                <FormLabel fontSize="sm" color="gray.400">
                  <span>🎯 Webhook URL</span>
                </FormLabel>
                <Input
                  value={settings.webhookUrl}
                  onChange={(e) => onSettingsChange({ ...settings, webhookUrl: e.target.value })}
                  placeholder="Discord webhook URL"
                  _focus={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px #4299E1',
                  }}
                  _hover={{
                    borderColor: 'blue.300',
                  }}
                />
              </FormControl>
            )}

            {settings.type === WebhookDestination.TELEGRAM && (
              <>
                <FormControl mt={4}>
                  <FormLabel fontSize="sm" color="gray.400">
                    <span>🤖 Bot Token</span>
                    <Tooltip
                      label={`1. Message @BotFather on Telegram

2. Use /newbot command to create a new bot

3. Copy the API token provided by BotFather`}
                      placement="top"
                      hasArrow
                      whiteSpace="pre-line"
                    >
                      <QuestionOutlineIcon ml={2} color="gray.500" cursor="help" />
                    </Tooltip>
                    <Button size="xs" variant="ghost" colorScheme="blue" ml={4} onClick={() => setIsGuideOpen(true)}>
                      Need detailed guide?
                    </Button>
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={showBotToken ? 'text' : 'password'}
                      value={settings.botToken}
                      onChange={(e) => onSettingsChange({ ...settings, botToken: e.target.value })}
                      placeholder="Telegram bot token"
                      _focus={{
                        borderColor: 'blue.400',
                        boxShadow: '0 0 0 1px #4299E1',
                      }}
                      _hover={{
                        borderColor: 'blue.300',
                      }}
                      color="gray.400"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showBotToken ? 'Hide bot token' : 'Show bot token'}
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowBotToken(!showBotToken)}
                        icon={showBotToken ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        color="gray.400"
                        _hover={{
                          color: 'blue.400',
                        }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel fontSize="sm" color="gray.400">
                    Chat ID
                    <Tooltip
                      label={`1. Start a chat with your bot

2. Message @userinfobot

3. Copy the 'Id' number provided`}
                      placement="top"
                      hasArrow
                      whiteSpace="pre-line"
                    >
                      <QuestionOutlineIcon ml={2} color="gray.500" cursor="help" />
                    </Tooltip>
                  </FormLabel>
                  <Input
                    value={settings.chatId}
                    onChange={(e) => onSettingsChange({ ...settings, chatId: e.target.value })}
                    placeholder="Telegram chat ID"
                    color="gray.400"
                  />
                </FormControl>
              </>
            )}

            <Button
              position="relative"
              mt={6}
              width="full"
              height="56px"
              onClick={isValid ? onSubmit : undefined}
              fontSize="xl"
              fontWeight="bold"
              bg={
                isValid
                  ? 'linear-gradient(135deg, #4299E1 0%, #2B6CB0 100%)'
                  : 'linear-gradient(135deg, #2D3748 0%, #1A202C 100%)'
              }
              color={isValid ? 'white' : 'gray.400'}
              border="2px solid"
              borderColor={isValid ? 'blue.400' : 'gray.600'}
              borderRadius="xl"
              overflow="hidden"
              cursor={isValid ? 'pointer' : 'not-allowed'}
              opacity={isValid ? 1 : 0.8}
              title={statusInfo.hoverMessage}
              _hover={{
                transform: isValid ? 'translateY(-2px)' : 'none',
                boxShadow: isValid ? '0 0 20px rgba(66, 153, 225, 0.6)' : 'none',
                _before: {
                  opacity: isValid ? '0.5' : '0',
                },
                '& .power-dots': {
                  opacity: isValid ? '1' : '0',
                  transform: isValid ? 'scale(1)' : 'scale(0.8)',
                },
                '& .hover-message': {
                  opacity: isValid ? '0' : '1',
                  transform: 'translateY(0)',
                },
              }}
              _active={{
                transform: isValid ? 'scale(0.98)' : 'none',
                boxShadow: isValid ? 'inset 0 0 10px rgba(0,0,0,0.4)' : 'none',
                '& .launch-text': {
                  transform: isValid ? 'scale(0.95) translateY(1px)' : 'none',
                },
              }}
              sx={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                  animation: 'shine 3s infinite',
                },
                '@keyframes shine': {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' },
                },
                '@keyframes pulse': {
                  '0%': { opacity: 0.3, transform: 'scale(1)' },
                  '50%': { opacity: 1, transform: 'scale(1.2)' },
                  '100%': { opacity: 0.3, transform: 'scale(1)' },
                },
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-2px)' },
                  '100%': { transform: 'translateY(0px)' },
                },
              }}
            >
              {/* Hover message tooltip - only show when not valid */}
              {!isValid && (
                <div
                  className="hover-message"
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(10px)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: 'white',
                    whiteSpace: 'nowrap',
                    opacity: '0',
                    transition: 'all 0.3s',
                    pointerEvents: 'none',
                    zIndex: '10',
                  }}
                >
                  {statusInfo.hoverMessage}
                </div>
              )}

              {/* Power dots */}
              <div
                className="power-dots"
                style={{
                  position: 'absolute',
                  left: '20px',
                  display: 'flex',
                  gap: '6px',
                  opacity: 0,
                  transform: 'scale(0.8)',
                  transition: 'all 0.3s',
                }}
              >
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: isValid ? '#90CDF4' : '#4A5568',
                      animation: isValid ? `pulse 1.5s infinite ${i * 0.2}s` : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Main content */}
              <div
                className="launch-text"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  transition: 'transform 0.2s',
                }}
              >
                <span
                  style={{
                    marginRight: '8px',
                    animation: isValid ? 'float 2s infinite ease-in-out' : 'none',
                    opacity: isValid ? 1 : 0.5,
                  }}
                >
                  🚀
                </span>
                {statusInfo.buttonText}
              </div>

              {/* Status indicator */}
              <div
                style={{
                  position: 'absolute',
                  right: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: statusInfo.color,
                    boxShadow: statusInfo.shadow,
                    animation: isValid ? 'pulse 2s infinite' : 'none',
                  }}
                />
              </div>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <TelegramGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </>
  );
};
