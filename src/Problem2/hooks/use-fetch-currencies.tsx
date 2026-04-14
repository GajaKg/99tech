import { useEffect, useState } from "react";
import type { Currency } from "../types/crypto.types";

function useFetchCurrencies() {
    const [currencies, setCucrrencies] = useState<Map<string, Currency>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)

                // simulate request
                const promise = new Promise((resolve) => {
                    setTimeout(async () => {
                        resolve(true);
                    }, 600)
                })
                await promise;

                const response = await fetch("https://interview.switcheo.com/prices.json");
                const result: Currency[] = await response.json();


                /**
                 * filter unique currencies by latest date
                 */
                const filteredCurrencies = new Map<string, Currency>();
                result.forEach((bloackchain) => {
                    // if duplicated currency save one with latest date
                    if (filteredCurrencies.has(bloackchain.currency)) {
                        const reMaped = filteredCurrencies.get(bloackchain.currency);

                        const curencyDate = new Date(bloackchain.date);
                        const existingCurencyDate = new Date(reMaped!.date);

                        if (curencyDate > existingCurencyDate) {
                            filteredCurrencies.set(bloackchain.currency, bloackchain)
                        }
                    } else {
                        filteredCurrencies.set(bloackchain.currency, bloackchain)
                    }
                })

                console.log(filteredCurrencies)
                setCucrrencies(filteredCurrencies);
            } catch (e) {
                setIsLoading(false)
                setError("Something went wrong, please try later.");
                console.error(e);
            } finally {
                setIsLoading(false)
            }

        })()
    }, [])

    return {
        currencies,
        isLoading,
        error
    }
}


export default useFetchCurrencies;