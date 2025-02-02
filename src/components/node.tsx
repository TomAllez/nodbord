import { useState, useEffect, useMemo } from 'react'

export interface InputOutput<T> {
  name: string
  value: T
}

export interface NodeInterface<T> {
  title: string
  inputs: InputOutput<T>[]
  outputs: InputOutput<T>[]
  logic: (
    inputs: InputOutput<T>[]
  ) => Promise<InputOutput<T>[]> | InputOutput<T>[]
}

export default function Node<T>(props: NodeInterface<T>) {
  const [position, setPosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const { title, inputs, outputs, logic } = props
  const [logicResult, setLogicResult] = useState<T>()

  useMemo(async () => {
    const result = logic(inputs)
    if (result instanceof Promise) {
      const resolvedResult = await result
      setLogicResult(resolvedResult[0].value)
    } else {
      setLogicResult(result[0].value)
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const newX = e.clientX - offset.x
      const newY = e.clientY - offset.y
      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, offset])

  return (
    <div
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      className="absolute bg-gradient-to-br from-cyan-500 p-0.5 to-green-500 flex justify-center items-center w-56 h-72 rounded-lg"
    >
      <div className="w-full h-full rounded bg-zinc-800 rounded-lg z-2 select-none flex">
        <div className="w-full flex font-bold text-black bg-gradient-to-br from-cyan-500 p-0.5 to-green-500 items-center justify-between px-4 bg-blue-500 h-10">
          {title}
          <div
            onMouseDown={handleMouseDown}
            className="cursor-pointer hover:text-white click:text-white"
          >
            <HamburgerIcon />
          </div>
        </div>
        <div className="absolute top-0 h-full py-4 -left-2 flex flex-col justify-end items-center">
          {inputs.map((input) => (
            <Connector io={input} inversed={false} />
          ))}
        </div>
        <div className="absolute top-10 h-full py-4 -right-2 flex flex-col justify-start items-center">
          {outputs.map((output) => (
            <Connector io={output} inversed={true} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Connector<T>({
  io,
  inversed
}: {
  io: InputOutput<T>
  inversed: boolean
}) {
  const computeColor = (): string => {
    if (typeof io.value === 'number') {
      return 'bg-cyan-500'
    }
    if (typeof io.value === 'string') {
      return 'bg-pink-300'
    }
    if (io.value instanceof Date) {
      return 'bg-yellow-500'
    }
    return 'bg-gray-600' // Default color
  }

  const colorClass = computeColor()

  if (inversed) {
    return (
      <div className="flex justify-center items-center">
        <div>{io.name}</div>
        <div
          className={`rounded-full ${colorClass} h-4 w-4 border-green-500 border ml-2`}
        ></div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`rounded-full ${colorClass} h-4 w-4 border-cyan-500 border mr-2`}
      ></div>
      <div>{io.name}</div>
    </div>
  )
}

const HamburgerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </svg>
  )
}
