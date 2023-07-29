import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

interface AuthData {
  email: string;
  password: string;
}

interface signUpData extends AuthData {
  name: string;
}
interface signInData extends AuthData {}

export const isLogged = async () => {
  const userStatus = await getUserAuth();
  return userStatus !== null;
};

export const setUserAuth = async (uid: string) => {
  const useruid = await AsyncStorage.setItem('userAuth', uid);
  console.log('UserUID :: ', useruid);
};

export const getUserAuth = async () => {
  const userAuth = await AsyncStorage.getItem('userAuth');
  return userAuth;
};

export const cleanUserAuth = async () => {
  await AsyncStorage.removeItem('userAuth');
};

export const clientRegister = async (data: signUpData) => {
  const {email, password, name} = data;
  try {
    const userInfo = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const {uid} = userInfo.user;
    await firestore().collection('users').doc(uid).set({
      name,
    });
    return {registerSuccess: true};
  } catch (error) {
    Alert.alert('Erro ao criar um usuário!');
    console.log({error});
    return {registerSucess: false};
  }
};

export const clientLogin = async (data: signInData) => {
  const {email, password} = data;
  try {
    const userInfo = await auth().signInWithEmailAndPassword(email, password);
    const {uid} = userInfo.user;
    setUserAuth(uid);
    return {loginSuccess: true};
  } catch (error) {
    Alert.alert('Login ou senha incorretos');
    return {loginSuccess: false};
  }
};
