import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// const h1 = React.createElement('div', null, React.createElement('ul', null, React.createElement('li', null, 'item 1')));
const h1 = <div><ul><li>Hola mundo</li></ul></div>
ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  h1
)
