import { useState } from 'react'

interface Point {
  x: number
  y: number
}

interface ConnectionInterface {
  input: Point
  output: Point
}

export function Connection({ input, output }: ConnectionInterface) {
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [endPoint, setEndPoint] = useState<Point | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const svgRect = event.currentTarget.getBoundingClientRect()
    setStartPoint({
      x: event.clientX - svgRect.left,
      y: event.clientY - svgRect.top
    })
    setIsDragging(true)
  }

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (isDragging && startPoint) {
      const svgRect = event.currentTarget.getBoundingClientRect()
      setEndPoint({
        x: event.clientX - svgRect.left,
        y: event.clientY - svgRect.top
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const getBezierPath = () => {
    if (!startPoint || !endPoint) return ''

    const controlPointOffset = 100
    const controlX1 = startPoint.x + controlPointOffset
    const controlY1 = startPoint.y
    const controlX2 = endPoint.x - controlPointOffset
    const controlY2 = endPoint.y

    return `M ${startPoint.x},${startPoint.y} 
          C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endPoint.x},${endPoint.y}`
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center text-green-500 z-12">
      <svg
        className="h-full w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="pink" stopOpacity={1} />
            <stop offset="100%" stopColor="orange" stopOpacity={1} />
          </linearGradient>
        </defs>

        {startPoint && endPoint && (
          <path
            d={getBezierPath()}
            strokeWidth="4"
            fill="none"
            stroke="url(#gradient)"
          />
        )}
      </svg>
    </div>
  )
}
