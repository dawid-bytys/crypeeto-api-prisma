export type CurrencyLiteral =
  | "Bitcoin"
  | "Ethereum"
  | "Ripple"
  | "Stellar"
  | "Tether"
  | "Uniswap"
  | "Litecoin";

export type CurrencyLiteralType = CurrencyLiteral extends string
  ? string
  : never;
