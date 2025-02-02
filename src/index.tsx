import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WorkSpace } from './views'
import Node, { InputOutput, NodeInterface } from 'components/node'

const SampleAdditionNode: NodeInterface<number> = {
  title: 'Addition',
  inputs: [
    { name: 'a', value: 1 },
    { name: 'b', value: 2 }
  ],
  outputs: [{ name: 'result', value: 0 }],
  logic: (inputs: InputOutput<number>[]): InputOutput<number>[] => {
    // Perform addition logic here
    const sum = inputs.reduce((acc, input) => acc + input.value, 0)
    return [{ name: 'result', value: sum }]
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <WorkSpace>
              <Node {...SampleAdditionNode} />
            </WorkSpace>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
