import React, {  useEffect, useState } from 'react'
import { Router, useRouter } from 'next/router'
// import Link from 'next/link'
// import { CustomButton } from '../components';

function Landing() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if wallet is connected
    // ...
    if (isConnected) {
      setIsConnected(true);
    }
  }, [isConnected])

  const router = useRouter()
  // Creating a function to connect user's wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      // Checking if user have Metamask installed
      if (!ethereum) {
        // If user doesn't have Metamask installed, throw an error
        alert('Please install MetaMask')
        return
      }

      // If user has Metamask installed, connect to the user's wallet
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      // At last save the user's wallet address in browser's local storage
      localStorage.setItem('walletAddress', accounts[0])

      setIsConnected(true);

      // if connected, direct user to the home page
      router.push('/home')

      // catch errors if any
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      {/* Creating a hero component with black background and centering everything in the screen */}
      <section className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full '>
          <img
            className='w-full h-full object-cover brightness-100'
            src='https://source.unsplash.com/1600x900/?office-meetings'
            alt=''
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 '>
            <div className='text-center py-12 px-12 md:pb-16 bg-black/95 opacity-95  rounded-tr-full rounded-bl-full shadow-2xl shadow-purple-700/100 border-4 border-indigo-500/100'>
              <h1
                className='text-5xl  bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 md:text-6xl font-extrabold leading-tighter mb-4 tracking-wide'
                data-aos='zoom-y-out'
              >
                <span className='bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                  Molo{' '}
                </span>
              </h1>
              <div className='max-w-3xl mx-auto px-20'>
                <p
                  className='text-md hidden lg:block text-white mb-8 tracking-wide italic'
                  data-aos='zoom-y-out'
                  data-aos-delay='150'
                >
                  A decentralized Video sharing dApp.
                </p>
                
                <button
                  className='items-center text-[#F7F7F7] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg  font-medium  p-4 mt-8 shadow-lg shadow-purple-500/50'
                  onClick={connectWallet}
                >
                  {isConnected ? <span>Browse Videos</span> : <span>Connect wallet</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing
