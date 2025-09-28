'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@/lib/utils'

interface ToggleGroupProps {
  value: string
  onValueChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  ariaLabel?: string
}

export function ToggleGroup({ value, onValueChange, options, ariaLabel }: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      onValueChange={(newValue) => {
        if (newValue) onValueChange(newValue)
      }}
      aria-label={ariaLabel}
      className="flex items-center"
    >
      {options.map((option) => (
        <ToggleGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            'text-xs font-medium rounded-sm size-6 cursor-pointer',
            'opacity-50 hover:opacity-100 transition-all duration-150',
            'data-[state=on]:bg-stone-100 data-[state=on]:opacity-100',
            'focus:outline-none focus-visible:ring-1 focus-visible:ring-black/30'
          )}
        >
          {option.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
