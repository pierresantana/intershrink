import React, { useEffect, useState } from 'react';
import './Ranking.css';
import axios from 'axios';
import { baseUrl, redirectToLink } from '../../utils/url-utils';

function Ranking() {
    const [links, setLinks] = useState([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if (reload) {
            axios.get('/links/top')
                .then((response) => {
                    setLinks(response.data.content);
                    setReload(false);
                });
        }
    }, [reload]);

    function handleRedirect(link) {
        redirectToLink(link, true)
            .then(() => setReload(true));
    }

    if (links.length) {
        return (
            <div className="flex-center">
                <div className="top-title">Top {links.length}</div>

                <div className="ranking">
                    {links.map((item) => (
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

export default Ranking;
