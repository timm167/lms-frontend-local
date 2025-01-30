import { useState } from 'react'
import './App.css'
import SignIn from './Components/Login'
import SignUp from './Components/SignUp'
import Playground from './Components/Playground'
import { Button } from '@mui/material'

function App() {

  const [page, setPage] = useState('login')
  const handleTogglePlayground = () => {
    if (page == 'dev-mode') {
      setPage('login')
    } else {
      setPage('dev-mode')
    }
  }

  return (
    <>
      <Button onClick={() => handleTogglePlayground()}>Toggle Playground</Button>
      {page == 'dev-mode' && <Playground/>}
      {(page == 'login' )&& <SignIn setPage={setPage}/>}
      {(page == 'signup') && <SignUp setPage={setPage}/>}
      {(page == 'home') && <h1>Logged in</h1>}
    </>
  )
}

export default App
