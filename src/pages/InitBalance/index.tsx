import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import InitBalanceInput from './InitBalanceInput';
import Logo from '~/assets/logo-money.png';
import {
  ActionFooter,
  ActionPrimaryButton,
} from '~/components/Core/ActionFooter';
import {saveEntry} from '~/services/Entries';
import useCategories from '~/hooks/useCategories';
import {setInitialized} from '~/services/Welcome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '~/@types/routes';

type Props = NativeStackScreenProps<RootStackParamList, 'InitBalance'>;

const InitBalance = ({navigation}: Props) => {
  const [amount, setAmount] = useState(0);
  const [, , , initCategories] = useCategories();

  const onSavePress = () => {
    saveEntry({
      amount,
      // @ts-ignore TODO - TS
      category: initCategories,
      isInit: true,
    });
    setInitialized();
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={Logo} />
      </View>

      <InitBalanceInput amount={String(amount)} onChangeValue={setAmount} />

      <ActionFooter>
        <ActionPrimaryButton
          size="large"
          title="Continuar"
          onPress={onSavePress}
        />
      </ActionFooter>
    </View>
  );
};

export default InitBalance;
