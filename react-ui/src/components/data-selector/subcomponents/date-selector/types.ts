import { MouseEventHandler } from "react"

export interface SelectorProps {
  action: MouseEventHandler<HTMLLIElement>,
  selected: number
}
