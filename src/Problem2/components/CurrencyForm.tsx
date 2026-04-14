import { useEffect, useMemo, useState } from 'react';

import style from './CurencyForm.module.css';
import type { Currency } from '../types/crypto.types';

import { FloatLabel } from 'primereact/floatlabel';
import type { Nullable } from 'primereact/ts-helpers';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumber, type InputNumberChangeEvent } from 'primereact/inputnumber';

interface Props {
    currencies: Map<string, Currency>,
    amount: number,
    currency: string,
    amountChanged: (amount: number) => void,
    currencyChanged: (currency: string) => void
    className?: string,
    inputLabel: string,
    inputLoading?: boolean,
}

const validateAmount = (val: number | null | undefined): string => {
    if (val == null) return "Amount must be entered";
    if (val <= 0) return "Amount must be larger than 0";
    return "";
};

function CurrencyForm(
    {
        currencies,
        className,
        amount,
        currency,
        inputLabel,
        inputLoading,
        amountChanged,
        currencyChanged
    }: Props) {

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setErrorMessage(validateAmount(amount));
    }, [amount]);

    // format currencies to match DropDown component
    const currencyOptions = useMemo(() => {
        return Array.from(currencies.values()).map(c => ({
            name: c.currency,
            code: c.currency,
        }));
    }, [currencies]);

    // validate and send amount
    const amountHandler = (val: Nullable<number | null>) => {
        setErrorMessage("")

        const hasErrorMessage = validateAmount(val);
        if (hasErrorMessage) {
            setErrorMessage(hasErrorMessage);
            return;
        }

        amountChanged(val!);
    }

    // send currency
    const currencyHandler = (val: { code: string, name: string }) => {
        currencyChanged(val.name)

        setErrorMessage(validateAmount(amount));
    }

    // adds icons for selected options
    const itemTemplate = (option: { name: string; code: string }) => {
        return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens/${option.code}.svg`}
                    alt={option.code}
                    style={{ width: 20, height: 20 }}
                />
                <span>{option.code}</span>
            </div>
        );
    };

    // adds icons for list options
    const valueTemplate = (option: { name: string; code: string } | null) => {
        if (!option) return <span>Select currency</span>;

        return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/c884d9c223e70c70efae3ece3dc9eaffba28ca56/tokens/${option.code}.svg`}
                    // src={`/icons/${option.code}.png`}
                    alt={option.code}
                    style={{ width: 20, height: 20 }}
                />
                <span>{option.code}</span>
            </div>
        );
    };
    return (
        <div className={className + " flex flex-col [@media(min-width:600px)]:flex-row"}>
            <div className="flex-grow relative">
                <FloatLabel>
                    <InputNumber id="number-input" value={amount}
                        maxFractionDigits={10}
                        mode='decimal'
                        min={0.0000000001}
                        onChange={(e: InputNumberChangeEvent) => amountHandler(e.value)}
                        className={`${inputLoading ? style['currency-form__input-loading'] : ''} md:w-14rem text-lg h-full p-inputtext-lg`}
                    />
                    <label htmlFor="number-input">{inputLabel}</label>
                </FloatLabel>

                {inputLoading &&
                    <ProgressSpinner style={{ width: '20px', height: '20px' }}
                        className={style['currency-form__input-spinner']}
                        strokeWidth="8"
                        animationDuration="0.5s" />}
                {errorMessage && <div className="error-message absolute">{errorMessage}</div>}
            </div>

            <div className='w-full [@media(min-width:600px)]:w-[200px] shrink-0'>
                <Dropdown value={{ code: currency, name: currency }}
                    onChange={(e: DropdownChangeEvent) => currencyHandler(e.value)}
                    options={currencyOptions}
                    optionLabel="name"
                    itemTemplate={itemTemplate}
                    valueTemplate={valueTemplate}
                    filter
                    className="w-full md:w-14rem p-inputtext-lg" />

            </div>
        </div>
    );
}

export default CurrencyForm;
