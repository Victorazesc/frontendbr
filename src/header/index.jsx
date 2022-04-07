import './index.css'
import logo from '../assets/logo.png'
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { Link } from 'react-router-dom';

export const Header = () => {
  return <header>
    <div>
  <Link to={'/'}><img height="40px" src={logo} alt="" /></Link> 
    </div>
    <div>
<h1><a href="www.google.com"><FaGithub/></a></h1>
    </div>
  </header>
}