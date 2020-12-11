import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function ModalComponent(props) {
    let linkInfo = ''
    if (props.link !== ''){
        linkInfo =  "For more information visit: " 
             
    }


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.word}</h4>
          <p>
          This word has a frequency of: {props.frequency}
          </p>
          <p>
          {linkInfo}
          <a href={props.link }>
          {props.link }
          </a>
          </p>

          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  