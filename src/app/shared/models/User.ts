
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

type Timestamp = firebase.firestore.Timestamp;
export interface User {
  id: string;
  email: string;
  name: string;
  lastActive: any;
  active: boolean;
}
