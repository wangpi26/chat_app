export interface Message {
  id?: number;
  content: string;
  role: string;
  sessionId: number;
  parentId: number;
  version: number;
  nextMessageVersion: number;
}

export interface Session {
  id?: number;
  model: string;
  title: string;
}
