import React, { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rates, setRates] = useState({});
  const [result, setResult] = useState(null);

  // Fetch exchange rates
  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error(err));
  }, [fromCurrency]);

  // Convert currency
  useEffect(() => {
    if (rates[toCurrency]) {
      setResult((amount * rates[toCurrency]).toFixed(2));
    }
  }, [amount, toCurrency, rates]);

  return (
    <div style={styles.container} >
      <h2>💱 Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={styles.input}
      />

      <div style={styles.row}>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>

        <span>➡</span>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>
      </div>

      {result && (
        <h3>
          {amount} {fromCurrency} = {result} {toCurrency}
        </h3>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "350px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    background: "#f4f4f4",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
};  
