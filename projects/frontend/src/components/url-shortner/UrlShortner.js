import React, { useState, useRef } from 'react';
import './UrlShortner.css';
import { Form, FormGroup, Button, InputGroup, Input, InputGroupAddon, Alert } from "reactstrap";
import { login_open_modal } from '../../actions';
import { baseUrl } from '../../utils/url-utils';
import axios from 'axios';
import connect from '../../connect';

function UrlShortner({ auth, login_open_modal }) {
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
                        auth.loogedIn 
                            ? <Alert color="light">Your link is add to your account.</Alert>
                            : <Alert color="light">
                                Would you like track your links?
                                <div className="float-right pointer" onClick={() => login_open_modal()}><b>Create an account</b></div>
                            </Alert>
                    )
                }
            </FormGroup>
        </Form>
    );
}

const mapStateToProps = store => ({
    auth: store.auth
});

const mapDispathToProps = dispatch => ({
    login_open_modal: param => dispatch(login_open_modal(param))
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(UrlShortner);
