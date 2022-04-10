  import '../App.css'
  import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
  import { BsViewStacked, } from "@react-icons/all-files/bs/BsViewStacked";
  import { BsViewList } from "@react-icons/all-files/bs/BsViewList";
  import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
  import { Box } from '../components/box';
  import { Line } from '../components/line';
  import axios, { AxiosError } from 'axios';
  import notfound from '../assets/notfound.png'
  import {useEffect, useState} from 'react';
  import InfiniteScroll from 'react-infinite-scroll-component';
  import Select from 'react-select'
  import Modal from 'react-modal'
  import ReactMarkdown from 'react-markdown'
  import remarkGfm from 'remark-gfm'

  document.addEventListener('keydown', function(event) {

        const key = event.key; 
        
        switch (event.key) {
          case "ArrowLeft":
              console.log("Left arrow!")
              break;
          case "ArrowRight":
              console.log("Right arrow!")
              break;
          case "ArrowUp":
              console.log("Up arrow!")
              break;
          case "ArrowDown":

              console.log("Down arrow!")
              break;
          default:
        }
    });


    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        borderColor: 'transparent',
        // marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#222',
        height: 'calc(100% - 200px)'
      },
    };

    Modal.defaultStyles.overlay.backgroundColor = '#1111119e';


    // Modal.setAppElement('#App');


  export default function Vacancies() {

    const [vacancies, setVacancies] = useState([])
    const [error, setError] = useState({error: false, message: ''})
    const [page, setPage] = useState(1)
    const [display, setDisplay] = useState(true)
    const [labels, setLabels] = useState([])
    const [search, setSearch] = useState('')
    const [selectedLabels, setSelectedLabels] = useState([])
    const [key, setKey] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [vancancy, setVacancy] = useState(`
    
    ## Somos uma **plataforma freelancer fechada e gratuita** que conecta empresas e profissionais de tecnologia de **forma inteligente e cuida da gestão do relacionamento e contratação**.. 😎
    Você vai receber demandas **com segurança**, flexibilidade,  **sem calotes, escopos absurdos e leilão reverso**, sem se preocupar em buscar clientes **e valorizando o seu tempo**.
    
    Você cuida da programação e a gente cuida do resto!🤝😊
    
    Venha ter a experiência de um **match** com uma **demanda ideal com o seu perfil** aqui na **Vibbra!** 😍
    
    #tempoévida!
    
    ## Local
    
    Remoto!🌎
    
    ## Requisitos
    
    **Obrigatórios:**
    - 3 anos de experiência com desenvolvimento
    - Ser adepto ao trabalho remoto
    - Saber trabalhar com métodos ágeis
    
    **Diferenciais:**
    - Autogestão
    - Comprometimento
    - Prazer pelo que faz
    
    ## Contratação
    
    PJ Autônomo, ganhos mediante às horas trabalhadas em cada projeto;
    
    ## Como se candidatar
    
    Comece agora mesmo! Acesse o nosso **site** e clique no botão de **participar da seleção**, depois é só seguir o processo de cadastro até a ativação do seu perfil.😊
    
    https://bit.ly/git_javascript
    
    ## Dúvidas
    
    Caso surjam dúvidas durante o processo de cadastro, você pode entrar em contato com a equipe Vibbra! pelos seguintes canais:
    
    - [LinkedIn](https://www.linkedin.com/in/andremacieln/);
    - [Email](andre.nuernberg@vibbra.com.br);
    - Ou falar com um dos nossos Tech Recruiters pelas redes.
    
    ## Destaques
    
    ⚖️ Freela
    🤝 PJ/autônomo
    🗺️ Remoto
    👴 Sênior
    👨 Pleno`);

    function List(props) {
      const filteredData = labels.filter((el) => {
          if (props.value === '') {
              return el;
          } else {
              return el.name.toLowerCase().includes(props.value)
          }
      })
      return (
          <ul className='select'>
              {
                filteredData.length === 0 && <li style={{textAlign: 'center'}}>Nada encotrado !!</li>
              }
              {filteredData.map((item) => (
                  <li onClick={() => {setLabelsToSearch(item)}} key={item.id}>{item.name}</li>
              ))}
          </ul>
      )
    }

    function setLabelsToSearch(label) {

      const labelIndex = labels.findIndex(e => e.id === label.id);
      
      const data = selectedLabels.concat(label)

      setSelectedLabels(data)

      if (labelIndex === -1) {
        console.log('n achei')
      } else {
        labels.concat(labels.splice(labelIndex, 1))
        setSearch('');
      }

      // console.log(labelsUrl)
      axios.get(`https://api.github.com/repos/frontendbr/vagas/issues?state=open&${page}&per_page=20&labels=${data.map(e => e.name).join(',')}`)
      .then(response => setVacancies(response.data))


    }

    function removeLabel(index) {
      setKey(key+1)
      setLabels(labels.concat(selectedLabels[index]))
      selectedLabels.splice(index, 1)
      
      axios.get(`https://api.github.com/repos/frontendbr/vagas/issues?state=open&${page}&per_page=20&labels=${selectedLabels.map(e => e.name).join(',')}`)
      .then(response => setVacancies(response.data))
    }

    let subtitle;
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    
    const fetchMoreData = () => {
      setPage((page) => (
        page + 1
      ));
      axios.get(`https://api.github.com/repos/frontendbr/vagas/issues?state=open&${page}&per_page=20&labels=${selectedLabels.map(e => e.name).join(',')}`)
      .then(response => setVacancies(vacancies.concat(response.data)))
    };
    
  useEffect(() => {
      axios.get(`https://api.github.com/repos/frontendbr/vagas/issues?state=open&page=${page}&per_page=20&labels=`)
        .then(response => setVacancies(response.data)).catch((error) => {
          setError({error: true, message: 'O limite de busca foi execedido'})
        })

      axios.get('https://api.github.com/repos/frontendbr/vagas/labels?per_page=100').then(resp => {
        setLabels(resp.data)
      })

  }, [])


    return (
      <main style={{ paddingTop: "5rem" }} className="page">

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

<ReactMarkdown  >
  {vancancy}
</ReactMarkdown>
      </Modal>

        <div className='container'>
          <div className='header-page'>
            <div className='custom-input' onBlur={
              
              (e) => {  setTimeout(() => {
                setSearch('')
              }, 300)}
              
              } style={{ width: "500px" }}>
              <BsSearch/>
              <input type="text" value={search} onChange={(e) => {setSearch(e.target.value)}} />
              {
                search.length > 0 &&   <div>
                <List value={search}/>
              </div>
              }
            
            </div>
            <div>
              <BsViewStacked onClick={() => {setDisplay(true)}} style={{ color: display ? "#09BC8A" : "#00ffbb" }}/>
              &nbsp;
              <BsViewList onClick={() => {setDisplay(false)}} style={{ color: !display ? "#09BC8A" : "#00ffbb" }} />
            </div>
          </div>

          <div className='labelsLine' style={{justifyContent: 'flex-start'}}>
            {
              selectedLabels.map((e, i) => {
                return <span key={i+key} onClick={() => { removeLabel(i) }} className='badge' style={{ borderColor: '#'+e.color }}><span style={{fontSize: "25px", margin: "-12px 0px -10px -5px"}}>&times;</span> {e.name}</span>
              })
            }
          </div>
        
        {
          error.error ? <h4>{error.message}</h4> : <></>
        }

        
        {
  !error.error & vacancies.length > 0 ?
              <InfiniteScroll
                dataLength={vacancies.length}
                next={fetchMoreData}
                hasMore={true}
                className='container-grid'
                style={{ gridTemplateColumns: vacancies.length === 0 || !display ? '1fr' : '1fr 1fr 1fr' }} 
                loader={<div style={{textAlign: 'center', overflow: 'hidden'}}> <AiOutlineLoading className='App-logo'></AiOutlineLoading></div> }
              >
                {vacancies.map((e, index) => (
                // <a target={'_blank'} href={e.html_url} rel="noreferrer">
                <span onClick={()=> {
                  setVacancy(e.body)
                  openModal()
                }}>
                  {
                  display ? <Box title={e.title} created_at={e.created_at} tags={e.labels} key={index}/>
                  : <Line title={e.title} created_at={e.created_at} tags={e.labels} key={index}/>
  } </span>
                // </a>

                ))}
              </InfiniteScroll>

              :
              <div className='page not-found' style={{justifyContent: 'space-between', width:"-webkit-fill-available", height: "calc(100vh - 450px)"}}>
                <h4 style={{width: '350px'}}>Nenhum resultado foi encontrado!</h4>
                <img width="350px" src={notfound} alt="" />
              </div>
        }

          

          {/* <div style={{ paddingTop: "5rem" }} className='container-grid'>

            {
              vacancies.map((e,index) => {
                return <Box title={e.title} created_at={e.created_at} tags={e.labels} key={index}/>
              })
            }
          </div> */}
        </div>
      </main>
    );
  }