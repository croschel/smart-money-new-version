import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {isInitialized} from '~/services/Welcome';
import colors from '~/styles/colors';

import {styles} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/@types/routes';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const Loading = ({navigation}: Props) => {
  useEffect(() => {
    async function makeRedirect() {
      const isInitialLlogin = await isInitialized();

      if (isInitialLlogin === true) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      }
    }
    makeRedirect();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.violet} size={60} />
    </View>
  );
};

export default Loading;
