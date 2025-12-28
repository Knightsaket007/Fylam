import React from 'react'
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from '@/components/ui/input'


type propsType = React.ComponentProps<"input"> & {
  f: Field
  update: (id: string, key: keyof Field, value: string) => void
}



const InputFiledVariation = ({f, update, ...props }:propsType) => {

  const [date, setDate] = React.useState<Date>()

  if (f.type === "date") {

    return (
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={(d) => {
              setDate(d)             
              update?.(f.id, "value", d ? format(d, "yyyy-MM-dd") : "") 
            }} />
          </PopoverContent>
        </Popover>
      </>
    )
  }

  if (f.type === "text" || f.type === "number" || f.type === "email") {
    return <Input type={f.type} placeholder={f.label} {...props} />
  }
}

export default InputFiledVariation