"use client";

import { motion } from "framer-motion";

export default function WavyFooter() {
    return (
        <div className="fixed bottom-0 left-0 w-full overflow-hidden z-0 pointer-events-none">
            <svg
                className="w-full h-52"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <motion.path
                    fill="#A3D2CA"
                    fillOpacity="0.3"
                    initial={{ d: "M0,160 C480,480 960,-160 1440,160 L1440,320 L0,320 Z" }}
                    animate={{
                        d: [
                            "M0,160 C480,480 960,-160 1440,160 L1440,320 L0,320 Z",
                            "M0,160 C600,320 840,400 1440,160 L1440,320 L0,320 Z",
                            "M0,160 C480,480 960,-160 1440,160 L1440,320 L0,320 Z"
                        ]
                    }}
                    transition={{
                        duration: 25,
                        ease: "easeInOut",
                        repeat: Infinity
                    }}
                />
            </svg>
        </div>
    );
}
