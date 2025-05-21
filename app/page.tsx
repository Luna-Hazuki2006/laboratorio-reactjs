"use client";

// import Image from "next/image";
import Header from "@components/header";
import Mongo from "@lib/mongodb";
import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        async function ver() {
            await Mongo()
        }
        ver()
    }, [])

    return (
        <div>
            <Header></Header>
        </div>
    );
}
