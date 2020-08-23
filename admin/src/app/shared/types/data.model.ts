// Common data response
export interface DataResponse<T> {
  data: T;
  token?: string;
  success: boolean;
  messages: DataMessage;
}

// Data message interface
export interface DataMessage {
  text: string;
  type: DataMessageType;
}

// Types of data message
export type DataMessageType = 'info' | 'warn' | 'error';
