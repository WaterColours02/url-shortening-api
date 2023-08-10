import React, { useState } from 'react';

export default function ShortenAPI() {
    const [shortenedLinks, setShortenedLinks] = useState([]);
    const [linkToShorten, setLinkToShorten] = useState('');

    const API_END_POINT = "https://api.shrtco.de/v2/";

    const truncateURL = (url) => {
        if (url.length > 60) {
            return url.substring(0, 57) + '...';
        }
        return url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_END_POINT}shorten?url=${linkToShorten}`);
            const data = await response.json();

            if (data.ok) {
                const newLink = {
                    originalLink: truncateURL(linkToShorten), // Truncate original link if needed
                    shortenedLink: data.result.short_link,
                };
                setShortenedLinks([...shortenedLinks, newLink]);
                setLinkToShorten('');
            } else {
                // Handle error response
                console.error('Error shortening link:', data.error);
            }
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

    const handleCopy = (text) => {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    };

    return (
      <div className='section-shorten-link-form'>
        <div className='shorten-link-form-container'>
            <form className='shorten-link-form' onSubmit={handleSubmit}>
                <input
                    className='shorten-link-input'
                    style={{ fontSize: '20px' }}
                    placeholder='Shorten a link here...'
                    value={linkToShorten}
                    onChange={(e) => setLinkToShorten(e.target.value)}
                    />
                <button className='shorten-link-form-button' type='submit'>
                    Shorten it!
                </button>
            </form>

            <div className='shortened-link-results-container'>
                {shortenedLinks.map((link, index) => (
                  <div key={index} className='shortened-link-result'>
                        <p className='original-link'>{link.originalLink}</p>
                        <p className='shortened-link'>{link.shortenedLink}</p>
                        <button className='copy-link-button' onClick={() => handleCopy(link.shortenedLink)}>
                            Copy Link
                        </button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
}
