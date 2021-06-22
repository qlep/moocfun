import React from 'react'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fonSize: 16
    }

    return (
        <div style = {footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, Gleb Tishchenko 2021</em>
        </div>
    )
}

export default Footer