import React from 'react'

export const NameCircle = (props) => {
    return (
        <div className={"name-circle" + ` ${props.size}`}>
            <h2 className="dark-purple-text">{props.initials}</h2>
        </div>
    )
}
