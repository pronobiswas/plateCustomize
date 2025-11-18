'use client'
// %%%%%%%%%%%%%%%%%%%%get started%%%%%%%%%%%%%
import React, { useState } from 'react'
import ShapeCatergory from '../_component/getstarted/shapeCatergory'
import ShapePreview from '../_component/getstarted/shapePreview'
import ShapeTwo from '../_component/getstarted/shapeTwo'
import ShapePreview3 from '../_component/getstarted/ShapePreview3'
import ShapePreview5 from '../_component/getstarted/shapePreview5'
import ShapePreview6 from '../_component/getstarted/shapePreview6'

export default function page() {
  const [previewShape , setPreviewShape] = useState();
  const plateShapes = [
    {
      id:1,
      name:"shape1",
      image:"url/image"
    },
    {
      id:2,
      name:"shape2",
      image:"url/image"
    },
    {
      id:3,
      name:"shape3",
      image:"url/image"
    },
    {
      id:4,
      name:"shape4",
      image:"url/image"
    },
    {
      id:5,
      name:"shape4",
      image:"url/image"
    },
  ]
  const  handleShapePreview =(shape)=>{
    const a= shape;
    setPreviewShape(a.id)
  }
  return (
    <div>
      <main>
        <div className='w-full h-full min-h-[70vh] flex'>

        <section className='w-full md:w-2/6 border-r-2'>
            select your shape
            {/* <ShapeCatergory /> */}
            <ul>
              {
                plateShapes.map((shape, i)=>(
                  <div key={i} onClick={()=>handleShapePreview(shape)}>
                    <div className='w-24 h-fit'>
                      <div className='w-full h-20 bg-red-400'></div>
                      <div className='w-full h-10'>
                        {shape.name}
                      </div>
                    </div>
                  </div>
                ))
              }
            </ul>
        </section>
        <serction className='w-full md:w-4/6'>
            preview your shape
            {
              previewShape===1 && <ShapePreview/>
            }
            {
              previewShape===2 && <ShapeTwo/>
            }
            {
              previewShape===3 && <ShapePreview3/>
            }
            {
              previewShape===4 && <ShapePreview5/>
            }
            {
              previewShape===5 && <ShapePreview6/>
            }

            {/* <ShapePreview/> */}
            {/* <ShapeTwo/> */}
            {/* <ShapePreview3/> */}
            {/* <ShapePreview5/> */}
            {/* <ShapePreview6/> */}
        </serction>
        </div>
      </main>


    </div>
  )
}
