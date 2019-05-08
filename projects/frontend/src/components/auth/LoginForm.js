import React from 'react';
import './Auth.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, InputGroup, Input, InputGroupAddon, InputGroupText, FormFeedback } from 'reactstrap';
import { login_close_modal, login_open_create_modal, login_user_success } from '../../actions';
import useForm from "../../hooks/use-form";
import validate from './LoginFormValidation';
import axios from 'axios';
import connect from '../../connect';

function LoginForm({ auth, login_close_modal, login_open_create_modal, login_user_success }) {
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(login, validate);

    function login() {
        axios.post('/auth', values)
            .then(response => login_user_success(response.data))
            .catch(err => console.log(err));
    }

    return (
        <Modal size="sm" isOpen={auth.showLoginModal}>
            <Form onSubmit={handleSubmit} noValidate>
                <ModalHeader toggle={() => login_close_modal()}>
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
                                <div className="pointer" onClick={() => login_open_create_modal()}>Create an Account</div>
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
    login_close_modal: param => dispatch(login_close_modal(param)),
    login_open_create_modal: param => dispatch(login_open_create_modal(param)),
    login_user_success: param => dispatch(login_user_success(param))
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(LoginForm);