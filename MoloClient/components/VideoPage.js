import React from 'react'
import VideoPlayer from './VideoPlayer'

export default function VideoPage({ video }) {

  return (
    <div>
      <VideoPlayer hash={video.hash} />
      <div className='flex justify-between flex-row py-4'>
        <div className='pl-4'>
          <p className='text-gray-500 mt-1 font-light'>
            <strong>Video Hash:</strong>{' '} {`${video.hash.slice(0, 4)}...${video.hash.slice(38)}`}
          </p>
          <h3 className='text-2xl dark:text-white'>{video.title}</h3>
          <p className='text-gray-500 mt-1'>
          <strong>Description:</strong>{' '} {video.description} •
          </p>

        </div>
      </div>
    </div>
  )
}
