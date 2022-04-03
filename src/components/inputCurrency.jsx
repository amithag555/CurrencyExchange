import React, { useEffect, useRef, useState } from "react";
import { RiArrowLeftRightLine } from "react-icons/ri";

export default function InputCurrency(props) {
  const { setCurrencyInput, setCurrencyFrom, setCurrencyTo, setConvertRes } = props;
  const [currencyArr, setCurrencyArr] = useState([]);

  let currencyInputRef = useRef();
  let selectFromRef = useRef();
  let selectToRef = useRef();

  useEffect(() => {
    getExchangeRateList();
  }, []);

  const getExchangeRateList = async () => {
    let url = "https://api.currencyapi.com/v2/latest?apikey=hWheEyidvSXRsFYc4LgcRUvPT2aiGKj31IQSl94k";

    let reqResult = await fetch(url);
    let data = await reqResult.json();

    let tempArr = [];

    for (const key in data.data) {
      tempArr.push({ currency: key, exchangeRate: data.data[key] });
    }

    setCurrencyArr(tempArr);
    defineDefaultValue(tempArr);
  };

  const defineDefaultValue = (currencyArr) => {
    let convertRes = ((100 / currencyArr[0].exchangeRate) * currencyArr[1].exchangeRate).toFixed(2);

    setCurrencyInput(100);
    setCurrencyFrom(currencyArr[0].currency);
    setCurrencyTo(currencyArr[1].currency);
    setConvertRes(convertRes);
  };

  const onChangeConvert = () => {
    let currencyFromItem = currencyArr.find((item) => item.exchangeRate == selectFromRef.current.value);
    let currencyToItem = currencyArr.find((item) => item.exchangeRate == selectToRef.current.value);

    let convertRes = (
      (currencyInputRef.current.value / selectFromRef.current.value) *
      selectToRef.current.value
    ).toFixed(2);

    setCurrencyInput((currencyInputRef.current.value * 1).toLocaleString());
    setCurrencyFrom(currencyFromItem.currency);
    setCurrencyTo(currencyToItem.currency);
    setConvertRes((convertRes * 1).toLocaleString());
  };

  const onClickSwap = () => {
    let tempCurrency = selectFromRef.current.value;
    selectFromRef.current.value = selectToRef.current.value;
    selectToRef.current.value = tempCurrency;

    onChangeConvert();
  };

  return (
    <div className="mt-5 shadow p-3 rounded bg-light">
      <h5>How much money would you like to convert?</h5>

      <input
        ref={currencyInputRef}
        type="number"
        onInput={onChangeConvert}
        className="form-control text-center w-25 mx-auto my-4"
        defaultValue={100}
      />

      <div className="row p-0 pb-3 mx-auto justify-content-between align-items-end">
        <div className="col-md-5">
          <label className="w-100 text-start fw-bold mb-1">From</label>

          <select ref={selectFromRef} className="form-control text-center" onChange={onChangeConvert}>
            {currencyArr.map((item, i) => {
              if (i === 0) {
                return (
                  <option selected key={item.currency} value={item.exchangeRate}>
                    {item.currency}
                  </option>
                );
              } else {
                return (
                  <option key={item.currency} value={item.exchangeRate}>
                    {item.currency}
                  </option>
                );
              }
            })}
          </select>
        </div>

        <div className="col-md-1 pt-4 p-md-1" onClick={onClickSwap}>
          <RiArrowLeftRightLine icon="fa-solid fa-arrow-right-arrow-left" className="fs-2" />
        </div>

        <div className="col-md-5">
          <label className="w-100 text-start fw-bold mb-1">To</label>

          <select ref={selectToRef} className="form-control text-center" onChange={onChangeConvert}>
            {currencyArr.map((item, i) => {
              if (i === 1) {
                return (
                  <option selected key={item.currency} value={item.exchangeRate}>
                    {item.currency}
                  </option>
                );
              } else {
                return (
                  <option key={item.currency} value={item.exchangeRate}>
                    {item.currency}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
