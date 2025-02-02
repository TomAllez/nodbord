import { Connection } from 'components/connection'
import { OperationNode } from 'components/nodes/operation'
import { ToolBar } from 'components/toolbar'
import { useEffect, useState } from 'react'

export function WorkSpace() {
  const [dots, setDots] = useState<{ x: number; y: number }[]>([])
  const dotSpacing = 30

  const [nodes, setNodes] = useState<JSX.Element[]>([])

  useEffect(() => {
    const generateDots = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const newDots = []

      // Calculate only complete rows and columns to avoid partial dots
      const cols = Math.floor(screenWidth / dotSpacing)
      const rows = Math.floor(screenHeight / dotSpacing)

      for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
          newDots.push({
            x: col * dotSpacing,
            y: row * dotSpacing
          })
        }
      }

      setDots(newDots)
    }

    generateDots()
    window.addEventListener('resize', generateDots)
    return () => window.removeEventListener('resize', generateDots)
  }, [])

  return (
    <>
      <ToolBar nodes={nodes} setNodes={setNodes} />
      <div className="relative w-screen h-screen p-6">
        <div className="relative overflow-hidden w-full h-full">
          {dots.map((dot, index) => (
            <div
              key={index}
              className="absolute bg-gray-600 rounded-full"
              style={{
                width: '3px',
                height: '3px',
                left: `${dot.x}px`,
                top: `${dot.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
          {nodes}
          <Connection input={{ x: 1, y: 2 }} output={{ x: 1, y: 2 }} />
        </div>
      </div>
    </>
  )
}
