import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import currencyTypes from "../types/currencyTypes";
import "../styles/CurrencyConverter.css";

const CurrencyConverter = ({ handleSelectCurrency }) => {
  return (
    <FormControl className="currency-converter-container">
      <InputLabel id="demo-simple-select-label">currency</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        required={true}
        onChange={handleSelectCurrency}
      >
        {currencyTypes.map((type, index) => (
          <MenuItem key={type.id} value={index}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencyConverter;
