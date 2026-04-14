import { useCallback, useEffect, useState } from 'react';
import useFetchCurrencies from '../hooks/use-fetch-currencies';
import style from './Swap.module.css';
import CurrencyForm from './CurrencyForm';
import { Skeleton } from 'primereact/skeleton';


function Swap() {
    const { currencies, isLoading, error } = useFetchCurrencies();
    const [loading, setLoading] = useState(isLoading);
    const [isSwapping, setIsSwapping] = useState(false);

    const [toSendAmount, setToSendAmount] = useState<number>(1);
    const [toSendCurrency, setToSendCurrency] = useState("");
    const [loadingSend, setLoadingSend] = useState(false);

    const [toRecieveAmount, setToRecieveAmount] = useState<number>(1);
    const [toRecieveCurrency, setToRecieveCurrency] = useState("");
    const [loadingRecieve, setLoadingRecieve] = useState(false);

    const calculateAmount = useCallback(
        async (amount: number, coinSend: string, coinRecieved: string): Promise<number> => {
            if (!amount || !coinSend || !coinRecieved) return 0;

            const send = currencies.get(coinSend);
            const recieve = currencies.get(coinRecieved);

            if (!send || !recieve) return 0;

            // simuate request
            const promise = new Promise((resolve) => {
                setTimeout(async () => {
                    resolve(true);
                }, 1500)
            })
            await promise;

            return send.price / recieve.price * amount;
        }, [currencies])

    useEffect(function setInitValues() {
        (async () => {
            setLoading(true)
            if (!currencies.size) return;

            const initSend = currencies.get("WBTC");
            const initRecieve = currencies.get("ETH");

            if (!initSend || !initRecieve) return;

            const calculated = await calculateAmount(1, "WBTC", "ETH");

            setToSendAmount(1)
            setToSendCurrency(initSend!.currency)
            setToRecieveAmount(calculated)
            setToRecieveCurrency(initRecieve!.currency)

            setLoading(false)
        })()
    }, [currencies, calculateAmount])

    const onSendAmountChanged = async (amount: number) => {
        if (loadingRecieve) return;

        setLoadingRecieve(true)

        setToSendAmount(amount)

        const calculated = await calculateAmount(amount, toSendCurrency, toRecieveCurrency);
        setToRecieveAmount(calculated);

        setLoadingRecieve(false)
    }

    const onSendCurrencyChanged = async (currency: string) => {
        if (loadingRecieve) return;

        setLoadingRecieve(true)
        setToSendCurrency(currency)

        const calculated = await calculateAmount(toSendAmount, currency, toRecieveCurrency);
        setToRecieveAmount(calculated);

        setLoadingRecieve(false)
    }

    const onRecieveAmountChanged = async (amount: number) => {
        if (loadingSend) return;

        setLoadingSend(true)

        setToRecieveAmount(amount)

        const calculated = await calculateAmount(amount, toRecieveCurrency, toSendCurrency);
        setToSendAmount(calculated);

        setLoadingSend(false)
    }

    const onRecieveCurrencyChanged = async (currency: string) => {
        if (loadingSend) return;

        setLoadingSend(true)

        setToRecieveCurrency(currency)

        const calculated = await calculateAmount(toRecieveAmount, currency, toSendCurrency);
        setToSendAmount(calculated);

        setLoadingSend(false)
    }

    const swapCoins = async () => {
        if (loadingRecieve) return;

        setLoadingRecieve(true)
        setIsSwapping(true);

        setToSendAmount(toRecieveAmount);
        setToSendCurrency(toRecieveCurrency)

        setToRecieveCurrency(toSendCurrency)

        const calculated = await calculateAmount(toRecieveAmount, toRecieveCurrency, toSendCurrency);
        setToRecieveAmount(calculated)

        setIsSwapping(false);
        setLoadingRecieve(false)
    }

    return (
        <div className="flex justify-center mt-12">
            <div
                className={`${style.swap__container} ${style['swap__container--glow']} card-neon max-w-[500px]`}>
                <h2 className='mt-0 mb-12 text-center'>Crypto Exchange</h2>
                {error && <p className='error-message'>{error}</p>}

                {loading && (
                    <div className={style.swap__container + " max-w-[500px]"}>
                        <Skeleton width="430px" height="45px"></Skeleton>
                    </div>
                )}

                {/* send currency */}
                <CurrencyForm currencies={currencies}
                    className={loading ? "invisible h-0" : ""}
                    amount={toSendAmount}
                    currency={toSendCurrency}
                    inputLabel="Send"
                    inputLoading={loadingSend}
                    amountChanged={onSendAmountChanged}
                    currencyChanged={onSendCurrencyChanged} />

                {/* swap button */}
                <div className='flex justify-end mt-4 mb-4 w-full flex-1 '>
                    {loading && (
                        <Skeleton width="30px" height="30px"></Skeleton>
                    )}
                    {!loading && <div className={style.swap__button}
                        onClick={swapCoins}>
                        <i className={
                            `pi pi-sort-alt glowing-icon ${isSwapping ? "animate" : "idle"}`
                        } />
                    </div>}
                </div>

                {/* recieve currency */}
                <CurrencyForm currencies={currencies}
                    className={loading ? "invisible  h-0" : ""}
                    amount={toRecieveAmount}
                    currency={toRecieveCurrency}
                    inputLabel="Recieve"
                    inputLoading={loadingRecieve}
                    amountChanged={onRecieveAmountChanged}
                    currencyChanged={onRecieveCurrencyChanged} />

                {loading && (
                    <div className={style.swap__container + " max-w-[500px]"}>
                        <Skeleton width="430px" height="45px"></Skeleton>
                    </div>
                )}

            </div>
        </div >
    );
}

export default Swap;
