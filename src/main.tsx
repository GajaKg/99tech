import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// import { useEffect, useState } from 'react';
// import useFetchCurrencies from '../hooks/useFetchCurrencies';
// import style from './swap.module.css';
// import CurrencyForm from './CurrencyForm';
// import { Skeleton } from 'primereact/skeleton';
// import type { Currency } from '../types/crypto.types';

// const calculateAmount = async (amount: number, coinSend: Currency, coinRecieved: Currency): Promise<number> => {
//     if (!amount || !coinSend.price || !coinRecieved.price) return 0;

//     const promise = new Promise((resolve) => {
//         setTimeout(async () => {
//             resolve(true);
//         }, 1500)
//     })
//     await promise;

//     if (!coinSend || !coinRecieved) return 0;

//     return coinSend.price / coinRecieved.price * amount;
// }


// function Swap() {
//     const { currencies, isLoading } = useFetchCurrencies();
//     const [loading, setLoading] = useState(isLoading);
//     const [isSwapping, setIsSwapping] = useState(false);

//     const [toSendAmount, setToSendAmount] = useState<number>(1);
//     const [toSendCurrency, setToSendCurrency] = useState("");
//     const [loadingSend, setLoadingSend] = useState(false);

//     const [toRecieveAmount, setToRecieveAmount] = useState<number>(1);
//     const [toRecieveCurrency, setToRecieveCurrency] = useState("");
//     const [loadingRecieve, setLoadingRecieve] = useState(false);

//     useEffect(function setInitValues() {
//         (async () => {
//             setLoading(true)
//             if (!currencies.size) return;

//             const initSend = currencies.get("WBTC");
//             const initRecieve = currencies.get("ETH");

//             if (!initSend || !initRecieve) return;

//             const calculated = await calculateAmount(1, initSend, initRecieve);

//             setToSendAmount(1)
//             setToSendCurrency(initSend!.currency)
//             setToRecieveAmount(calculated)
//             setToRecieveCurrency(initRecieve!.currency)

//             setLoading(false)
//         })()
//     }, [currencies])

//     const onSendAmountChanged = async (amount: number) => {
//         if (loadingRecieve) return;

//         setLoadingRecieve(true)
//         setToSendAmount(amount)

//         const initSend = currencies.get(toSendCurrency);
//         const initRecieve = currencies.get(toRecieveCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(amount, initSend, initRecieve);

//         setToRecieveAmount(calculated);
//         setLoadingRecieve(false)
//     }
    
//     const onSendCurrencyChanged = async (currency: string) => {
//         if (loadingRecieve) return;

//         setLoadingRecieve(true)
//         setToSendCurrency(currency)

//         const initSend = currencies.get(currency);
//         const initRecieve = currencies.get(toRecieveCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(toSendAmount, initSend, initRecieve);

//         setToRecieveAmount(calculated);
//         setLoadingRecieve(false)
//     }
//     const onRecieveAmountChanged = async (amount: number) => {
//         if (loadingSend) return;

//         setLoadingSend(true)

//         const initSend = currencies.get(toRecieveCurrency);
//         const initRecieve = currencies.get(toSendCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(amount, initSend, initRecieve);

//         setToSendAmount(calculated);
//         setToRecieveAmount(amount)
//         setLoadingSend(false)
//     }
//     const onRecieveCurrencyChanged = async (currency: string) => {
//         if (loadingSend) return;

//         setLoadingSend(true)

//         const initSend = currencies.get(currency);
//         const initRecieve = currencies.get(toSendCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(toRecieveAmount, initSend, initRecieve);

//         setToSendAmount(calculated);
//         setToRecieveCurrency(currency)
//         setLoadingSend(false)
//     }

//     const swapCoins = async () => {
//         if (loadingRecieve) return;

//         setLoadingRecieve(true)
//         setIsSwapping(true);

//         const initSend = currencies.get(toRecieveCurrency);
//         const initRecieve = currencies.get(toSendCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(toRecieveAmount, initSend, initRecieve);

//         setToSendAmount(toRecieveAmount);
//         setToSendCurrency(toRecieveCurrency)

//         setToRecieveCurrency(toSendCurrency)
//         setToRecieveAmount(calculated)

//         setIsSwapping(false);
//         setLoadingRecieve(false)
//     }

//     return (
//         <div className="flex justify-center mt-12">
//             <div
//                 className={`${style.swap__container} ${style['swap__container--glow']} card-neon max-w-[500px]`}>
//                 <h2 className='mt-0 mb-12 text-center'>Crypto Exchange</h2>

//                 {loading && (
//                     <div className={style.swap__container + " max-w-[500px]"}>
//                         <Skeleton width="430px" height="45px"></Skeleton>
//                     </div>
//                 )}

//                 <CurrencyForm currencies={currencies}
//                     className={loading ? "invisible h-0" : ""}
//                     amount={toSendAmount}
//                     currency={toSendCurrency}
//                     inputLabel="Send"
//                     inputLoading={loadingSend}
//                     amountChanged={onSendAmountChanged}
//                     currencyChanged={onSendCurrencyChanged} />


//                 <div className='flex justify-end mt-4 mb-4 w-full flex-1 '>
//                     {loading && (
//                         <Skeleton width="30px" height="30px"></Skeleton>
//                     )}
//                     {!loading && <div className={style.swap__button}
//                         onClick={swapCoins}>
//                         <i className={
//                             `pi pi-sort-alt glowing-icon ${isSwapping ? "animate" : "idle"}`
//                         } />
//                     </div>}
//                 </div>

//                 <CurrencyForm currencies={currencies}
//                     className={loading ? "invisible  h-0" : ""}
//                     amount={toRecieveAmount}
//                     currency={toRecieveCurrency}
//                     inputLabel="Recieve"
//                     inputLoading={loadingRecieve}
//                     amountChanged={onRecieveAmountChanged}
//                     currencyChanged={onRecieveCurrencyChanged} />

//                 {loading && (
//                     <div className={style.swap__container + " max-w-[500px]"}>
//                         <Skeleton width="430px" height="45px"></Skeleton>
//                     </div>
//                 )}

//             </div>
//         </div >
//     );
// }

// export default Swap;
