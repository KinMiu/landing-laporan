"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 left-0 md:left-1/4 w-80 h-48 md:w-[500px] md:h-[300px] bg-gradient-to-tr from-blue-400 via-blue-400 to-pink-300 opacity-40 sm:opacity-30 rotate-[-15deg] blur-[60px] md:blur-[100px] rounded-[50%]"></div>
        <div className="absolute top-1/4 right-1/4 w-52 h-52 md:w-96 md:h-96 bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-300 opacity-35 sm:opacity-25 blur-[50px] md:blur-[80px] rotate-[15deg] rounded-[35%]"></div>
        <div className="absolute bottom-10 md:bottom-0 right-1/4 w-60 h-40 md:w-[400px] md:h-[200px] bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400 opacity-35 sm:opacity-30 blur-[60px] md:blur-[120px] rotate-[10deg] rounded-[40%] hidden sm:block"></div>
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="py-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl leading-tight mb-4">
              Selamat Datang di Website Desa Buah Berak
            </h1>
            
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-xl mx-auto">
              Membangun Desa Buah Berak yang mandiri, sejahtera dan berkarakter melalui seluruh kerjasama masyarakat serta pelaksanaan pembangunan yang berkesinambungan demi kesejahteraan bersama.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <button 
              onClick={() => navigate('/tentang')}
              className="rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors">
              Lihat Profil Desa
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}