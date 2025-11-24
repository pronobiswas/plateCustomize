// getstarted
'use client'
import React, { useState } from 'react'
import Image from "next/image";

export default function page() {
    const [previewImage , setPreviewImage] = useState('');
    const allShapes = [
        {
            id: 1,
            name: 'Square',
            img: '/Square.png'
        },
        {
            id: 2,
            name: 'ushape',
            img: '/ushape.png'
        },
        {
            id: 3,
            name: 'reactangle',
            img: '/reactangle.png'
        },
        {
            id: 4,
            name: 'ractangle with rounded corner',
            img: '/ractangle_with_rounded_corner.png'
        },
        {
            id: 5,
            name: 'Square',
            img: '/Square.png'
        },
        {
            id: 6,
            name: 'Square',
            img: '/Square.png'
        },
    ]
    const handleShapeClick = (item)=>{
        console.log("clicked",item);
        setPreviewImage(item.img)
    }
    return (
        <>
            <main className='flex '>
                <aside className='w-1/4 min-h-screen border-r-2'>
                    {/* ----shape list wrapper---- */}
                    <div className='w-full flex flex-col items-center justify-center gap-8 p-5'>
                        {allShapes.map((shape, i) => (
                            <div 
                            key={shape.id}
                            className='aspect-[240/280] flex flex-col items-center border'
                            onClick={()=>handleShapeClick(shape)}
                            >
                                <div className='w-full h-fit'>
                                    <Image
                                        src={shape.img}
                                        alt="My Image"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <p>{shape.name}</p>
                            </div>
                        ))}
                    </div>
                </aside>
                <div className='w-3/4 h-screen border-amber-500'>
                {/* ---content wrapper--- */}
                <div className='w-full h-full '>
                    {/* ===image_preview_wrapper==== */}
                    <div className=' aspect-[1/1] max-w-3xl max-h-3xl border-2 border-green-600 flex items-center justify-center'>
                        <div className='image_preview flex flex-col'>
                            {
                                previewImage?
                                <Image src={previewImage} alt="My Image" width={300} height={300} className='border'/>
                                :
                                <p>select ashape</p>
                            }
                        </div>
                    </div>
                </div>
                </div>
            </main>
        </>
    )
}
