import React from 'react'
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login'
import Register from './components/register/Register'
import AddStory from './components/addStory/AddStory'
import Homepage from './components/homePage/Homepage'
import Share from './components/share/Share';


function App() {
  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/card/:id/:storyId" element={<Share />} />
        </Routes>
      </BrowserRouter>
   </>
  )
}


export default App