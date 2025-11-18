// %%%%%%%%%%%%%%%%%%%%get started%%%%%%%%%%%%%

import React from 'react'
import ShapeCatergory from '../_component/getstarted/shapeCatergory'
import ShapePreview from '../_component/getstarted/shapePreview'
import ShapeTwo from '../_component/getstarted/shapeTwo'
import ShapePreview3 from '../_component/getstarted/ShapePreview3'

export default function page() {
  return (
    <div>
      <main>
        <div className='w-full h-full min-h-[70vh] flex'>

        <section className='w-full md:w-2/6 border-r-2'>
            select your shape
            <ShapeCatergory />
        </section>
        <serction className='w-full md:w-4/6'>
            preview your shape
            {/* <ShapePreview/> */}
            {/* <ShapeTwo/> */}
            <ShapePreview3/>
        </serction>
        </div>
      </main>


    </div>
  )
}
