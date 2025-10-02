import type { Token } from "../types";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

type TokenPickerProps = {
  placeholder?: string;
  tokens: Token[];
  defaultValue?: Token;
  onChange: (token: Token) => void;
};

export function TokenPicker({ tokens, defaultValue, onChange, placeholder = "Select Token" }: TokenPickerProps) {
  const [open, setOpen] = useState(false);
  const selected = tokens.find((t) => t.currency === defaultValue?.currency);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="h-full w-full rounded-l-none justify-start">
          {selected ? (
            <div className="flex items-center gap-2">
              <img
                src={selected.iconUrl ?? `/icons/${selected.currency}.svg`}
                alt={selected.currency}
                className="w-5 h-5"
              />
              <span>{selected.currency}</span>
            </div>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search token..." />
          <CommandList>
            <CommandGroup>
              {tokens.map((t) => (
                <CommandItem
                  key={t.currency}
                  value={t.currency}
                  onSelect={() => {
                    onChange(t);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <img src={t.iconUrl ?? `/icons/${t.currency}.svg`} alt={t.currency} className="w-5 h-5" />
                  <span>{t.currency}</span>
                  {t.price !== undefined && (
                    <span className="ml-auto text-xs text-muted-foreground">${t.price.toFixed(2)}</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
