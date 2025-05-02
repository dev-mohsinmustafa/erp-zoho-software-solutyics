"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const MultiSelectInput = ({ label, name, register, errors, className, options = [], defaultValue = [] }) => {
  const [open, setOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState(defaultValue)
  const { onChange, ...rest } = register(name)

  React.useEffect(() => {
    onChange(selectedValues.map(option => option.id))
  }, [selectedValues, onChange])

  const toggleOption = (option) => {
    setSelectedValues(current => {
      const isSelected = current.find(item => item.id === option.id)
      if (isSelected) {
        return current.filter(item => item.id !== option.id)
      } else {
        return [...current, option]
      }
    })
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white hover:bg-gray-50 border-gray-300"
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} selected`
              : "Select suppliers..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 bg-white border border-gray-200 shadow-lg">
          <Command className="rounded-lg">
            <CommandInput placeholder="Search suppliers..." className="border-b border-gray-200" />
            <CommandEmpty className="text-gray-500 p-2">No supplier found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  onSelect={() => toggleOption(option)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.find(item => item.id === option.id) 
                        ? "opacity-100 text-emerald-600"
                        : "opacity-0"
                    )}
                  />
                  {option.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedValues.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <span
              key={value.id}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
            >
              {value.title}
              <button
                type="button"
                onClick={() => toggleOption(value)}
                className="ml-2 inline-flex text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-full p-0.5 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      {errors[name] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[name].message}
        </p>
      )}
    </div>
  )
}

export default MultiSelectInput