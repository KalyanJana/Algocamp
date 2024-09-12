import { Route, Routes } from 'react-router-dom'
import './App.css'
import TextInputFormContainer from './components/textInputForm/TextInputFormContainer'
import PalyGame from './pages/PlayGame'
import StartGame from './pages/StartGame'

function App() {


  return (
    <Routes>
      <Route path="/start" element={<StartGame />}/>
      <Route path="/play" element={<PalyGame />}/>
      <Route path="/" element={<TextInputFormContainer />}/>
     
    </Routes>
  )
}

export default App
