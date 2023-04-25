// components/RangeSlider.tsx
import { cn } from '@/lib/helpers'
import ReactSlider, { ReactSliderProps } from 'react-slider'

const RangeSlider = <T extends number | readonly number[]>(
  _props: ReactSliderProps<T>
) => {
  const isVertical = _props.orientation === 'vertical'
  return (
    <ReactSlider
      {..._props}
      renderThumb={(props, state) => (
        <div
          {...props}
          className={cn({
            'h-full': !isVertical,
            'w-full': isVertical,
            'flex aspect-square cursor-grab items-center justify-center rounded-full bg-green-500 text-xs text-white':
              true,
          })}
        >
          {state.valueNow}
        </div>
      )}
    />
  )
}
export default RangeSlider
