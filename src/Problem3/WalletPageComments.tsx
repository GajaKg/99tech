/* eslint-disable react-refresh/only-export-components */

/**
 * FormattedWalletBalance is derived from WalletBalance
 * so it should extend WalletBalance.
*/
interface WalletBalance {
    // i would create type for currency
    // in general everything should be strongly typed to reduce potentional bugs, no 'any' used
    currency: string;
    amount: number;
}
interface FormattedWalletBalance extends WalletBalance {
    // because of extending these two should be removed
    //   currency: string;
    //   amount: number;
    formatted: string;
}

// not sure what BoxProps containes?
interface Props extends BoxProps {
    children?: React.ReactNode; // we should add children 
    /**
     * rest of the props should be something like
     * className, id, data-
     * because its used on div element
     */
}
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    /** 
     * instead this getPriority i would create simple object
     * const priority = { 'Osmosis': 100, 'Etherium': 50 ...}
     * 
     * also i would extract it on different file  (priority.const.ts)
     * in that way we can use it on other components 
     * and if we priority value is changed we changed only at one place
     * */
    // blockchain should have own type not any, type Blockchain = "Osmosis" | "Etherium" .... 
    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    /**
     * useMemo should be used for very large list/computations
     * in this case we have filtering and sorting so it's ok
     */
    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);

            // unnecessary nesting 
            // if (lhsPriority > -99 && balance.amount <= 0) return true 
            // -99 should be in constant
            if (lhsPriority > -99) { // lhsPriority does not exist? i guess it should be balancePriority
                if (balance.amount <= 0) { // i guess this should be amount biger then 0
                    return true;
                }
            }
            return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            /**
             * blockchain does not exist on WalletBalance
             * not sure should use currency property or add blockchain ?
             * based on this code: const usdValue = prices[balance.currency] * balance.amount;
             * (prices could be something like {"Ethereum": 1000})
             * i will assume that currency and blockchain is same
             */
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);

            // here we missing return 0 if values are equal
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
        });
        // 
        /**
         * prices is not used so it should be removed but
         * based on this code
         * const usdValue = prices[balance.currency] * balance.amount;
         * we could add mapping before filter and calculate 
         * usdValue, formatted and priority
         */
    }, [balances, prices]);

    // this should be removed, we are allready mapping in 'const row' so formatted can be set there 
    // const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    //     return {
    //         ...balance,
    //         formatted: balance.amount.toFixed()
    //     }
    // })

    // this should be directly in template because its simple template. 
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        const formatted = balance.amount.toFixed();
        return (
            <WalletRow
                className={classes.row}
                key={index} // we should avoid indexes as key
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows} 
            {/* we should add if rows are empty */}
        </div>
    )
}