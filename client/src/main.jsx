import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'
// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<App tab="home" />)
hydrate(<App/>, document.getElementById('root'))
