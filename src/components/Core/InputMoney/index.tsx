import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {styles} from './styles';

interface InputMoneyProps {
  value: string;
  onChangeValue: (res: number) => void;
  onChangeDebit: (res: boolean) => void;
  startWithDebt?: boolean;
}

const InputMoney = (props: InputMoneyProps) => {
  const {value, onChangeValue, startWithDebt = true, onChangeDebit} = props;
  const floatValue = parseFloat(value);

  const setDefaultDebit = () => {
    if (floatValue === 0) {
      return startWithDebt ? -1 : 1;
    }
    return floatValue <= 0 ? -1 : 1;
  };
  const setDefaultPrefix = () => {
    if (floatValue === 0) {
      return startWithDebt ? '-' : '';
    }
    return floatValue <= 0 ? '-' : '';
  };

  const [debit, setDebit] = useState(setDefaultDebit);
  const [debitPrefix, setDebitPrefix] = useState(setDefaultPrefix);
  const handleChangeDebit = () => {
    if (debit < 0) {
      setDebit(1);
      setDebitPrefix('');
      onChangeDebit && onChangeDebit(false);
    } else {
      setDebit(-1);
      setDebitPrefix('-');
      onChangeDebit && onChangeDebit(true);
    }
    onChangeValue(floatValue * -1);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        disabled={!startWithDebt}
        onPress={handleChangeDebit}
        style={styles.debitButton}>
        <Text style={styles.debitButtonPrefix}>{debitPrefix}</Text>
        <Text style={styles.debitButtonUnit}>R$</Text>
      </TouchableOpacity>
      <TextInputMask
        style={styles.input}
        type="money"
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: ' ',
          suffixUnit: '',
        }}
        value={value}
        includeRawValueInChangeText
        onChangeText={(text: string, rawValue?: string) => {
          const floatResult = parseFloat(rawValue ?? '0') * debit;
          onChangeValue(floatResult);
        }}
      />
    </SafeAreaView>
  );
};

export default InputMoney;
