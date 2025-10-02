import { TokenInput } from "@/components/swap-form/token-input";
import type { Token } from "@/components/swap-form/types";
import { Button } from "@/components/ui/button";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { toast } from "sonner";

const ICON_BASE = "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens";
const TOKEN_PRICE_URL = "https://interview.switcheo.com/prices.json";

export const SwapForm: React.FC = () => {
  const [amountFrom, setAmountFrom] = useState(0);
  const [tokenFrom, setTokenFrom] = useState<Token>();
  const [amountTo, setAmountTo] = useState(0);
  const [tokenTo, setTokenTo] = useState<Token>();
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    fetch(TOKEN_PRICE_URL)
      .then((res) => res.json())
      .then((data) => {
        const tokensWithIcon = data.map((token: Token) => ({
          ...token,
          iconUrl: `${ICON_BASE}/${token.currency}.svg`,
        }));
        setTokens(tokensWithIcon);
      })
      .catch(() => {
        setTokens([]);
        toast.error("Failed to load tokens. Please try again later.");
      });
  }, []);

  const handleInputChange = (
    amount: number,
    fromToken: Token | undefined,
    toToken: Token | undefined,
    setter: Dispatch<SetStateAction<number>>
  ) => {
    if (!fromToken?.price || !toToken?.price) {
      return;
    }

    const converted = (amount * fromToken.price) / toToken.price;
    setter(converted);
  };

  const handleClick = () => {
    toast.success("Swapped");
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-6">Token Swap</h2>
      <div className="flex gap-x-4">
        <TokenInput
          placeholder="Amount to send"
          tokens={tokens}
          amount={amountFrom}
          onAmountChange={(n) => {
            setAmountFrom(n);
            handleInputChange(n, tokenFrom, tokenTo, setAmountTo);
          }}
          token={tokenFrom}
          onTokenChange={(n) => {
            setTokenFrom(n);
            handleInputChange(amountFrom, n, tokenTo, setAmountTo);
          }}
        />
        <TokenInput
          placeholder="Amount to receive"
          tokens={tokens}
          amount={amountTo}
          onAmountChange={(n) => {
            setAmountTo(n);
            handleInputChange(n, tokenTo, tokenFrom, setAmountFrom);
          }}
          token={tokenTo}
          onTokenChange={(n) => {
            setTokenTo(n);
            handleInputChange(amountTo, n, tokenFrom, setAmountFrom);
          }}
        />
        <Button
          variant="destructive"
          disabled={!amountFrom || !amountTo || !tokenFrom || !tokenTo}
          onClick={handleClick}
        >
          Confirm Swap
        </Button>
      </div>
    </div>
  );
};

export default SwapForm;
