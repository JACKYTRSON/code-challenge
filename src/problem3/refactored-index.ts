interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  priority: number;
  formatted: string;
  usdValue: number;
}

interface Props extends BoxProps {}

const PRIORITY_MAP: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => PRIORITY_MAP[blockchain] ?? -99;

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .map((balance) => {
        const priority = getPriority(balance.blockchain);
        const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

        return {
          ...balance,
          priority,
          formatted: balance.amount.toFixed(), // ✅ same as original
          usdValue,
        };
      })
      .filter((balance) => balance.priority > -99 && balance.amount <= 0) // ✅ same as original
      .sort((a, b) => b.priority - a.priority);
  }, [balances, prices]);

  return (
    <div {...rest}>
      {formattedBalances.map((balance) => (
        <WalletRow
          className={classes.row}
          key={balance.currency} // ✅ stable key
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
