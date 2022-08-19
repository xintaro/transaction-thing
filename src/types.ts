import { SpringValue } from '@react-spring/web'

export interface Item {
  id: string,
  type: 'transaction' | 'section'
  title: string
  section?: string
  category?: string
  amount?: string
}

export interface Transaction extends Item {
  id: string,
  type: 'transaction'
  section: string
  category: string
  amount: string
}

export interface Section extends Item {
  type: 'section'
}

export type Collection = Item[]

export type SectionTypes = 'pay' | 'scheduled' | 'failed' | 'completed'

export type Range = {
  min: number
  max: number
}

export interface SpringProps {
  zIndex: SpringValue<number>
  shadow: SpringValue<number>
  y: SpringValue<number>
  scale: SpringValue<number>
}