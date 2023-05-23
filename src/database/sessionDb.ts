import { storage } from './dbUtils';
import { Session } from './interfaces';

// Implement session-related functions
export const getAllSessions = async (): Promise<Session[]> => {
  const sessions: Session[] = [];

  await storage.forEach((value, key, iterationNumber) => {
    if (key.startsWith('session_')) {
      sessions.push(value);
    }
  });

  return sessions;
};


export const insertSession = async (session: Session): Promise<number> => {
  // Get the next available session ID
  const nextSessionId = await getNextSessionId();

  // Set the session ID in the new session object
  const newSession: Session = {
    ...session, // Copy existing properties
    id: nextSessionId, // Set the new session ID
  };

  // Save the new session to the storage
  await storage.set(`session_${newSession.id}`, newSession);

  return newSession.id;
};

const getNextSessionId = async (): Promise<number> => {
  const sessions = await getAllSessions();

  if (sessions.length === 0) {
    return 1;
  }

  const maxId = sessions.reduce(
    (maxId, currentSession) => Math.max(maxId, currentSession.id),
    0
  );

  return maxId + 1;
};
