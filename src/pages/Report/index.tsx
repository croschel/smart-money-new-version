import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import BalanceLabel from '~/components/BalanceLabel';
import EntrySummary from '~/components/EntrySummary';
import EntryList from '~/components/EntryList';
import RelativeDaysModal from '~/components/Core/RelativeDaysModal';
import CategoryModal from '~/components/CategoryModal';
import {
  ActionFooter,
  ActionPrimaryButton,
} from '~/components/Core/ActionFooter';
import colors from '~/styles/colors';
import styles from './styles';
import {formatSingleNumber} from '~/util';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CategoryObject} from '../../../declarations';

type Props = NativeStackScreenProps<RootStackParamList, 'Report'>;

const Report = ({navigation}: Props) => {
  const [showRelativeDaysModal, setShowRelativeDaysModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [relativeDays, setRelativeDays] = useState(7);
  const [category, setCategory] = useState<CategoryObject>({
    id: null,
    name: 'Todas as Categorias',
  });

  const onCategoryCloseModal = () => {
    setShowCategoryModal(false);
  };

  const onSelectCategory = (item: CategoryObject) => {
    setCategory(item);
    onCategoryCloseModal();
  };

  const onRelativeDaysClose = () => {
    setShowRelativeDaysModal(false);
  };

  const onRelativeDaysPress = (days: number) => {
    setRelativeDays(days);
    onRelativeDaysClose();
  };
  return (
    <SafeAreaView style={styles.container}>
      <BalanceLabel />
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          onPress={() => setShowRelativeDaysModal(true)}
          style={styles.filterButton}>
          <Text style={styles.filterButtonText}>
            {formatSingleNumber(relativeDays)}
          </Text>
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color={colors.champagneDark}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowCategoryModal(true)}
          style={styles.filterButton}>
          <Text style={styles.filterButtonText}>{category.name}</Text>
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color={colors.champagneDark}
          />
        </TouchableOpacity>
        <RelativeDaysModal
          isVisible={showRelativeDaysModal}
          onConfirm={onRelativeDaysPress}
          onCancel={onRelativeDaysClose}
        />
        <CategoryModal
          modalVisible={showCategoryModal}
          onSelectCategory={onSelectCategory}
          onClose={onCategoryCloseModal}
          debit={false}
          filter={false}
        />
      </View>
      <ScrollView>
        <EntrySummary days={relativeDays} />
        <EntryList
          onEntryPress={entry => navigation.navigate('NewEntry', {...entry})}
          days={relativeDays}
          category={category}
        />
      </ScrollView>
      <View>
        <ActionFooter>
          <ActionPrimaryButton
            title="Fechar"
            onPress={() => navigation.goBack()}
          />
        </ActionFooter>
      </View>
    </SafeAreaView>
  );
};

export default Report;
