import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Logo from '~/assets/logo-money-huge.png';
import {clientRegister} from '~/services/Auth';
import colors from '~/styles/colors';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = (props: Props) => {
  const {navigation} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const onSubmit = async () => {
    if (loading === false) {
      setLoading(true);
      const data = {
        email,
        password,
        name,
      };
      const {registerSuccess} = await clientRegister(data);
      if (registerSuccess) {
        navigation.reset({
          index: 0,
          routes: [{name: 'SignIn'}],
        });
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={Logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Seu nome"
          placeholderTextColor={colors.carbon}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          value={name}
          onChangeText={text => setName(text)}
        />
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
            {loading ? 'Carregando' : 'Criar conta'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.signUpButton}>
          <Text style={styles.signUpTextButton}>Já tenho uma conta</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
