import './index.css'
// import logo from '../assets/logo.png'
// import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

export const Box = (props) => {
  return <div className='box'>
    <h6>{props.title}</h6>
    <div className='tags'> 
    {
      props.tags.map((e, index) => {
        return  <span className='badge' key={index} style={{ borderColor: '#'+e.color }} >{e.name}</span>
      })
    }

    </div>

    <small style={{color:'#999'}}>Pulicado em {new Intl.DateTimeFormat('pt-BR').format(new Date(props.created_at))}</small>
  </div>
}