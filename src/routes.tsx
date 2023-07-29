import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './pages/Main';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NewEntry from './pages/NewEntry';
import Report from './pages/Report';
import InitBalance from './pages/InitBalance';
import Loading from './pages/Loading';
import Welcome from './pages/Welcome';
import {EntryObject} from '../declarations';

type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Loading: undefined;
  Welcome: undefined;
  InitBalance: undefined;
  Main: undefined;
  Report: undefined;
  NewEntry: EntryObject | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default (isLogged: boolean) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogged ? (
          // Logged Screens
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="InitBalance" component={InitBalance} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Report" component={Report} />
            {/* @ts-ignore */}
            <Stack.Screen name="NewEntry" component={NewEntry} />
          </Stack.Group>
        ) : (
          // Auth Screens
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
