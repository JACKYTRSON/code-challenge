import { TokenPicker } from "./token-picker";
import { AmountInput } from "./amount-input";
import type { Token } from "../types";

type TokenInputProps = {
  placeholder: string;
  tokens: Token[];
  amount: number;
  onAmountChange: (amount: number) => void;
  token?: Token;
  onTokenChange: (token: Token) => void;
};

export function TokenInput({ placeholder, tokens, amount, onAmountChange, token, onTokenChange }: TokenInputProps) {
  return (
    <div className="relative w-60">
      <AmountInput className="pr-28" placeholder={placeholder} value={amount} onChange={onAmountChange} />
      <div className="absolute inset-y-0 right-0 w-28">
        <TokenPicker tokens={tokens} defaultValue={token} onChange={onTokenChange} />
      </div>
    </div>
  );
}
