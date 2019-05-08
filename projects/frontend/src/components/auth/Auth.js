import React, { useState } from 'react';
import './Auth.css';
import { login_open_modal, logout_user, manage_links_open } from '../../actions';
import { ButtonDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import LoginForm from './LoginForm';
import CreateForm from './CreateForm';
import ManageLinks from './ManageLinks';
import connect from '../../connect';

function Auth({ auth, openLoginModal, openManageLinks, logoutUser }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div>
            {auth.accessToken
                ? (
                    <div className="login">
                        <ButtonDropdown size="sm" isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                            <DropdownToggle caret color="interlink">
                                <i className="fas fa-user"></i> {auth.firstName} {auth.lastName}
                            </DropdownToggle>
                            <DropdownMenu className="userDropdownMenu" size="sm">
                                <DropdownItem onClick={() => openManageLinks()}>
                                    <i className="fas fa-link"></i> Track links
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={() => logoutUser()}>
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        
                        {auth.showManageLinks && (<ManageLinks />)}
                    </div>
                )
                : (
                    <div>
                        <div className="login"
                            onClick={() => openLoginModal()}
                        >
                            <i className="fas fa-user"></i> Log In
                        </div>

                        {auth.showLoginModal && (<LoginForm />)}

                        {auth.showCreateModal && (<CreateForm />)}
                    </div>
                )
            }

        </div >
    );
}

const mapStateToProps = store => ({
    auth: store.auth
});

const mapDispathToProps = dispatch => ({
    openLoginModal: param => dispatch(login_open_modal(param)),
    logoutUser: param => dispatch(logout_user(param)),
    openManageLinks: param => dispatch(manage_links_open(param))
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Auth);