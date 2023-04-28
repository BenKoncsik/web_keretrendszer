
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

type Timestamp = firebase.firestore.Timestamp;
export interface User {
  id: string;
  email: string;
  name: String;
  lastActive: any;
  active: boolean;
}
