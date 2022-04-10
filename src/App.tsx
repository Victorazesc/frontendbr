
import './App.css';
import compressedLogo from './assets/compressed-logo.png'
import girl from './assets/girl.png'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [vacancies, setVacancies] = useState(0)
  const [error, setError] = useState({error: false, message: ''})

  useEffect(() => {
    axios.get(`https://api.github.com/repos/frontendbr/vagas`)
      .then(response => setVacancies(response.data.open_issues_count)).catch((error) => {
        setError({error: true, message: 'O limite de busca foi execedido'})
      })

}, [])

  return (
    <div className="App">
     <div className="App-header">
       <div className='container' style={{ flexDirection: "row" }}>
        <div className='App-header-description'>
          <img src={compressedLogo} alt="" />
          <h4>Agregador de vagas para desenvolvedores Frontend</h4>
          <Link className='btn btn-block' to="/vacancies">Ver {vacancies} Vagas</Link>
        </div>
        <div><img className='img-lp' src={girl} alt="" /></div>
       </div>
     </div>
     {/* <nav>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav> */}
    </div>
  );
}

export default App;

