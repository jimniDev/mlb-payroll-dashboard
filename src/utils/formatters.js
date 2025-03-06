// src/utils/formatters.js
export const formatMoney = (value) => {
    return `$${Math.round(value).toLocaleString()}`;
};
  
export const formatPayroll = (value) => {
    return `$${value.toFixed(1)}M`;
};