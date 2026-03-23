export enum PlayerPosition {
  GOLEIRO = 'GOLEIRO',
  ZAGUEIRO = 'ZAGUEIRO',
  MEIA = 'MEIA',
  ATACANTE = 'ATACANTE'
}

export interface Player {
  id?: string; 
  groupId: string;
  name: string;
  age: number;
  position: PlayerPosition;
  isPresent: boolean;
  createdAt?: string;
}