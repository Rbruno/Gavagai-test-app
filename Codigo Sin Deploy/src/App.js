import React, {useState, useEffect} from 'react'
//styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap'

//components
import SearchComponent from './Components/SearchComponent/searchComponent';
import SimilarWordComponent from './Components/SimilarWordsComponent/similarWordsComponent';
import ModalComponent from './Components/ModalComponent/modalComponent';

//plugins
import LoadingOverlay from 'react-loading-overlay';

function App() { 

  const [languages, setlanguages] = useState([]);
  const [language, setlanguage] = useState([]);

  const [similarWords, setsimilarWords] = useState([]);

  //Modal info
  const [modalWord, setModalWord] = useState([]);
  const [modalLink, setModalLink] = useState([]);
  const [modalFrequency, setModalFrequency] = useState([]);


  //Controls
  const [modalShow, setModalShow] = useState(false);
  const [isActive, setisActive] = useState(false);

  let basicUrl = 'https://api.gavagai.se/v3/lexicon/';
  let apiKey = '?apiKey=12c1199d4b43706e6a6e8394b518b7f8';

  useEffect(() => {
    GetLanguages();
  });
  
  //function that looks for the allowed languages
  async function GetLanguages(){
    
    let urlComplete = 'https://api.gavagai.se/v3/languages'+ apiKey;

    await fetch(urlComplete)
      .then(response => response.json())
      .then(data => setlanguages(data)) 

  }

  //function that returns similar words
  async function GetWords(word, language){

    setisActive(true)

    let urlComplete = basicUrl + language +'/'+ word + apiKey;

    await fetch(urlComplete)
      .then(response => response.json())
      .then(data => {
        setlanguage(language)
        setsimilarWords(data.stringSimilarWords)
        setisActive(false)
      })  

  }

  //function that returns the information of the searched word
  async function GetWordInfo(word){

    setisActive(true)

    let urlComplete = basicUrl + language +'/'+ word + '/info' + apiKey;

    await fetch(urlComplete)
      .then(response => response.json())
      .then(data => {
        setModalShow(true)
        setModalWord(data.word)
        setModalFrequency(data.frequency)
        if (data.additionalInformation !== undefined ){
          setModalLink(data.additionalInformation.link)
        }else{
          setModalLink('')
        }
          
        setisActive(false)
      })  

  }

  return (
    <LoadingOverlay
      active={isActive}
      spinner
      text='Loading...'
      >
      <Container className="p-3"  fluid="md">
        <Jumbotron>

          <Row className="justify-content-md-center">
            <Col md="auto">
            <h1 className="Header">Gavagai Test</h1>
            </Col>
          </Row>
          {/* Search Component */}
          <Row className="justify-content-md-center">          
              <SearchComponent languages={languages} GetWords={GetWords} />
          </Row>

          {/* Similar Words Component */}
          <Row className="p-3 justify-content-md-center "> 
            <SimilarWordComponent similarWords={similarWords} GetWordInfo={GetWordInfo}></SimilarWordComponent>
          </Row>  
        </Jumbotron> 

        <ModalComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          word={modalWord}
          frequency={modalFrequency}
          link={modalLink}
        /> 
      </Container>
    </LoadingOverlay>
    
    
  );
}

export default App;
