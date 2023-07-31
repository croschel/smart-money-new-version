import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

declare module 'react-native-vector-icons/MaterialIcons';
declare module '*.png';

export interface EntryObject {
  id: string | null;
  amount: number;
  description: string | null;
  entryAt: FirebaseFirestoreTypes.Timestamp | Date | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  photo: string | null;
  isInit: boolean;
  category: CategoryObject;
}

export interface CategoryObject {
  id: string | null;
  name: string;
  color?: string;
  isInit?: boolean;
  isDefault?: boolean;
  isCredit?: boolean;
  isDebit?: boolean;
  order?: number;
  entries?: EntryObject;
}
