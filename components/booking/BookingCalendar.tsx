"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
  const currentDate = new Date();
  const bookings = useProperty((state) => state.bookings);
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const blockedPeriods = generateBlockedPeriods({ bookings, today: currentDate});
  const { toast } = useToast();
  const unavalibleDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDabledDateIncluded = selectedRange.some((date) => {
      if (unavalibleDates[date]) {
        setRange(defaultSelected);
        toast({
          description: "Some dates are booked. Please select again.",
        })
        return true;
      }
      return false
    })
    useProperty.setState({ range });
  }, [range]);
  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      // add disabled
      disabled={blockedPeriods}
    />
  );
}

export default BookingCalendar;
