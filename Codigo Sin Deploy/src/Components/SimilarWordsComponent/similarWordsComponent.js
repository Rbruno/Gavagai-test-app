import React  from 'react'
import {ListGroup, Alert} from 'react-bootstrap'

export default function SimilarWordComponent(props) {
    
    const similarWords = props.similarWords;

    //function that verifies that the array of similar words is not empty
    function haveWords(){
        if (similarWords.length === 0) {
            return <Alert variant={'info'} >Not found similar words</Alert>
        } else {
            let words = similarWords.map((word)=>{
                
                return (
                    <ListGroup.Item action key={word.word} onClick={() => props.GetWordInfo(word.word)} >
                    {word.word}
                    </ListGroup.Item>
                )
            })
            return <div>
                    <Alert variant={'success '} >{words.length} Similar words found!</Alert>
                    {words}
                </div>
            
           
        }
    }

    return (
        <React.Fragment>
            <ListGroup  className="w-100">
                {
                    haveWords()
                }
            </ListGroup>
        </React.Fragment>
    )
}
