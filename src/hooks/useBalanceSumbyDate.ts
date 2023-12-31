import {useState, useEffect} from 'react';

import {getBalanceSumByDate} from '~/services/Balance';

const useBalanceSumByDate = (days = 7) => {
  const [balanceSum, setBalanceSum] = useState<number[]>([]);

  useEffect(() => {
    async function loadBalanceSumByDate() {
      const data = await getBalanceSumByDate(days);
      // @ts-ignore TODO-TS
      setBalanceSum([...data]);
    }
    loadBalanceSumByDate();
  }, [days]);

  return [balanceSum];
};

export default useBalanceSumByDate;
