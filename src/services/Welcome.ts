import firestore from '@react-native-firebase/firestore';
import {getUserAuth} from './Auth';

export const isInitialized = async () => {
  let openningBalance = false;
  const uid = await getUserAuth();
  if (uid !== null) {
    const userInfo = await firestore().collection('users').doc(uid).get();
    openningBalance = userInfo.data()?.openningBalance;
  }

  return openningBalance !== null && openningBalance === true;
};

export const setInitialized = async () => {
  const uid = await getUserAuth();
  if (uid !== null) {
    await firestore()
      .collection('users')
      .doc(uid)
      .set({openningBalance: true}, {merge: true});
    // console.log('AsyncStorage Test :: ', item);
  }
};

export const cleanInitialized = async () => {
  const uid = await getUserAuth();
  if (uid !== null) {
    await firestore()
      .collection('users')
      .doc(uid)
      .set({openningBalance: false}, {merge: true});
  }
};
