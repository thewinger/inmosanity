import { FC, memo, MouseEventHandler } from 'react'

interface ProductSliderControl {
  onPrev: MouseEventHandler<HTMLButtonElement>
  onNext: MouseEventHandler<HTMLButtonElement>
}

const ProductSliderControl: FC<ProductSliderControl> = ({ onPrev, onNext }) => (
  <div className="slider-control">
    <button
      className="slider-control__prev"
      onClick={onPrev}
      aria-label="Previous Product Image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
    <button
      className="slider-control__next"
      onClick={onNext}
      aria-label="Next Product Image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </button>
  </div>
)

export default memo(ProductSliderControl)
