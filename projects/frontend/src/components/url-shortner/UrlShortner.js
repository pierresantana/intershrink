import React, { useState, useRef } from 'react';
import './UrlShortner.css';
import { Form, FormGroup, Button, InputGroup, Input, InputGroupAddon, Alert } from 'reactstrap';
import { loginOpenModal, addToasts } from '../../actions';
import { baseUrl } from '../../utils/url-utils';
import axios from 'axios';
import connect from '../../connect';

function UrlShortner({ auth, loginOpenModal, addToasts }) {
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
            return;
        }
        
        axios.post('/links', { url: urlLink })
            .then(response => {
                const link = response.data.link;
                setSaved(true);
                setUrlLink(`${baseUrl}/${link}`);
                saveLocalStorage(link);
            })
            .catch(err => addToasts(err.response.data.errors));
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
                        <Button type="submit" color="interlink">
                            {renderButonName()}
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                {
                    saved && (
                        auth.accessToken 
                            ? <Alert color="light">Link added to your account.</Alert>
                            : <Alert color="light">
                                Would you like track your links?
                                <div className="float-right pointer" onClick={() => loginOpenModal()}><b>Create an account</b></div>
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
    loginOpenModal: param => dispatch(loginOpenModal(param)),
    addToasts: params => dispatch(addToasts(params))
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(UrlShortner);
