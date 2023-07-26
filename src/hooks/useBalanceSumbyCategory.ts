import { useState, useEffect } from 'react';

import { getBalanceSumByCategory } from '~/services/Balance';

const useBalanceSumByCategory = (days = 7) => {
  const [balanceSum, setBalanceSum] = useState<number[]>([]);

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
