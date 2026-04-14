// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Swap from './Problem2/components/Swap'
import { PrimeReactProvider } from 'primereact/api';
// import 'primereact/resources/themes/lara-dark-purple/theme.css';
import 'primereact/resources/themes/arya-purple/theme.css';
import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-light-blue/theme.css';

function App() {

  return (
    <PrimeReactProvider >
      <div className='main'>
        <Swap />
      </div>
    </PrimeReactProvider>
  )
}

export default App
// import { useCallback, useEffect, useState } from 'react';
// import useFetchCurrencies from '../hooks/useFetchCurrencies';
// import style from './swap.module.css';
// // import type { Currency } from '../types/crypto.types';
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
//     // const coinSend = currencies.get(sendCurrency);
//     // const coinRecieved = currencies.get(recieveCurrency);

//     if (!coinSend || !coinRecieved) return 0;

//     return coinSend.price / coinRecieved.price * amount;
// }


// function Swap() {
//     const { currencies, isLoading } = useFetchCurrencies();
//     const [isSwapping, setIsSwapping] = useState(false);
//     const [toSendAmount, setToSendAmount] = useState<number>(1);
//     const [toSendCurrency, setToSendCurrency] = useState("");
//     const [loadingSend, setLoadingSend] = useState(false);

//     const [toRecieveAmount, setToRecieveAmount] = useState<number>(1);
//     const [toRecieveCurrency, setToRecieveCurrency] = useState("");
//     const [loadingRecieve, setLoadingRecieve] = useState(false);

//     // const calculateAmount = useCallback((amount: number, sendCurrency: string, recieveCurrency: string): number => {
//     //     if (!amount || !sendCurrency || !recieveCurrency) return 0;

//     //     const coinSend = currencies.get(sendCurrency);
//     //     const coinRecieved = currencies.get(recieveCurrency);

//     //     if (!coinSend || !coinRecieved) return 0;

//     //     return coinSend.price / coinRecieved.price * amount;
//     // }, [currencies])

//     useEffect(function setInitValues() {
//         (async () => {
//             if (!currencies.size) return;

//             const initSend = currencies.get("WBTC");
//             const initRecieve = currencies.get("ETH");

//             if (!initSend || !initRecieve) return;

//             const calculated = await calculateAmount(1, initSend, initRecieve);

//             setToSendAmount(1)
//             setToSendCurrency(initSend!.currency)
//             setToRecieveAmount(calculated)
//             setToRecieveCurrency(initRecieve!.currency)
//         })()
//         // }, [currencies, calculateAmount])
//     }, [currencies])

//     const onSendAmountChanged = async (amount: number) => {
//         setLoadingRecieve(true)
//         setToSendAmount(amount)
//         const initSend = currencies.get(toSendCurrency);
//         const initRecieve = currencies.get(toRecieveCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(amount, initSend, initRecieve);

//         setToRecieveAmount(calculated);
//         setLoadingRecieve(false)
//         // setToRecieveAmount(calculateAmount(amount, toSendCurrency, toRecieveCurrency));
//         // setTimeout(() => {
//         // }, 1500)
//     }
//     const onSendCurrencyChanged = async (currency: string) => {
//         setLoadingRecieve(true)
//         setToSendCurrency(currency)

//         const initSend = currencies.get(currency);
//         const initRecieve = currencies.get(toRecieveCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(toSendAmount, initSend, initRecieve);

//         setToRecieveAmount(calculated);
//         // setToRecieveAmount(calculateAmount(toSendAmount!, currency, toRecieveCurrency));
//         // setTimeout(() => {
//         setLoadingRecieve(false)
//         // }, 1500)
//     }
//     const onRecieveAmountChanged = async (amount: number) => {
//         setLoadingSend(true)

//         const initSend = currencies.get(toSendCurrency);
//         const initRecieve = currencies.get(toRecieveCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(amount, initSend, initRecieve);

