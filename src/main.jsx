import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Layout from './containers/Layout/Layout'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <BrowserRouter>
        <Layout>
            <App />
        </Layout>
      </BrowserRouter>
    
  </React.StrictMode>,
)
