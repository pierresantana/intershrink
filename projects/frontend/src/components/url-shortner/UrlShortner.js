import React, { useState, useRef, useContext } from 'react';
import './UrlShortner.css';
import { Form, FormGroup, Button, InputGroup, Input, InputGroupAddon, Alert } from "reactstrap";
import AuthContext from '../../contexts/AuthContext';
import { LOGIN_OPEN_MODAL } from '../../actions/types';
import { baseUrl } from '../../utils/url-utils';
import axios from 'axios';

function UrlShortner() {
    const { user, dispatch } = useContext(AuthContext);
    const [urlLink, setUrlLink] = useState('');
    const [saved, setSaved] = useState(false);
    const urlLinkRef = useRef();

    const localStorageKey = btoa('links');

    function handleUrlLink(e) {
        setUrlLink(e.target.value)
        setSaved(false);
    }

    function saveLink(e) {
        e.preventDefault();

        if (saved) {
            urlLinkRef.current.select();
            document.execCommand('copy');
            console.log('copy link', urlLink);
            return;
        }
        
        axios.post('/links', { url: urlLink })
            .then(response => {
                const link = response.data.link;
                setSaved(true);
                setUrlLink(`${baseUrl}/${link}`);
                saveLocalStorage(link);
            })
            .catch(err => console.log(err));
    }

    function saveLocalStorage(link) {
        const links = getLocalStorage();
        
        links.push(link);

        localStorage.setItem(localStorageKey, btoa(links.join(',')));
    }

    function getLocalStorage() {
        const savedLinks = localStorage.getItem(localStorageKey);
        return savedLinks ? atob(savedLinks).split(',') : [];
    }

    function renderButonName() {
        return saved ? 'COPY' : 'SHRINK';
    }

    return (
        <Form className="form" onSubmit={saveLink}>
            <FormGroup>
                <InputGroup>
                    <Input
                        innerRef={urlLinkRef}
                        placeholder="Paste the link to shrink it"
                        value={urlLink}
                        onChange={handleUrlLink}
                    />
                    <InputGroupAddon addonType="append">
                        <Button type="submit" color="interlink">{renderButonName()}</Button>
                    </InputGroupAddon>
                </InputGroup>
                {
                    saved && (
                        user.loogedIn 
                            ? <Alert color="light">Your link is add to your account.</Alert>
                            : <Alert color="light">
                                Would you like track your links?
                                <div className="float-right pointer" onClick={() => dispatch({ type: LOGIN_OPEN_MODAL })}><b>Create an account</b></div>
                            </Alert>
                    )
                }
            </FormGroup>
        </Form>
    );
}

export default UrlShortner;
