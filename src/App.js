import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Movies from './components/Movies';
import Home from './components/Home';
import { useState } from 'react';
import Movieinfo from './components/MovieInfo';

function App() {
  const [landingSearch, setLandingSearch] = useState("")

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home landingSearch={landingSearch} setLandingSearch={setLandingSearch}/>}></Route>
          <Route path="/movies" element={<Movies landingSearch={landingSearch} setLandingSearch={setLandingSearch}/>}></Route>
          <Route path="/movie/:id" element={<Movieinfo />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
