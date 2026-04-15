

/*********** wallet.models.ts **********/
const Blockchain = {
    "Osmosis": "Osmosis",
    "Ethereum": "Ethereum",
    "Arbitrum": "Arbitrum",
    "Zilliqa": "Zilliqa",
    "Neo": "Neo",
} as const;
type BlockchainTypes = typeof Blockchain[keyof typeof Blockchain]


interface WalletBalance {
    currency: BlockchainTypes;
    amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
    usdValue: number
    priority: number
}


/*********** wallet.const.ts **********/
const PRIORITIES: Record<BlockchainTypes, number> = {
    [Blockchain.Osmosis]: 100,
    [Blockchain.Ethereum]: 50,
    [Blockchain.Arbitrum]: 30,
    [Blockchain.Zilliqa]: 20,
    [Blockchain.Neo]: 20,
};

const UNKNOWN_PRIORITY = -99;

/*********** WalletPage.tsx **********/
interface Props extends BoxProps {
    children?: React.ReactNode;
    className?: "wallet"
}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const sortedBalances = useMemo(() => {
        return balances
            .map((balance: WalletBalance): FormattedWalletBalance => {
                return {
                    ...balance,
                    usdValue: prices[balance.currency] * balance.amount,
                    formatted: balance.amount.toFixed(),
                    priority: PRIORITIES[balance.currency] || UNKNOWN_PRIORITY
                }
            })
            .filter((balance: FormattedWalletBalance) => {
                if (balance.priority > UNKNOWN_PRIORITY && balance.amount > 0) return true;
                return false;
            })
            .sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => {
                return rhs.priority - lhs.priority
            });
    }, [balances, prices]);

    return (
        <div {...rest}>
            {sortedBalances.length > 0 ? (
                sortedBalances.map((balance: FormattedWalletBalance) => (
                    <WalletRow
                        className={classes.row}
                        key={balance.currency}
                        amount={balance.amount}
                        usdValue={balance.usdValue}
                        formattedAmount={balance.formatted}
                    />
                ))
            ) : (
                <div>Wallet is empty</div>
            )}
            {/* {children} */}
        </div>
    )
}

export { WalletPage }
