import React, { useEffect } from 'react';
import './Ranking.css';
import axios from 'axios';
import { baseUrl, redirectToLink } from '../../utils/url-utils';
import connect from '../../connect';
import { loadTopLinks, updateTopLinks, addToasts } from '../../actions';

function Ranking({ topLinks, loadTopLinks, updateTopLinks, addToasts }) {

    useEffect(() => {
        if (topLinks.loading) {
            axios.get('/links/top')
                .then((response) => {
                    updateTopLinks(response.data.content);
                })
                .catch(err => addToasts(err.response.data.errors));
        }
    }, [topLinks.loading]);

    function handleRedirect(link) {
        redirectToLink(link, true)
            .then(() => loadTopLinks());
    }

    if (topLinks.list.length) {
        return (
            <div className="flex-center">
                <div className="top-title">Top {topLinks.list.length}</div>

                <div className="ranking">
                    {topLinks.list.map((item) => (
                        <div key={item.id} className="row">
                            <div className="col-md-10 pointer">
                                <div className="pointer" onClick={() => handleRedirect(item.link)}>
                                    {baseUrl}/{item.link}
                                </div>
                            </div>
                            <div className="col-md-2 text-right">
                                {item.clicks || 0}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

const mapStateToProps = store => ({
    topLinks: store.topLinks
});

const mapDispathToProps = dispatch => ({
    loadTopLinks: param => dispatch(loadTopLinks(param)),
    updateTopLinks: param => dispatch(updateTopLinks(param)),
    addToasts: param => dispatch(addToasts(param))
});

export default connect(
    mapStateToProps,
    mapDispathToProps
)(Ranking);
