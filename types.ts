export enum Sender {
  USER = 'USER',
  AI = 'AI'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isCode?: boolean;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: string;
  network: string;
}

export enum Tab {
  CHAT = 'CHAT',
  LEARN = 'LEARN',
  WALLET = 'WALLET'
}
