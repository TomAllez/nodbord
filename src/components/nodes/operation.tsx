import { InputOutput, NodeInterface } from '../../types'
import { Node } from './node'
import { v4 as uuid } from 'uuid'

const outputPort = uuid()
const inputPort = uuid()

const AdditionNodeProps: NodeInterface<number> = {
  id: uuid(),
  type: 'Operation',
  inputs: [
    { name: 'a', value: 1, port: inputPort },
    { name: 'b', value: 2, port: inputPort },
    { name: 'c', value: 2, port: inputPort }
  ],
  outputs: [{ name: 'result', value: 0, port: outputPort }],
  logic: (inputs: InputOutput<number>[]): InputOutput<number>[] => {
    const sum = inputs.reduce((acc, input) => acc + input.value, 0)
    return [{ name: 'result', value: sum, port: outputPort }]
  }
}

export const OperationNode = () => {
  return <Node {...AdditionNodeProps} />
}
