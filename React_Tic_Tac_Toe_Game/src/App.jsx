import './App.css'
import BoardContainer from './components/board/BoardContainer'
import Button from './components/button/Button'

function App() {

  return (
    <div className='border m-auto p-5 flex flex-col justify-center items-center'>
      <h1>Welcome to Tic Tac Toe Game</h1>
      <BoardContainer />
      {/* <Button 
          text="Start Game"
          onClickHandler={()=>console.log('Clicked')}
      /> */}
    </div>
  )
}

export default App
