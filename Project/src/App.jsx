import {Signup} from '../src/Pages/Signup'
import {Signin} from '../src/Pages/Signin'
import {Home} from '../src/Pages/Home';
import {Dashboard} from '../src/Pages/Dashboard'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import './App.css'
import { RecoilRoot } from 'recoil'



function App() {
 

  return (
    <div className='h-screen'>
    <Toaster position='top-right' toastOptions={{
      duration:3000
    }}/>
    <RecoilRoot>
    <BrowserRouter>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
        

    </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </div>
  )
}

export default App
