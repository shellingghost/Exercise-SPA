import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
// TODO: >>>???
//import { useState } from 'react-router-dom'
import { useState } from 'react'

//test
import Navigation from './components/Navigation'


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <>
    <header> 
      <div id="top">
      <h1 id="h1">Exercise Log</h1>
      <p id="p">Please enter your exercise and their details below</p>
      </div>

    <div className="App">

      <Router>
        <div className="App-header">

        <nav>
    <Navigation></Navigation>
    </nav>
		<Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}/>
          <Route path="/add-exercise" element={<AddExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}  />}/>
		  </Routes>
          </div>
      </Router>
    </div>

    </header>
      <footer className='footer'> © 2022 Troy Shibukawa</footer>
    </>

  );
}

export default App;