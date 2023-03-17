import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Layout from './containers/Layout/Layout'
import { DataProvider } from './context/dataContext'

import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

        <DataProvider>  
                <Layout>
                    <App />
                </Layout>
        </DataProvider>
              
    </BrowserRouter>
  </React.StrictMode>,
)
