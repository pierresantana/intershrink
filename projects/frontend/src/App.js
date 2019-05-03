import React, { useState } from 'react';
import './App.css';
import { Modal, FormGroup, Button, FormControl, InputGroup, ControlLabel } from "react-bootstrap";

function App() {
    const [urlLink, setUrlLink] = useState("");
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

    const links = [
        { id: 1, link: 'https://intershrink.paris/ouioui', counter: 1676 },
        { id: 2, link: 'https://intershrink.paris/m4r1aN', counter: 120 },
        { id: 3, link: 'https://intershrink.paris/2JCMTS', counter: 1150 },
        { id: 4, link: 'https://intershrink.paris/z58IK0', counter: 1000 },
        { id: 5, link: 'https://intershrink.paris/R4bad3', counter: 900 }
    ];

    return (
        <div className="app">
            <header className="header flex-center">
                <div className="container">
                    <div className="login"
                        onClick={() => setShowLoginModal(true)}>
                        <i className="fas fa-user"></i> Log In
                    </div>
                    <Modal bsSize="small" show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Log In To Your Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="login-modal-body">
                            <form>
                                <FormGroup controlId="fromControlEmail">
                                    <InputGroup>
                                        <InputGroup.Addon>
                                            <i className="fas fa-at"></i>
                                        </InputGroup.Addon>
                                        <FormControl
                                            type="email"
                                            placeholder="Email"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup controlId="formControlPassword">
                                    <InputGroup>
                                        <InputGroup.Addon>
                                            <i className="fas fa-key"></i>
                                        </InputGroup.Addon>
                                        <FormControl
                                            type="password"
                                            placeholder="Password"
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="login-option">
                                        <div className="link">Forgot password?</div>
                                    </div>
                                    <div className="login-option">
                                        <div className="link" onClick={() => setShowCreateAccountModal(true)}>Create an Account</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <Button bsClass="btn btn-interlink" onClick={() => setShowLoginModal(false)}>
                                        Log In
                                    </Button>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showCreateAccountModal} onHide={() => setShowCreateAccountModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create an Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="login-modal-body">
                            <form>
                                <FormGroup controlId="fromControlFirstName">
                                    <ControlLabel>Name</ControlLabel>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl
                                                type="text"
                                                placeholder="First name"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl
                                                type="text"
                                                placeholder="Last name"
                                            />
                                        </div>
                                    </div>
                                </FormGroup>

                                <FormGroup controlId="fromControlEmail">
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl
                                        type="email"
                                        placeholder="Email"
                                    />
                                </FormGroup>
                                <FormGroup controlId="formControlPassword">
                                    <ControlLabel>Password</ControlLabel>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormControl
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormControl
                                                type="password"
                                                placeholder="Confirm password"
                                            />
                                        </div>
                                    </div>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setShowCreateAccountModal(false)}>
                                Close
                            </Button>
                            <Button bsClass="btn btn-interlink" onClick={() => setShowCreateAccountModal(false)}>
                                Create
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <a className="interlink-logo" href="http://www.interlink.com.ar" target="_blank" rel="noopener noreferrer">
                        <img src="/images/interlink-logo-white.png" alt="Interlink" />
                    </a>
                    <div className="message">
                        <div className="title">Shrink your link!</div>
                        <p className="sub-title">A long URL is always a problem. It's hard to remember and share.</p>
                    </div>

                    <div className="form">
                        <FormGroup>
                            <InputGroup>
                                <FormControl
                                    placeholder="Paste the link to shrink it"
                                    aria-label="Paste the link to shrink it"
                                    aria-describedby="basic-addon2"
                                    value={urlLink}
                                    onChange={e => setUrlLink(e.target.value)}
                                />
                                <InputGroup.Button>
                                    <Button bsClass="btn btn-interlink">SHRINK</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </div>
                </div>
            </header>

            <div className="flex-center">
                <div className="top-title">Top 5</div>

                <div className="ranking">
                    {links.map((item) => (
                        <div key={item.id} className="row">
                            <div className="link">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.link}
                                </a>
                            </div>
                            <div className="counter">
                                {item.counter}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">
                <div className="container">
                    <div className="interlink-footer">
                        <a href="http://www.interlink.com.ar" target="_blank" rel="noopener noreferrer">
                            Made with <img src="/images/heart-emoji.png" alt="love" /> by Interlink
                        </a>
                    </div>
                    <div className="twitter">
                        <a href="https://twitter.com/interlinklatam" target="_blank" rel="noopener noreferrer">
                            <img src="/images/twitter-logo.png" alt="Twitter" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
