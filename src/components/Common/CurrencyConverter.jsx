import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY;
const EXCHANGE_API_URL = 'https://api.exchangerate-api.com/v4/latest/';

function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [currencies, setCurrencies] = useState([
        'USD', 'EUR', 'GBP', 'TRY', 'JPY', 'CNY', 'SAR', 'AED'
    ]);

    useEffect(() => {
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    const fetchExchangeRate = async () => {
        try {
            const response = await axios.get(`${EXCHANGE_API_URL}${fromCurrency}`);
            const rate = response.data.rates[toCurrency];
            setExchangeRate(rate);
            setConvertedAmount((amount * rate).toFixed(2));
        } catch (error) {
            console.error('Döviz kuru alınırken hata:', error);
        }
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        if (exchangeRate) {
            setConvertedAmount((value * exchangeRate).toFixed(2));
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Miktar</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Kaynak Para Birimi</label>
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Hedef Para Birimi</label>
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {currencies.map(currency => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
            </div>

            {convertedAmount && (
                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-lg font-semibold text-center">
                        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                    </p>
                    <p className="text-sm text-gray-500 text-center mt-2">
                        1 {fromCurrency} = {exchangeRate} {toCurrency}
                    </p>
                </div>
            )}
        </div>
    );
}

export default CurrencyConverter;
