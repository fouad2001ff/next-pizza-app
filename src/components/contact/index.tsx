import React from 'react'
import MainHeading from '../main-heading'

function Contact() {
  return (
    <section className='section-gap'>
        <div className='container'>
            <div className='text-center'>
                <MainHeading title={'Contact Us'} subtitle={'Don’t HESETATE'} />
                 <div>
                    <a 
                    className='underline text-accent text-4xl '
                    href="">
                    +2012121212
                    </a>
                 </div>
            </div>
            </div>
    </section>
  )
}

export default Contact