"use client";

import Loader from "./Loader";

export default function LoadingScreen() {
    return (
        <div className="flex justify-center items-center h-screen bg-[#F6F9FC]">
            <Loader />
        </div>
    );
}
