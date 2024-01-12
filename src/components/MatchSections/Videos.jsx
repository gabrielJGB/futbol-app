import React, { useEffect } from 'react'

const Videos = ({ info }) => {

  useEffect(() => {
    console.log(info.videos)
  }, [])

  return (
    <div className='videos_container'>

      {
        info.videos.map((video, i) => (
          <div key={i} className="video">
            <div className='video-title'>{video.headline}</div>
            <div className="video-description">{video.description}</div>

            <video className='video-tag' controls>
              <source src={video.links.source.full.href} type="video/ogg" />
            </video>
          </div>
        ))
      }


    </div>
  )
}

export default Videos