import React from 'react'

const Comments = ({ commentary }) => {
    return (
        <div className='commentary_container'>
            {
                commentary?.map((comment, i) => (
                    <div key={i} className="comment_box">
                        <div className="minute"> {comment.time.displayValue} </div>
                        <div className='comment'> {comment.text} </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Comments
