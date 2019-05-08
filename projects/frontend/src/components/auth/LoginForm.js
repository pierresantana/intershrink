import React from 'react';
import './Auth.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, InputGroup, Input, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import { loginCloseModal, loginOpenCreateModal, loginUserSuccess, addToasts } from '../../actions';
import useForm from "../../hooks/use-form";
import validate from './LoginFormValidation';
import axios from 'axios';
import connect from '../../connect';

function LoginForm({ auth, loginCloseModal, loginOpenCreateModal, loginUserSuccess, addToasts }) {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);

    function login() {
        axios.post('/auth', values)
            .then(response => loginUserSuccess(response.data))
            .catch(err => addToasts(err.response.data.errors));
    }

    return (
        <Modal size="sm" isOpen={auth.showLoginModal}>
            <Form onSubmit={handleSubmit} noValidate>
                <ModalHeader toggle={() => loginCloseModal()}>
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
                            {errors.email && (
                                <FormFeedback>{errors.email}</FormFeedback>
                            )}
                        </InputGroup>
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
                            {errors.password && (
                                <FormFeedback>{errors.password}</FormFeedback>
                            )}
                        </InputGroup>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="flex-column mr-auto my-auto">
                            <div className="login-option flex-row">
                                <div className="pointer" onClick={() => loginOpenCreateModal()}>Create an Account</div>
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

const mapStateToProps = store => ({
    auth: store.auth
});

const mapDispathToProps = dispatch => ({
    loginCloseModal: param => dispatch(loginCloseModal(param)),
    loginOpenCreateModal: param => dispatch(loginOpenCreateModal(param)),
    loginUserSuccess: param => dispatch(loginUserSuccess(param)),
    addToasts: param => dispatch(addToasts(param))
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(LoginForm);