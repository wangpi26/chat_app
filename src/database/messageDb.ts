import { storage } from "./dbUtils"
import { Message } from "./interfaces";

// Database operations
export const insertMessage = async (message: Message): Promise<number> => {
  // Get the next available message ID
  const nextMessageId = await getNextMessageId(message.sessionId);

  // Set the message ID in the new message object
  const newMessage: Message = {
    ...message, // Copy existing properties
    id: nextMessageId, // Set the new message ID
  };

  // Save the new message to the storage
  await storage.set(`message_${newMessage.sessionId}_${newMessage.id}`, newMessage);

  return newMessage.id!;
};

export const getAllMessages = async (): Promise<Message[]> => {
  const messages: Message[] = [];

  await storage.forEach((value, key, iterationNumber) => {
    if (key.startsWith(`message_`)) {
      messages.push(value);
    }
  });

  return messages;
};

// 根据sessionId获取并按顺序排列消息
export const getMessagesBySessionId = async (
  sessionId: number
): Promise<Message[]> => {
  // 获取所有与sessionId相关的消息
  const allMessages: Message[] = [];

  await storage.forEach((value, key, iterationNumber) => {
    if (key.startsWith(`message_${sessionId}_`)) {
      allMessages.push(value);
    }
  });

  // 递归地找到下一条消息
  const getNextMessage = (
    parentId: number,
    nextMessageVersion: number,
    messages: Message[]
  ): Message[] => {
    const nextMessage = messages.find(
      message =>
        message.parentId === parentId && message.version === nextMessageVersion
    );
    if (!nextMessage) {
      return [];
    }
    console.log('nextMessage -> ',nextMessage);
    return [
      nextMessage,
      ...getNextMessage(nextMessage.id!, nextMessage.nextMessageVersion, messages),
    ];
  };

  // 从parentId为0且version为1的消息开始获取并排序所有消息
  const sortedMessages = getNextMessage(0, 0, allMessages);

  return sortedMessages;
};


// ... other message-related functions ...
export const getNextMessageId = async (sessionId: number): Promise<number> => {
  // 获取所有与sessionId相关的消息
  const messages: Message[] = [];

  await storage.forEach((value, key, iterationNumber) => {
    if (key.startsWith(`message_${sessionId}_`)) {
      messages.push(value);
    }
  });

  if (messages.length === 0) {
    return 1;
  }
  
  const maxId = messages.reduce(
    (maxId, currentMessage) => Math.max(maxId, currentMessage.id!),
    0
  );
  
  return maxId + 1;
};
