import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Category from './Category.jsx'
import { CATEGORIES } from './categories.js'
import './index.css'

// ponytail: path lookup + full page loads instead of a router; add react-router when pages need shared state or transitions
const cat = CATEGORIES[location.pathname.replace(/^\/|\/$/g, '')]
if (cat) document.title = `${cat.nav} | VOX LAPIDIS`

createRoot(document.getElementById('root')).render(cat ? <Category {...cat} /> : <App />)
