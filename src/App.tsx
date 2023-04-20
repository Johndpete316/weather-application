import react from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import Counter from './components/counter'
import WeatherCard from './components/WeatherApp'

function App() {
  return (
    <div className="App">
      <header>
        <div className='logo-container'>
          <Counter />
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </header>
      <WeatherCard />
    </div>
  )
}

export default App
