import React, { useState } from "react";
import ExchangeDisplay from "./exchangeDisplay";
import InputCurrency from "./inputCurrency";

export default function CurrencyExchangeApp() {
  const [currencyInput, setCurrencyInput] = useState();
  const [currencyFrom, setCurrencyFrom] = useState();
  const [currencyTo, setCurrencyTo] = useState();
  const [convertRes, setConvertRes] = useState();

  return (
    <div>
      <div className="strip"></div>

      <header>
        <h1 className="text-light fw-bold">Currency Converter</h1>
      </header>

      <main>
        <div className="container text-center p-3">
          <InputCurrency
            setCurrencyInput={setCurrencyInput}
            setCurrencyFrom={setCurrencyFrom}
            setCurrencyTo={setCurrencyTo}
            setConvertRes={setConvertRes}
          />
          <ExchangeDisplay
            currencyInput={currencyInput}
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            convertRes={convertRes}
          />
        </div>
      </main>

      <footer>
        <div>&copy; 2022 Amit Hagbi</div>
      </footer>
    </div>
  );
}
