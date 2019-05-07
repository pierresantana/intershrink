import React, { useEffect, useState } from 'react';
import './Ranking.css';
import { baseUrl } from '../../utils/url-utils';
import axios from 'axios';

function Ranking() {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get('/links/top')
            .then((response) => setLinks(response.data.content));
    }, []);

    if (links.length) {
        return (
            <div className="flex-center">
                <div className="top-title">Top {links.length}</div>

                <div className="ranking">
                    {links.map((item) => (
                        <div key={item.id} className="row">
                            <div className="col-md-10 pointer">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {baseUrl}/{item.link}
                                </a>
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
