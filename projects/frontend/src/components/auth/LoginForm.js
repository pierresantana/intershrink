import React, { useContext } from 'react';
import './Auth.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, InputGroup, Input, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import AuthContext from '../../contexts/AuthContext';
import { LOGIN_CLOSE_MODAL, LOGIN_OPEN_CREATE_MODAL, LOGIN_USER_SUCCESS } from '../../actions/types';
import useForm from "../../hooks/use-form";
import validate from './LoginFormValidation';
import axios from 'axios';

function LoginForm() {
    const { user, dispatch } = useContext(AuthContext);
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);

    function login() {
        axios.post('/auth', values)
            .then(response => dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data }))
            .catch(err => console.log(err));
    }

    return (
        <Modal size="sm" isOpen={user.showLoginModal}>
            <Form onSubmit={handleSubmit} noValidate>
                <ModalHeader toggle={() => dispatch({ type: LOGIN_CLOSE_MODAL })}>
                    Log In To Your Account
                </ModalHeader>
                <ModalBody className="login-modal-body">
                    <FormGroup>
                        <InputGroup>
                            <Input type="email"
                                name="email"
                                id="formControlEmail"
                                placeholder="Email"
                                invalid={!!errors.email}
                                value={values.email || ''}
                                onChange={handleChange}
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <i className="fas fa-at"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.email && (
                            <FormFeedback>{errors.email}</FormFeedback>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <InputGroup>
                            <Input
                                type="password"
                                name="password"
                                id="formControlPassword"
                                placeholder="Password"
                                invalid={!!errors.password}
                                value={values.password || ''}
                                onChange={handleChange}
                            />
                            <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <i className="fas fa-key"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.password && (
                            <FormFeedback>{errors.password}</FormFeedback>
                        )}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="flex-column mr-auto my-auto">
                            <div className="login-option flex-row">
                                <div className="pointer" onClick={() => dispatch({ type: LOGIN_OPEN_CREATE_MODAL })}>Create an Account</div>
                            </div>
                        </InputGroupAddon>
                        <Button color="interlink" type="submit">
                            Log In
                        </Button>
                    </InputGroup>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default LoginForm;