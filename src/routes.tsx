import React, {useContext} from 'react';
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
import {AuthContext} from './contexts/auth';
import {RootStackParamList} from './@types/routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
  const {userIsLogged} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userIsLogged ? (
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
