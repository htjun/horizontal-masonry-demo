'use client'

import * as SelectPrimitive from '@radix-ui/react-select'

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
  ariaLabel?: string
  triggerPrefix?: string
}

export function Select({
  value,
  onValueChange,
  options,
  placeholder,
  ariaLabel,
  triggerPrefix,
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger aria-label={ariaLabel}>
        <button
          type="button"
          className="cursor-pointer hover:bg-stone-100 px-3 py-2 rounded-md transition-colors duration-150"
        >
          {triggerPrefix && `${triggerPrefix} `}
          <SelectPrimitive.Value placeholder={placeholder} />
        </button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={5}
          className="bg-white rounded-md shadow-md min-w-[100px]"
        >
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item key={option.value} value={option.value}>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
