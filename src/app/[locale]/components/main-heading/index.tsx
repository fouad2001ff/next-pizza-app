import React from 'react'

function MainHeading({subtitle , title} : {title: string, subtitle: string}) {
  return (
    <section className='mb-7'>

        <span className='text-accent font-semibold leading-4'>{subtitle}</span>
        <h2  className='text-primary font-bold text-4xl italic'>{title}</h2>

      
    </section>
  )
}

export default MainHeading