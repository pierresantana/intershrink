import React, { useContext, useEffect, useState } from 'react';
import './Auth.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import AuthContext from '../../contexts/AuthContext';
import { MANAGE_LINKS_CLOSE } from '../../actions/types';
import { baseUrl } from '../../utils/url-utils';

function ManageLinks() {
    const { user, dispatch, axios } = useContext(AuthContext);
    const [links, setLinks] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        axios.get(`/links?limit=${limit}&page=${page}`)
            .then((response) => {
                setLinks(response.data.content);
                setTotal(Math.ceil(response.data.total / limit));
            });
    }, [page]);

    function closeModal() {
        dispatch({ type: MANAGE_LINKS_CLOSE });
    }

    return (
        <Modal size="lg" isOpen={user.showManageLinks}>
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
                                            <a href={`${baseUrl}/${l.link}`} target="_blank" rel="noopener noreferrer">
                                                {baseUrl}/{l.link}
                                            </a>
                                        </td>
                                        <td>{l.title || '-'}</td>
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

export default ManageLinks;