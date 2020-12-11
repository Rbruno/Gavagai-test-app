import React, {useState} from 'react'
import {Form, Button, InputGroup, FormControl, Alert} from 'react-bootstrap'

export default function SearchComponent(props) {
    const languages = props.languages;
    const [word, setword] = useState('');
    const [error, seterror] = useState(false);
    const [language, setlanguage] = useState('');

    const search = () => {
        if (word !== '' && language !== '') {
            seterror(false)
            props.GetWords(word, language)
        }else{
            seterror(true)
        }
    }

    return (
        <React.Fragment>
            <Form onSubmit={e => { e.preventDefault(); }}>
                <Form.Group controlId="searchControl">
                    <InputGroup>
                        <FormControl
                            placeholder="Word"
                            aria-label="Word"
                            onChange={(e)=>setword(e.target.value)}
                            value={word}
                        />
                        <Form.Control as="select" onChange={(e)=>setlanguage(e.target.value)}>
                        <option key={0}>Select a language</option>
                        {
                            languages.map((language) =>{
                                
                                return <option key={language}>{language}</option>
                                 
                            })
                        }
                        </Form.Control>
                    </InputGroup>
                </Form.Group>
                {error && (
                    <Alert  variant='danger'>
                        You must write a word and choose a language
                    </Alert>
                )}
                <Button variant="primary" size="lg" block onClick={search}>
                    Search
                </Button>

            </Form>
        </React.Fragment>
    )
}
