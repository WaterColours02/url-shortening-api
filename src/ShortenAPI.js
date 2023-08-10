import React, { useState, useEffect } from 'react';



export default function ShortenAPI() {
 
    const [shortenedLink, setShortenedLink] = useState('');
    const [linkToShorten, setLinkToShorten] = useState('');


    const handleChange = (e) => {}



    const apiKey = 'YOUR_API_KEY';
    const urlToShorten = 'https://www.example.com/your-long-url';
    const apiEndpoint = 'https://api.example.com/shorten'; // Replace with actual API endpoint
    
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };
    
    const requestData = {
      url: urlToShorten,
    };
    
    fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        const shortenedUrl = data.short_link;
        console.log('Shortened URL:', shortenedUrl);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    



    return(
 
       





    <div className='shorten-link-form-container'>
      <form className='shorten-link-form'> 
        <input className='shorten-link-input' placeholder='Shorten a link here...'></input>
        <button className='shorten-link-form-button'>Shorten it !</button>
        <p className='shorten-link-alert-text'></p>
      </form>
    </div>

    )

} 

