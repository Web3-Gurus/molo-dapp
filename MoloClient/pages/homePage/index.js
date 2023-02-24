import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useApolloClient, gql } from '@apollo/client'
import Video from '../../components/PerVideo'
import { Header } from '../../components/Header'

export default function HomePage() {
  // Creating a state to store the uploaded video
  const [videos, setVideos] = useState([])
  const [search, setSearch] = useState('')

  // Query the videos from the the graph
  const QUERY_VIDEOS = useMemo(
    () => gql`
      query videos(
        $first: Int
        $skip: Int
        $orderBy: Video_orderBy
        $orderDirection: OrderDirection
        $where: Video_filter
      ) {
        videos(
          first: $first
          skip: $skip
          orderBy: $orderBy
          orderDirection: $orderDirection
          where: $where
        ) {
          id
          hash
          title
          thumbnailHash
          description
          author
        }
      }
    `,
    []
  )

  // Get the ApolloClient from the useApolloClient hook
  const ApolloClient = useApolloClient()

  // Function to get the videos from the graph
  const getAllQueriedVideos = useCallback(async () => {
    // Query the videos from the graph
    ApolloClient.query({
      query: QUERY_VIDEOS,
      variables: {
        first: 200,
        skip: 0,
        orderBy: 'createdAt',
        orderDirection: 'desc',
        // NEW: Added where in order to search for videos
        where: {
          ...(search && {
            title_contains_nocase: search,
            category_contains_nocase: search,
          }),
        },
      },
      fetchPolicy: 'network-only',
    })
      .then(({ data }) => {
        // Group videos by owner address
        const ownerGroups = data.videos.reduce((groups, video) => {
          const owner = video.author
          if (!groups[owner]) {
            groups[owner] = []
          }
          groups[owner].push(video)
          return groups
        }, {})

        // Set the videos to the state
        setVideos(ownerGroups)
      })
      .catch((err) => {
        alert('Something went wrong. please try again.!', err.message)
      })
  }, [QUERY_VIDEOS, ApolloClient, search])

  useEffect(() => {
    // Runs the function getAllQueriedVideos when the component is mounted and also if there is a change in the search stae
    getAllQueriedVideos()
  }, [getAllQueriedVideos, search])

  return (
    <>
      <Header
        search={(e) => {
          setSearch(e)
        }}
      />
      <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-[#1a1c1f]'>
        {Object.entries(videos).map(([owner, videos]) => {
          return (
            <div key={owner} className='px-4 pb-5 mx-5'>
              <h2 className='text-white text-lg'>{`Videos by ${owner}`}</h2>
              <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
                {videos.map((video) => {
                  return (
                    <div
                      key={video.id}
                      onClick={() => {
                        // Navigation to the video screen (which we will create later)
                        window.location.href = `/video?id=${video.id}`
                      }}
                      className='overflow-hidden transition-shadow duration-300 bg-transparent rounded'
                    >
                      <Video video={video} />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
