import {Message_1} from "./Message_1";

export interface ChatItem {
  id: string;
  name: String;
  members: string[];
  messages: Message_1[]
  group: boolean
}
