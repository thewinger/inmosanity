'use client'
import { cn } from '@/lib/utils'
import * as Slider from '@radix-ui/react-slider'

interface RangeSliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  className?: string
  showValue?: boolean
}

const RangeSlider = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  orientation = 'horizontal',
  className,
  showValue = true,
}: RangeSliderProps) => {
  const isVertical = orientation === 'vertical'

  return (
    <Slider.Root
      className={cn(
        'relative flex touch-none select-none',
        isVertical ? 'h-full w-5 flex-col' : 'h-5 w-full',
        className
      )}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
    >
      <Slider.Track
        className={cn(
          'relative grow rounded-full bg-zinc-200',
          isVertical ? 'w-1' : 'h-1'
        )}
      >
        <Slider.Range className="absolute rounded-full bg-green-500" />
      </Slider.Track>
      {value.map((val, i) => (
        <Slider.Thumb
          key={i}
          className="flex aspect-square h-full w-full cursor-grab items-center justify-center rounded-full bg-green-500 text-xs text-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        >
          {showValue && val}
        </Slider.Thumb>
      ))}
    </Slider.Root>
  )
}

export default RangeSlider
