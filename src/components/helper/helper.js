export const  formatNumber=(value, isRound) =>{
    if (value >= 1000) {
      // return (value / 1000).toFixed(1) + "k";
      return isRound ? Math.round(value / 1000) + "k" : (value / 1000).toFixed(1) + "k";
    } else {
      return isRound ? Math.round(value) : value
      // return value
    }
  }
  