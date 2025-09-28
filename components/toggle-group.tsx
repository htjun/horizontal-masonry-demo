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
      onValueChange={onValueChange}
      aria-label={ariaLabel}
      className="flex gap-0.5 items-center"
    >
      {options.map((option) => (
        <ToggleGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            'px-2 py-0.5 text-xs font-medium transition-colors',
            'hover:text-black data-[state=on]:text-black',
            'data-[state=off]:text-black/50',
            'focus:outline-none focus-visible:ring-1 focus-visible:ring-black/30',
            'rounded-xs'
          )}
        >
          {option.label}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}
