import {useState, useEffect} from 'react';
import {CategoryObject} from '~/components/EntrySummary/EntrySummaryChart';

import {getBalanceSumByCategory} from '~/services/Balance';

const useBalanceSumByCategory = (days = 7) => {
  const [balanceSum, setBalanceSum] = useState<
    {
      amount: number;
      category: CategoryObject;
    }[]
  >([]);

  useEffect(() => {
    async function loadBalanceSumByCategory() {
      const data = await getBalanceSumByCategory(days);

      setBalanceSum([...data]);
    }
    loadBalanceSumByCategory();
  }, [days]);

  return [balanceSum];
};

export default useBalanceSumByCategory;
