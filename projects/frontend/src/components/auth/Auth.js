import React, { useContext, useState } from 'react';
import './Auth.css';
import AuthContext from '../../contexts/AuthContext';
import { LOGIN_OPEN_MODAL, LOGOUT_USER, MANAGE_LINKS_OPEN } from '../../actions/types';
import { ButtonDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import LoginForm from './LoginForm';
import CreateForm from './CreateForm';
import ManageLinks from './ManageLinks';

function Auth() {
    const { user, dispatch } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div>
            {user.loggedIn
                ? (
                    <div className="login">
                        <ButtonDropdown size="sm" isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                            <DropdownToggle caret color="interlink">
                                <i className="fas fa-user"></i> {user.firstName} {user.lastName}
                            </DropdownToggle>
                            <DropdownMenu className="userDropdownMenu" size="sm">
                                <DropdownItem onClick={() => dispatch({ type: MANAGE_LINKS_OPEN })}>
                                    <i className="fas fa-link"></i> Track links
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => dispatch({ type: LOGOUT_USER })}>
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        
                        {user.showManageLinks && (<ManageLinks />)}
                    </div>
                )
                : (
                    <div>
                        <div className="login"
                            onClick={() => dispatch({ type: LOGIN_OPEN_MODAL })}
                        >
                            <i className="fas fa-user"></i> Log In
                        </div>

                        {user.showLoginModal && (<LoginForm />)}

                        {user.showCreateModal && (<CreateForm />)}
                    </div>
                )
            }

        </div >
    );
}

export default Auth;