//         setToSendAmount(calculated);
//         setToRecieveAmount(amount)
//         // setToSendAmount(calculateAmount(amount, toRecieveCurrency, toSendCurrency));
//         // setTimeout(() => {
//         setLoadingSend(false)
//         // }, 1500)
//     }
//     const onRecieveCurrencyChanged = async (currency: string) => {
//         setLoadingSend(true)

//         const initSend = currencies.get(currency);
//         const initRecieve = currencies.get(toSendCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(toRecieveAmount, initSend, initRecieve);

//         setToSendAmount(calculated);
//         setToRecieveCurrency(currency)
//         // setToSendAmount(calculateAmount(toRecieveAmount!, currency, toSendCurrency));
//         // setTimeout(() => {
//         setLoadingSend(false)
//         // }, 1500)
//     }

//     const swapCoins = async () => {
//         setLoadingRecieve(true)
//         setIsSwapping(true);

//         const initSend = currencies.get(toSendCurrency);
//         const initRecieve = currencies.get(toRecieveCurrency);

//         if (!initSend || !initRecieve) return;

//         const calculated = await calculateAmount(toSendAmount, initSend, initRecieve);

//         setToSendAmount(calculated);
//         setToSendCurrency(toRecieveCurrency)
//         // setToSendAmount(calculateAmount(toSendAmount!, toSendCurrency, toRecieveCurrency))

//         setToRecieveCurrency(toSendCurrency)
//         setToRecieveAmount(toSendAmount)

//         // setTimeout(() => {
//             setIsSwapping(false);
//             setLoadingRecieve(false)
//         // }, 600);
//     }

//     return (
//         <div className="flex justify-center mt-12">
//             <div
//                 className={`
//                     ${style.swap__container}
//                     ${style['swap__container--glow']}
//                 card-neon
//                 max-w-[500px]
//             `}>
//                 <h2 className='mt-0 mb-12 text-center'>Crypto Exchange</h2>

//                 {isLoading && (
//                     <div className={style.swap__container + " max-w-[500px]"}>
//                         <Skeleton width="430px" height="45px"></Skeleton>
//                     </div>
//                 )}

//                 <CurrencyForm currencies={currencies}
//                     className={isLoading ? "invisible h-0" : ""}
//                     amount={toSendAmount}
//                     currency={toSendCurrency}
//                     inputLabel="Send"
//                     inputLoading={loadingSend}
//                     amountChanged={onSendAmountChanged}
//                     currencyChanged={onSendCurrencyChanged} />


//                 <div className='flex justify-end mt-4 mb-4 w-full flex-1 '>
//                     {isLoading && (
//                         <Skeleton width="30px" height="30px"></Skeleton>
//                     )}
//                     {!isLoading && <div className={style.swap__button}
//                         onClick={swapCoins}>
//                         <i className={
//                             `pi pi-sort-alt glowing-icon} ${isSwapping ? "animate" : "idle"}`
//                         } />
//                     </div>}
//                 </div>


//                 <CurrencyForm currencies={currencies}
//                     className={isLoading ? "invisible  h-0" : ""}
//                     amount={toRecieveAmount}
//                     currency={toRecieveCurrency}
//                     inputLabel="Recieve"
//                     inputLoading={loadingRecieve}
//                     amountChanged={onRecieveAmountChanged}
//                     currencyChanged={onRecieveCurrencyChanged} />

//                 {isLoading && (
//                     <div className={style.swap__container + " max-w-[500px]"}>
//                         <Skeleton width="430px" height="45px"></Skeleton>
//                     </div>
//                 )}

//                 {/* {!isLoading && <CurrencyForm currencies={currencies}
//                     amount={toRecieveAmount}
//                     currency={toRecieveCurrency}
//                     inputLabel="Recieve"
//                     inputLoading={loadingRecieve}
//                     amountChanged={onRecieveAmountChanged}
//                     currencyChanged={onRecieveCurrencyChanged} />} */}
//             </div>
//         </div >
//     );
// }

// export default Swap;
