import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { FilterString } from './interfaces'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEUR(amount: number) {
  const currencyFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return currencyFormatter.format(amount)
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

export function stringToArray(value: string): number[] {
  let newValue = [0, 1000000]
  if (Array.isArray(value)) {
    newValue = value[0].split('_').map(Number).slice(0, 2).sort()
  }
  if (value.includes('_')) {
    newValue = value.split('_').map(Number).slice(0, 2).sort()
  }

  return newValue
}

export function arrayToString(arr: number[]): string {
  return arr.sort().join('_')
}

export function createNumArray(maxNum: number, step: number) {
  const arr: number[] = []
  for (let i = 0; i <= maxNum; i += step) {
    arr.push(i)
  }
  return arr
}

export function getRoundedZeros(value: number) {
  let roundto = '1'

  for (let i = 1; i < value.toString().length; i++) {
    roundto = roundto.concat('0')
  }

  let roundedto = parseInt(roundto)

  return Math.ceil(value / roundedto) * roundedto
}
