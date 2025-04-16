import {
  Box,
  Code,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';

type TelegramGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TelegramGuideModal: React.FC<TelegramGuideModalProps> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="xl">
    <ModalOverlay backdropFilter="blur(4px)" />
    <ModalContent bg="blackAlpha.900" borderWidth="2px" borderColor="blue.400" borderRadius="xl" maxHeight="80vh" overflowY="auto">
      <ModalHeader color="white">Complete Telegram Setup Guide</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb={4}>
            <Tab color="gray.300" _selected={{ color: 'white', bg: 'blue.600' }}>
              Bot Token
            </Tab>
            <Tab color="gray.300" _selected={{ color: 'white', bg: 'blue.600' }}>
              Private Chat
            </Tab>
            <Tab color="gray.300" _selected={{ color: 'white', bg: 'blue.600' }}>
              Channel
            </Tab>
            <Tab color="gray.300" _selected={{ color: 'white', bg: 'blue.600' }}>
              Group Chat
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text fontWeight="bold" color="blue.400">
                  Creating a Bot & Getting Token:
                </Text>
                <OrderedList spacing={3} color="gray.300">
                  <ListItem>Open Telegram application then search for @BotFather</ListItem>
                  <ListItem>Click Start</ListItem>
                  <ListItem>Click Menu → /newbot or type /newbot and hit Send</ListItem>
                  <ListItem>
                    Follow the instructions until you receive a message containing your bot token
                    <Box mt={2} bg="whiteAlpha.100" p={3} borderRadius="md">
                      <Text fontSize="sm" as="pre" whiteSpace="pre-wrap">
                        Done! Congratulations on your new bot. You will find it at t.me/new_bot. Use this token to access the HTTP API:
                        63xxxxxx71:AAFoxxxxn0hwA-2TVSxxxNf4c
                      </Text>
                    </Box>
                  </ListItem>
                  <ListItem>Save this token securely - don&apos;t share it with anyone!</ListItem>
                </OrderedList>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text fontWeight="bold" color="blue.400">
                  Getting Chat ID for Private Chat:
                </Text>
                <OrderedList spacing={3} color="gray.300">
                  <ListItem>Search and open your new Telegram bot</ListItem>
                  <ListItem>Click Start or send a message</ListItem>
                  <ListItem>
                    Open this URL in your browser:
                    <Code display="block" my={2} p={2} bg="whiteAlpha.100" color="blue.300" fontSize="sm">
                      https://api.telegram.org/bot{'{your_bot_token}'}
                      /getUpdates
                    </Code>
                  </ListItem>
                  <ListItem>
                    Look for the &quot;chat&quot; → &quot;id&quot; value in the JSON response:
                    <Box mt={2} bg="whiteAlpha.100" p={3} borderRadius="md">
                      <Text fontSize="sm" as="pre" whiteSpace="pre-wrap">
                        {`{
  "ok": true,
  "result": [{
    "message": {
      "chat": {
        "id": 21xxxxx38,  <- This is your Chat ID
        "type": "private"
      }
    }
  }]
}`}
                      </Text>
                    </Box>
                  </ListItem>
                </OrderedList>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text fontWeight="bold" color="blue.400">
                  Getting Chat ID for a Channel:
                </Text>
                <OrderedList spacing={3} color="gray.300">
                  <ListItem>Add your Telegram bot to the channel</ListItem>
                  <ListItem>Send a message to the channel</ListItem>
                  <ListItem>
                    Open this URL in your browser:
                    <Code display="block" my={2} p={2} bg="whiteAlpha.100" color="blue.300" fontSize="sm">
                      https://api.telegram.org/bot{'{your_bot_token}'}
                      /getUpdates
                    </Code>
                  </ListItem>
                  <ListItem>
                    Find the channel_post → chat → id in the response:
                    <Box mt={2} bg="whiteAlpha.100" p={3} borderRadius="md">
                      <Text fontSize="sm" as="pre" whiteSpace="pre-wrap">
                        {`{
  "ok": true,
  "result": [{
    "channel_post": {
      "chat": {
        "id": -1001xxxxxx062,  <- This is your Channel ID
        "type": "channel"
      }
    }
  }]
}`}
                      </Text>
                    </Box>
                  </ListItem>
                </OrderedList>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack align="stretch" spacing={4}>
                <Text fontWeight="bold" color="blue.400">
                  Getting Chat ID for a Group:
                </Text>
                <OrderedList spacing={3} color="gray.300">
                  <ListItem>Open Telegram in a desktop app</ListItem>
                  <ListItem>Add your bot to the group chat</ListItem>
                  <ListItem>Send a message to the group</ListItem>
                  <ListItem>
                    Right click on the message and click &quot;Copy Message Link&quot;
                    <Box mt={2} bg="whiteAlpha.100" p={3} borderRadius="md">
                      <Text fontSize="sm">You&apos;ll get a link like: https://t.me/c/194xxxx987/11/13</Text>
                      <Text fontSize="sm" mt={2}>
                        The number after /c/ is your group ID (194xxxx987)
                      </Text>
                      <Text fontSize="sm" mt={2} color="blue.300">
                        Important: Add -100 prefix to this number when using it!
                      </Text>
                    </Box>
                  </ListItem>
                </OrderedList>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Box mt={6} bg="blue.900" p={4} borderRadius="md">
          <Text color="white" fontSize="sm">
            💡 Pro Tip: To verify your setup, you can test sending a message using this URL format:
            <Code display="block" mt={2} p={2} bg="whiteAlpha.200" color="blue.300" fontSize="sm">
              https://api.telegram.org/bot{'{your_bot_token}'}
              /sendMessage?chat_id={'{your_chat_id}'}&text=test123
            </Code>
          </Text>
        </Box>
      </ModalBody>
    </ModalContent>
  </Modal>
);
