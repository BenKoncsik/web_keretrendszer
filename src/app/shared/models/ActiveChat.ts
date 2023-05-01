import {ActiveMessageListItem} from "./ActiveMessageListItem";

export interface ActiveChat {
  uid: string;
  activeChats: ActiveMessageListItem[];

}
