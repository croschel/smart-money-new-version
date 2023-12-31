import {useEffect, useState} from 'react';
import {CategoryObject} from '~/../declarations';
import {
  getEntries,
  saveEntry,
  updateEntry,
  deleteEntry,
} from '~/services/Entries';

const useEntries = (days = 7, category?: CategoryObject) => {
  const [entries, setEntries] = useState<{id: string}[]>([]);

  useEffect(() => {
    async function loadEntries() {
      if (category) {
        const data = await getEntries(days, category);
        setEntries(data);
      }
    }
    loadEntries();
  }, [days, category]);
  return {entries, saveEntry, updateEntry, deleteEntry};
};

export default useEntries;
