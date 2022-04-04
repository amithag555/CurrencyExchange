import React, { useEffect, useState } from "react";
import { MdDragHandle } from "react-icons/md";

export default function ExchangeDisplay(props) {
  const { currencyInput, currencyFrom, currencyTo, convertRes } = props;
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  setInterval(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div className="mt-5 col-md-9 mx-auto shadow rounded bg-light p-2 pt-4">
      <div className="row p-0 mx-auto align-items-end">
        <div className="col-md-5 text-md-end pt-1">
          <h3>
            {currencyInput} {currencyFrom}
          </h3>
        </div>

        <div className="col-md-2">
          <MdDragHandle icon="fa-solid fa-arrow-right-arrow-left" style={{ fontSize: "45px" }} />
        </div>

        <div className="col-md-5 text-md-start pt-1">
          <h3>
            {convertRes} {currencyTo}
          </h3>
        </div>
      </div>

      <div className="col-12 row m-0 mt-2 mt-md-3 justify-content-end">
        <div className="col-md-6 text-md-end">
          {new Date().toLocaleDateString()}, {currentTime}
        </div>
      </div>
    </div>
  );
}
