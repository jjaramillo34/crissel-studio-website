'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
// Use public folder path for static image
const logoImage = '/assets/images/logo_photo.png'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="relative mb-6">
          <Image 
            src={logoImage} 
            alt="Crissel Studio Logo" 
            width={128}
            height={128}
            className="w-32 h-32 mx-auto object-contain"
          />
        </div>
        <h1 className="text-5xl font-bold text-[#E57373] mb-2">Crissel Studio</h1>
        <p className="text-lg text-gray-600 mb-4">¡Realza el poder de tu mirada!</p>
        <div className="w-16 h-1 bg-gradient-to-r from-[#E57373] to-[#F8BBD9] mx-auto rounded-full animate-pulse" />
      </motion.div>
    </div>
  )
}

