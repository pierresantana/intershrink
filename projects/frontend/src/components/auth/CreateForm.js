import React, { useContext } from 'react';
import './Auth.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input, Form, FormGroup, InputGroup, InputGroupAddon, FormFeedback } from "reactstrap";
import AuthContext from '../../contexts/AuthContext';
import { LOGIN_CLOSE_CREATE_MODAL, LOGIN_USER_SUCCESS } from '../../actions/types';
import useForm from "../../hooks/use-form";
import validate from './CreateFormValidation';
import axios from 'axios';

function CreateForm() {
    const { user, dispatch } = useContext(AuthContext);
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(saveUser, validate);

    function saveUser() {
        const { confirmPassword, ...payload } = values;
        axios.post('/users', payload)
            .then(response => dispatch({ type: LOGIN_USER_SUCCESS, payload }))
            .catch(err => console.log(err));
    };

    function closeModal() {
        dispatch({ type: LOGIN_CLOSE_CREATE_MODAL });
    }

    return (
        <Modal isOpen={user.showCreateModal}>
            <Form onSubmit={handleSubmit} noValidate>
                <ModalHeader toggle={closeModal}>
                    Create an Account
            </ModalHeader>
                <ModalBody className="login-modal-body">
                    <FormGroup>
                        <Label>Name *</Label>

                        <div className="row">
                            <div className="col-md-6">
                                <Input
                                    type="text"
                                    name="firstName"
                                    placeholder="First name"
                                    invalid={!!errors.firstName}
                                    value={values.firstName || ''}
                                    onChange={handleChange}
                                />
                                {errors.firstName && (
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                )}
                            </div>
                            <div className="col-md-6">
                                <Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last name"
                                    invalid={!!errors.lastName}
                                    value={values.lastName || ''}
                                    onChange={handleChange}
                                />
                                {errors.lastName && (
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                )}
                            </div>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label>Email *</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            invalid={!!errors.email}
                            value={values.email || ''}
                            onChange={handleChange}
                        />
                        {errors.email && (
                            <FormFeedback>{errors.email}</FormFeedback>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label>Password *</Label>

                        <div className="row">
                            <div className="col-md-6">
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    invalid={!!errors.password}
                                    value={values.password || ''}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <FormFeedback>{errors.password}</FormFeedback>
                                )}
                            </div>
                            <div className="col-md-6">
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    invalid={!!errors.confirmPassword}
                                    value={values.confirmPassword || ''}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && (
                                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                                )}
                            </div>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" className="flex-column mr-auto my-auto">
                            <div className="login-option flex-row">
                                * required fields
                        </div>
                        </InputGroupAddon>
                        <Button className="mr-2"
                            onClick={closeModal}>
                            Close
                    </Button>
                        <Button color="interlink"
                            type="submit">
                            Create
                    </Button>
                    </InputGroup>
                </ModalFooter>

            </Form>
        </Modal>
    );
}

export default CreateForm;