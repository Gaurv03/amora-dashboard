"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

type MultiSelectProps = {
    list: { value: string; label: string }[]
    defaultValues?: string[]
    onChange?: (values: string[]) => void
}

export function MultiSelect({ list, defaultValues = [], onChange }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValues)

    const toggleOption = (value: string) => {
        setSelectedValues((prev) => {
            const newValues = prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value]

            // notify parent
            onChange?.(newValues)

            return newValues
        })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedValues.length > 0
                        ? list
                            .filter((f) => selectedValues.includes(f.value))
                            .map((f) => f.label)
                            .join(", ")
                        : "Select from list..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {list.map((listItem) => (
                                <CommandItem
                                    key={listItem.value}
                                    value={listItem.value}
                                    onSelect={() => toggleOption(listItem.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedValues.includes(listItem.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {listItem.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
