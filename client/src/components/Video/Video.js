import React from 'react'
import './video.css'
const Video = ({ dimention, Video, muted }) => {



    return (
        <>
            <video
                ref={Video}
                muted={muted}
                autoPlay
                style={{
                    height: dimention.chHeight,
                    width: dimention.chWidth,
                    margin: dimention.chMargin
                }} />
        </>
    )
}

export default Video
