import React from 'react'

export default function CourseList(props) {

    const generateCourses = () => {
        
    }
    return (
        <div>
            <h3 className="dark-purple-text">{props.headerText}</h3>
            <ul className="course-list scrollable">
                {generateCourses()}
            </ul>
        </div>
    )
}
