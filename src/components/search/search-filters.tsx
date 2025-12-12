"use client";

import { useState } from "react";
import { Search, Calendar as CalendarIcon, Users, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useSearch } from "./search-context";

interface SearchFiltersProps {
  className?: string;
}

export function SearchFilters({ className }: SearchFiltersProps) {
  const { state, dispatch } = useSearch();
  const { filters } = state;

  const [datePopoverOpen, setDatePopoverOpen] = useState(false);
  const [guestsPopoverOpen, setGuestsPopoverOpen] = useState(false);
  const [selectingCheckIn, setSelectingCheckIn] = useState(true);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_FILTERS", payload: { location: e.target.value } });
  };

  const handleDateSelect = (date: Date | null) => {
    if (selectingCheckIn) {
      dispatch({ type: "SET_FILTERS", payload: { checkIn: date, checkOut: null } });
      setSelectingCheckIn(false);
    } else {
      dispatch({ type: "SET_FILTERS", payload: { checkOut: date } });
      setDatePopoverOpen(false);
      setSelectingCheckIn(true);
    }
  };

  const handleGuestsChange = (delta: number) => {
    const newGuests = Math.max(1, Math.min(16, filters.guests + delta));
    dispatch({ type: "SET_FILTERS", payload: { guests: newGuests } });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const dateLabel = filters.checkIn || filters.checkOut
    ? `${formatDate(filters.checkIn) || "Check-in"} - ${formatDate(filters.checkOut) || "Check-out"}`
    : "Add dates";

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {/* Location search */}
      <div className="relative flex-1 min-w-[200px] max-w-[340px]">
        <Input
          type="text"
          placeholder="Where to?"
          value={filters.location}
          onChange={handleLocationChange}
          className="pl-4 pr-14 h-10 rounded-full border-gray-200"
        />
        <Button
          variant="default"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full shadow-sm"
        >
          <Search className="size-4" />
        </Button>
      </div>

      {/* Date picker */}
      <Popover open={datePopoverOpen} onOpenChange={setDatePopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-10 px-4 rounded-full gap-2 font-normal",
              (filters.checkIn || filters.checkOut) && "text-gray-900"
            )}
          >
            <CalendarIcon className="size-4" />
            <span className="hidden sm:inline">{dateLabel}</span>
            <span className="sm:hidden">Dates</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {selectingCheckIn ? "Select check-in date" : "Select check-out date"}
              </span>
              {(filters.checkIn || filters.checkOut) && (
                <button
                  className="text-gray-500 hover:text-gray-900 underline"
                  onClick={() => {
                    dispatch({ type: "SET_FILTERS", payload: { checkIn: null, checkOut: null } });
                    setSelectingCheckIn(true);
                  }}
                >
                  Clear
                </button>
              )}
            </div>
            <Calendar
              selected={selectingCheckIn ? filters.checkIn : filters.checkOut}
              onSelect={handleDateSelect}
              minDate={selectingCheckIn ? new Date() : filters.checkIn || new Date()}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Guests selector */}
      <Popover open={guestsPopoverOpen} onOpenChange={setGuestsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-10 px-4 rounded-full gap-2 font-normal"
          >
            <Users className="size-4" />
            <span className="hidden sm:inline">
              {filters.guests} {filters.guests === 1 ? "guest" : "guests"}
            </span>
            <span className="sm:hidden">{filters.guests}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Guests</p>
                <p className="text-sm text-gray-500">Ages 13 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => handleGuestsChange(-1)}
                  disabled={filters.guests <= 1}
                  className="rounded-full"
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-6 text-center font-medium">{filters.guests}</span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => handleGuestsChange(1)}
                  disabled={filters.guests >= 16}
                  className="rounded-full"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  );
}
