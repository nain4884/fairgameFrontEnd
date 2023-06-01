export const  formatNumber=(value, isRound) =>{
    if (value >= 1000) {
      // return (value / 1000).toFixed(1) + "k";
      return isRound ? Math.round(value / 1000) + "k" : (value / 1000).toFixed(1) + "k";
    } else {
      return isRound ? Math.round(value) : value
      // return value
    }
  }
  

  export const currencyFormatter = (amount) => {
    if (amount >= 10000000) {
      return (amount / 10000000) + ' cr';
    } else if (amount >= 100000) {
      return (amount / 100000) + ' lac';
    } else if (amount >= 1000) {
      return (amount / 1000) + ' k';
    } else {
      return amount;
    }
  };