'use client';

import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea, ScrollBar } from './scroll-area';
import { cn } from '@/shared/lib/utils';

interface DateTimePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
  className?: string;
  hourStep?: number;
  minuteStep?: number;
}

function DateTimePicker({
  value,
  onChange,
  placeholder = 'Chọn ngày và giờ',
  disabled,
  className,
  hourStep = 1,
  minuteStep = 5,
}: DateTimePickerProps) {
  const currentHour = value?.getHours() ?? 9;
  const currentMinute = value?.getMinutes() ?? 0;

  const formatDisplayText = () => {
    if (!value) return placeholder;

    const dateStr = value.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });

    const timeStr = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    return `${dateStr} - ${timeStr}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null);
      return;
    }

    // Preserve time when selecting a new date
    const newDate = new Date(date);
    newDate.setHours(currentHour, currentMinute, 0, 0);
    onChange(newDate);
  };

  const handleTimeChange = (type: 'hour' | 'minute', newValue: number) => {
    const baseDate = value || new Date();
    const newDate = new Date(baseDate);

    if (type === 'hour') {
      newDate.setHours(newValue);
    } else {
      newDate.setMinutes(newValue);
    }

    onChange(newDate);
  };

  const hours = Array.from(
    { length: Math.ceil(24 / hourStep) },
    (_, i) => i * hourStep
  );

  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          {formatDisplayText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value || undefined}
            onSelect={handleDateSelect}
            disabled={disabled}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            {/* Hours */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={currentHour === hour ? 'default' : 'ghost'}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange('hour', hour)}
                  >
                    {hour.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            {/* Minutes */}
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={currentMinute === minute ? 'default' : 'ghost'}
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange('minute', minute)}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { DateTimePicker, type DateTimePickerProps };
