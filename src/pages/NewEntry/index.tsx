import React, {useState} from 'react';
import {View} from 'react-native';
import BalanceLabel from '~/components/BalanceLabel';
import NewEntryInput from './NewEntryInput';
import NewEntryCategory from './NewEntryCategory';
import NewEntryDatePicker from './NewEntryDatePicker';
import NewEntryDeleteAction from './NewEntryDeleteAction';
import NewEntryGeoPicker from './NewEntryGeoPicker';
import NewEntryCameraPicker from './NewEntryCameraPicker';
import {
  ActionFooter,
  ActionPrimaryButton,
  ActionSecondaryButton,
} from '~/components/Core/ActionFooter';
import useEntries from '~/hooks/useEntries';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EntryObject} from '../../../declarations';

type Props = NativeStackScreenProps<RootStackParamList, 'NewEntry'>;

const NewEntry = ({navigation, route}: Props) => {
  const entry = route.params;
  const {saveEntry, updateEntry, deleteEntry} = useEntries();

  const isEdit = entry.id !== null;
  const [debit, setDebit] = useState<boolean>(entry.amount <= 0);
  const [amount, setAmount] = useState<string>(`${entry.amount.toFixed(2)}`);
  const [category, setCategory] = useState(entry.category);
  const [entryAt, setEntryAt] = useState(
    isEdit ? entry.entryAt.toDate() : entry.entryAt,
  );
  const [addressState, setAddressState] = useState(entry.address ?? '');
  const [photo, setPhoto] = useState(entry.photo ?? '');
  const [latitudeState, setLatitudeState] = useState(entry.latitude);
  const [longitudeState, setLongitudeState] = useState(entry.longitude);

  const isValid = () => {
    if (parseFloat(amount) !== 0) {
      return true;
    }
    return false;
  };

  const onClose = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  const onSave = async () => {
    const value: EntryObject = {
      amount: parseFloat(amount),
      address: addressState,
      latitude: latitudeState,
      longitude: longitudeState,
      category,
      entryAt,
      photo,
      isInit: false,
    };
    if (isEdit) {
      await updateEntry(value, entry.id ?? '');
    } else {
      await saveEntry(value);
    }
    onClose();
  };

  const onDelete = async () => {
    await deleteEntry(entry);
    onClose();
  };
  return (
    <View style={styles.container}>
      <BalanceLabel />
      <View style={styles.formContainer}>
        <NewEntryInput
          value={amount}
          onChangeValue={(value: number) => setAmount(String(value))}
          onChangeDebit={(value: boolean) => setDebit(value)}
        />
        <NewEntryCategory
          debit={debit}
          category={category}
          onChangeCategory={setCategory}
        />
        <View style={styles.formActionContainer}>
          <NewEntryDatePicker value={entryAt} onChange={setEntryAt} />
          <NewEntryDeleteAction onOkPress={onDelete} entry={entry} />
          <NewEntryGeoPicker
            address={addressState}
            onChange={({latitude, longitude, address}) => {
              setLatitudeState(latitude);
              setLongitudeState(longitude);
              setAddressState(address);
            }}
          />
          <NewEntryCameraPicker
            photo={photo}
            onChangePhoto={(value: string) => setPhoto(value)}
          />
        </View>
      </View>
      <View>
        <ActionFooter>
          <ActionPrimaryButton
            title={entry.id ? 'Atualizar' : 'Adicionar'}
            onPress={() => isValid() && onSave()}
          />
          <ActionSecondaryButton title="Cancelar" onPress={onClose} />
        </ActionFooter>
      </View>
    </View>
  );
};

export default NewEntry;
