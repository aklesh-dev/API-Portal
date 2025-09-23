import React from "react";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BSDatePickerProps {
  value?: string; // YYYY-MM-DD
  onChange?: (val: string) => void;
  // label?: string;
  placeholder?: string;
  className?: string;
}

const months = [
  "Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
];

const monthDays: Record<number, number> = {
  1: 31, 2: 32, 3: 31, 4: 32, 5: 31, 6: 30,
  7: 30, 8: 29, 9: 29, 10: 30, 11: 29, 12: 30,
};

const years = Array.from({ length: 101 }, (_, i) => 2000 + i);

export const BSDatePicker: React.FC<BSDatePickerProps> = ({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState(value || "");

  React.useEffect(() => {
    if (value) setInput(value);
  }, [value]);

  const parseValue = (val: string) => {
    const [y, m, d] = val.split("-").map(Number);
    return { y, m, d };
  };

  const { y, m, d } = value ? parseValue(value) : { y: undefined, m: undefined, d: undefined };

  const handleSelect = (yy: number, mm: number, dd: number) => {
    const formatted = `${yy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(2, "0")}`;
    setInput(formatted);
    onChange?.(formatted);
    setOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      onChange?.(val);
    } else {
      onChange?.("");
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>

      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={handleInput}
          placeholder={placeholder}
          className="rounded-md h-[2.5rem]"
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[3rem] h-[2.5rem] p-0"
            >
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-4">
            <div className="flex gap-2 mb-3">
              <select
                className="border rounded px-2 py-1 flex-1"
                value={y || ""}
                onChange={(e) =>
                  handleSelect(Number(e.target.value), m || 1, d || 1)
                }
              >
                <option value="">Year</option>
                {years.map((yy) => (
                  <option key={yy} value={yy}>
                    {yy}
                  </option>
                ))}
              </select>

              <select
                className="border rounded px-2 py-1 flex-1"
                value={m || ""}
                onChange={(e) =>
                  handleSelect(y || years[0], Number(e.target.value), d || 1)
                }
              >
                <option value="">Month</option>
                {months.map((mm, i) => (
                  <option key={mm} value={i + 1}>
                    {mm}
                  </option>
                ))}
              </select>
            </div>

            {/* Calendar Grid */}
            {y && m ? (
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {Array.from({ length: monthDays[m] }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    className={cn(
                      "w-8 h-8 rounded hover:bg-primary hover:text-white",
                      d === day && "bg-primary text-white"
                    )}
                    onClick={() => handleSelect(y, m, day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select year & month</p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
