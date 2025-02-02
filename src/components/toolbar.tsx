import { Dispatch, SetStateAction } from 'react'
import { OperationNode } from './nodes/operation'

interface ToolBarProps {
  nodes: JSX.Element[]
  setNodes: Dispatch<SetStateAction<JSX.Element[]>>
}

export function ToolBar({ nodes, setNodes }: ToolBarProps) {
  const handleAddNode = () => {
    setNodes([...nodes, OperationNode()])
  }

  return (
    <div
      onClick={handleAddNode}
      className="fixed flex items-center justify-end bg-zinc-800 h-12 w-full z-10 p-2"
    >
      <Button label="Add" onClick={handleAddNode} />
    </div>
  )
}

interface ButtonProps {
  label: string
  onClick: () => void
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="h-8 w-24 bg-purple-500 rounded text-black font-bold flex items-center justify-center hover:bg-orange-700"
      onClick={onClick}
    >
      {label}
    </button>
  )
}
