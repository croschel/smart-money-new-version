import React, {useContext, useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Logo from '~/assets/logo-money-huge.png';
import {clientLogin} from '~/services/Auth';
import colors from '~/styles/colors';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthContext} from '~/contexts/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = (props: Props) => {
  const {signUser} = useContext(AuthContext);
  const {navigation} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (loading === false) {
      setLoading(true);
      const data = {
        email,
        password,
      };
      const {loginSuccess} = await clientLogin(data);
      if (loginSuccess) {
        signUser();
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={Logo} />
      <Text style={styles.header}>Smart Money</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor={colors.carbon}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor={colors.carbon}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={loading ? true : false}
          onPress={onSubmit}
          style={styles.signInButton}>
          <Text style={styles.signInTextButton}>
            {loading ? 'Carregando' : 'Entrar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signUpButton}>
          <Text style={styles.signUpTextButton}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
