import { IMessage } from './i-message';

export class Message implements IMessage {
    name: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}