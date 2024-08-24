import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'

const jobList = [1, 2, 3, 4, 5]
export default function Browse() {
  return (
    <div >
      <Navbar />
      <div className='mx-auto max-w-7xl items-center my-10'>
        <h1 className='font-bold text-xl m-4'>Search Results ({jobList.length})</h1>
        <div className='grid grid-cols-3 max-w-7xl gap-4'>
          {
            jobList.map((item, index) => {
              return (
                <Job> </Job>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
