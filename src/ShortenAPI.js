import React, { useState } from 'react';

export default function ShortenAPI() {
    const [shortenedLinks, setShortenedLinks] = useState([]);
    const [linkToShorten, setLinkToShorten] = useState('');
    const [inputError, setInputError] = useState('');

    const API_END_POINT = "https://api.shrtco.de/v2/";

    const truncateURL = (url) => {
        if (url.length > 60) {
            return url.substring(0, 57) + '...';
        }
        return url;
    };

    const validateURL = (url) => {
        // Regular expression to validate URLs
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlPattern.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous input error state
        setInputError('');

        if (!validateURL(linkToShorten)) {
            setInputError('Please add a valid URL');
            return;
        }

        try {
            const response = await fetch(`${API_END_POINT}shorten?url=${linkToShorten}`);
            const data = await response.json();

            if (data.ok) {
                const newLink = {
                    originalLink: truncateURL(linkToShorten),
                    shortenedLink: data.result.short_link,
                };
                setShortenedLinks([...shortenedLinks, newLink]);
                setLinkToShorten('');
            } else {
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
            <div className='shorten-API-div'>
            <div className='shorten-link-form-container'>

                <form className='shorten-link-form' onSubmit={handleSubmit}>
                <div className='shorten-link-form-grid'>
                    <div className='shorten-link-form-grid-item'>
                    <input
                        className={`shorten-link-input ${inputError ? 'error-input-state' : ''}`}
                        style={{ fontSize: '20px', color: inputError ? 'red' : 'black' }}
                        placeholder='Shorten a link here...'
                        value={linkToShorten}
                        onChange={(e) => setLinkToShorten(e.target.value)}
                        />
                    
                    <button className='shorten-link-form-button' type='submit'>
                        Shorten it!
                    </button>
                    </div>
                    {inputError && <p className='error-message'>{inputError}</p>}
                </div>  
                    
                </form>
                
                </div>

                
                        <div className='section-shortened-link-results'>
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
