import React, {useState} from 'react'
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap'

export default function SearchComponent(props) {
    const languages = props.languages;
    const [word, setword] = useState([]);
    const [language, setlanguage] = useState([]);

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
                
                <Button variant="primary" size="lg" block onClick={() => props.GetWords(word, language)}>
                    Search
                </Button>

            </Form>
        </React.Fragment>
    )
}
