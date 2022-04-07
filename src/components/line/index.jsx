import './index.css'
// import logo from '../assets/logo.png'
// import { FaGithub } from "@react-icons/all-files/fa/FaGithub";

export const Line = (props) => {
  return <div className='line'>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <span>{props.title}
    <br />
    <small style={{color:'#999'}}>Pulicado em {new Intl.DateTimeFormat('pt-BR').format(new Date(props.created_at))}</small>
    </span>
      <span className='labelsLine'>
      {
        props.tags.map((e, index) => {
          return  <span className='badge' key={index} style={{ borderColor: '#'+e.color }} >{e.name}</span>
        })
      }
      </span>
    </div>
    
  </div>
}