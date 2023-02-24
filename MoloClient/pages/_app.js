import { ApolloProvider } from '@apollo/client'
import client from '../constants/graphQLClient'
import '../styles/globals.css'
// import { LivepeerConfig } from '@livepeer/react'
// import LivePeerClient from '../livepeer'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-[#1a1c1f]'>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </div>
  )
}

export default MyApp
