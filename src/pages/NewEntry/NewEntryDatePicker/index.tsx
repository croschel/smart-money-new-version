import React, {useState} from 'react';
import {View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ButtonIcon from '~/components/Core/ButtonIcon';

interface NewEntryDatePickerProps {
  value: Date;
  onChange: (data: Date) => void;
}

const NewEntryDatePicker = ({value, onChange}: NewEntryDatePickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onCancel = () => {
    setModalVisible(false);
  };

  const onChangeValue = (date: Date) => {
    onChange(date);
    onCancel();
  };
  return (
    <View>
      <ButtonIcon onButtonPress={() => setModalVisible(true)} icon="today" />
      <DateTimePicker
        mode="date"
        // datePickerModeAndroid="calendar"
        // titleIOS="Data de vencimento"
        cancelTextIOS="Cancelar"
        confirmTextIOS="Ok"
        date={value}
        isVisible={modalVisible}
        onConfirm={onChangeValue}
        onCancel={onCancel}
      />
    </View>
  );
};

export default NewEntryDatePicker;
