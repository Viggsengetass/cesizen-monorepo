'use client'

import { motion } from 'framer-motion'
import { Ghost, Leaf } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F9FC] px-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-4"
            >
                <Leaf size={64} strokeWidth={1.5} className="text-[#A8D5BA] mb-4 animate-bounce" />
                <h1 className="text-6xl font-bold text-[#2E2E2E]">404</h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-md"
            >
                <p className="text-2xl font-semibold text-[#2E2E2E] mb-2">
                    Respire... cette page n’existe pas 🌬️
                </p>
                <p className="text-base text-[#2E2E2E] mb-6">
                    Tu t’es peut-être égaré·e en pleine sérénité.
                    <br />
                    Pas de panique, recentre-toi et retourne à l’accueil 🍃
                </p>

                <a href="/" className="btn-primary">
                    Revenir à l’accueil zen
                </a>
            </motion.div>
        </div>
    )
}
