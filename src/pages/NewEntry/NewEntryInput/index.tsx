import React from 'react';
import InputMoney from '~/components/Core/InputMoney';

interface NewEntryInputProps {
  value: string;
  onChangeValue: (value: number) => void;
  onChangeDebit: (value: boolean) => void;
}

const NewEntryInput = ({
  value,
  onChangeValue,
  onChangeDebit,
}: NewEntryInputProps) => {
  return (
    <InputMoney
      value={value}
      onChangeDebit={onChangeDebit}
      onChangeValue={onChangeValue}
    />
  );
};

export default NewEntryInput;
