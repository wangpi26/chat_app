import { storage } from "./dbUtils"
import { Message } from "./interfaces";

// Database operations
export const insertMessage = async (message: Message): Promise<number> => {
  // Get the next available message ID
  const nextMessageId = await getNextMessageId();

  // Set the message ID in the new message object
  const newMessage: Message = {
    ...message, // Copy existing properties
    id: nextMessageId, // Set the new message ID
  };

  // Save the new message to the storage
  await storage.set(`message_${newMessage.id}`, newMessage);

  return newMessage.id;
};

export const getAllMessages = async (): Promise<Message[]> => {
  const messages: Message[] = [];

  await storage.forEach((value, key, iterationNumber) => {
    if (key.startsWith('message_')) {
      messages.push(value);
    }
  });

  return messages;
};

export const getMessagesBySessionId = async (
  sessionId: number
): Promise<Message[]> => {
  const allMessages = await getAllMessages();
  const messagesBySessionId = allMessages.filter(
    (message) => message.sessionId === sessionId
  );
  return messagesBySessionId;
};

// ... other message-related functions ...
const getNextMessageId = async (): Promise<number> => {
  const messages = await getAllMessages();

  if (messages.length === 0) {
    return 1;
  }

  const maxId = messages.reduce(
    (maxId, currentMessage) => Math.max(maxId, currentMessage.id),
    0
  );

  return maxId + 1;
};
