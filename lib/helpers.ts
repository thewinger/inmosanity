import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FilterString } from './interfaces'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEUR(amount: string) {
  const amountInt = Number(amount)
  const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
  })

  return currencyFormatter.format(amountInt)
}

export function formatOperacionDD(arr: string[]) {
  let name = ''
  const array: FilterString[] = []
  arr.map((item: string) => {
    if (item == 'en-alquiler') {
      name = 'Alquilar'
    } else if (item == 'en-venta') {
      name = 'Comprar'
    } else if (item == 'obra-nueva') {
      name = 'Obra nueva'
    }

    array.push({ name: name, value: item })
  })

  return array
}

export function getAsAString(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

export function stringToArray(
  value: string | string[] | undefined
): number[] | undefined {
  if (value && Array.isArray(value)) {
    return value[0].split('_').map(Number).slice(0, 2).sort()
  }
  if (value && value.includes('_')) {
    return value.split('_').map(Number).slice(0, 2).sort()
  }

  return undefined
}

export function arrayToString(arr: number[]): string {
  return arr.sort().join('_')
}
