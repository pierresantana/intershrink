import React, { useEffect, useState } from 'react';
import './Auth.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { manage_links_close } from '../../actions';
import { baseUrl, redirectToLink } from '../../utils/url-utils';
import axios from 'axios';
import connect from '../../connect';

function ManageLinks({ auth, manage_links_close }) {
    const [links, setLinks] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [reload, setReload] = useState(true);
    const limit = 10;

    useEffect(() => {
        if (reload) {
            axios.get(`/links?limit=${limit}&page=${page}`)
                .then((response) => {
                    setLinks(response.data.content);
                    setTotal(Math.ceil(response.data.total / limit));
                    setReload(false);
                });
        }
    }, [page, reload]);

    function closeModal() {
        manage_links_close();
    }

    function handleRedirect(link) {
        redirectToLink(link, true)
            .then(() => setReload(true));
    }

    return (
        <Modal size="lg" isOpen={auth.showManageLinks}>
            <ModalHeader toggle={closeModal}>
                Track your links
            </ModalHeader>
            <ModalBody className="login-modal-body">
                {links.length
                    ? (
                        <Table striped size="sm">
                            <thead>
                                <tr>
                                    <th>Link</th>
                                    <th>Title</th>
                                    <th>Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {links.map((l, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="pointer" onClick={() => handleRedirect(l.link)}>
                                                {baseUrl}/{l.link}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ellipsis">
                                                {l.title || '-'}
                                            </div>
                                        </td>
                                        <td>{l.clicks || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
                    : (
                        <div className="text-center my-3">There's no links registred in your account.</div>
                    )
                }
            </ModalBody>
            <ModalFooter>
                <Pagination size="sm" className="bth-interlink" aria-label="Page navigation">
                    {[...(new Array(total))].map((_, i) => (
                        <PaginationItem key={i} active={page === i}>
                            <PaginationLink onClick={() => setPage(i)}>
                                {i+1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                </Pagination>
            </ModalFooter>
        </Modal >
    );
}

const mapStateToProps = store => ({
    auth: store.auth
});

const mapDispathToProps = dispatch => ({
    manage_links_close: param => dispatch(manage_links_close(param))
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(ManageLinks);