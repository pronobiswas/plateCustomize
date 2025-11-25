// getstarted
'use client'
import React, { useState } from 'react'
import Image from "next/image";
import Link from 'next/link';

export default function page() {
    const [previewImage, setPreviewImage] = useState('');
    const allShapes = [
        {
            id: 1,
            name: 'Square',
            img: '/Square.png',
            previewImage: '/Square.png'
        },
        {
            id: 2,
            name: 'ushape',
            img: '/ushape.png',
            previewImage: '/Square.png'
        },
        {
            id: 3,
            name: 'reactangle',
            img: '/reactangle.png',
            previewImage: '/Square.png'
        },
        {
            id: 4,
            name: 'ractangle with rounded corner',
            img: '/ractangle_with_rounded_corner.png',
            previewImage: '/Square.png'
        },
        {
            id: 5,
            name: 'Square',
            img: '/Square.png',
            previewImage: '/Square.png'
        },
        {
            id: 6,
            name: 'Square',
            img: '/Square.png',
            previewImage: '/Square.png'
        },
    ]
    const handleShapeClick = (item) => {
        setPreviewImage(item.img)
    }
    return (
        <>
            <main className='flex '>
                <aside className='w-1/3 min-h-screen border-r-2'>
                    {/* ----shape list wrapper---- */}
                    <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-5'>
                        {allShapes.map((shape, i) => (
                            <div
                                key={shape.id}
                                className='aspect-[240/280] flex flex-col items-center border border-gray-400 rounded-lg overflow-hidden group hover:border-red-400 cursor-pointer'
                                onClick={() => handleShapeClick(shape)}
                            >
                                <div className='w-full h-fit'>
                                    <Image
                                        src={shape.img}
                                        alt="My Image"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <p className='w-full text-center py-2 bg-gray-300 rounded-b-lg group-hover:bg-red-400'>{shape.name}</p>
                            </div>
                        ))}
                    </div>
                </aside>
                <div className='w-2/3 h-screen border-amber-500'>
                    {/* ---content wrapper--- */}
                    <div className='w-full h-full'>
                        {/* ===image_preview_wrapper==== */}
                        <div className='w-full h-[100vh - 100px] flex justify-center p-12 '>
                            {/* ===preview box=== */}
                            <div className='w-full aspect-[1/1] max-w-3xl max-h-3xl flex flex-col items-center justify-center'>
                                <div className='w-full'>
                                    {
                                        previewImage &&
                                        <Image
                                            src={previewImage}
                                            alt="My Image"
                                            width={400}
                                            height={420}
                                            className='w-full h-full'
                                        />
                                    }
                                </div>
                                {
                                    previewImage &&
                                    <div className='w-full flex justify-end'>
                                        <Link href="/previewandsummary">
                                            <button
                                                className='px-12 py-4 bg-black text-white'
                                            >Next
                                            </button>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
