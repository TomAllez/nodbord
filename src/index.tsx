import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { WorkSpace } from './views'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WorkSpace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
