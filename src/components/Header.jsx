import React, {useEffect, useState} from 'react';
import './Header.css'

export default (({black}) =>{

    return (
        <header className={black ? "black" : false}>
            <div className='header--logo'>
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="logo" />
                </a>
            </div>
            <div className='header--user'>
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="usuário" />
                </a>
            </div>
        </header>
    )
})