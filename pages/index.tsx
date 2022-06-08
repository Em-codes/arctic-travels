import type { NextPage } from 'next'
import Head from 'next/head'
import BookingPanel from '../components/BookingPanel'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Map from '../components/Map'
import Marquee from '../components/Marquee'
import Passes from '../components/Passes'
import Resorts from '../components/Resorts'
import Slides from '../components/Slides'
import { motion } from 'framer-motion'


const Home: NextPage = () => {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }

  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion 
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }} // Set the transition to linear
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <BookingPanel />
      <Marquee />
      <Map />
      <Slides />
      <Resorts />
      <Passes />
      <Footer />
    </motion.main>
  )
}

export default Home
