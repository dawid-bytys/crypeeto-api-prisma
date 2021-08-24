export const getAbbreviation = (currency: string) => {
  switch (currency) {
    case "Bitcoin":
      return "BTC";
    case "Ethereum":
      return "ETH";
    case "Tether":
      return "USDT";
    case "Uniswap":
      return "UNI";
    case "Litecoin":
      return "LTC";
    case "Stellar":
      return "XLM";
    case "Ripple":
      return "XRP";
    default:
      return "not found";
  }
};
