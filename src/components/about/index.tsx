import React from 'react'
import MainHeading from '../main-heading'

function About() {
  return (
    <section className='section-gap' >
        <div className="text-center">
            <MainHeading title='About Us' subtitle= 'Our Story' />
            <div className="mx-auto p-3  space-y-4 text-accent max-w-lg">
            <p>
          Welcome to <strong>Pizza Haven</strong>, where passion meets flavor! We are more than just a pizza place – we are a family-owned restaurant dedicated to crafting the finest pizzas using the freshest ingredients and time-honored recipes.
        </p>

        <p>
          It all started in <strong>2010</strong> with a simple dream: to bring authentic, mouthwatering pizzas to our community. Inspired by the rich traditions of <strong>Italian cuisine</strong>, we’ve spent years perfecting our craft, ensuring every bite is a celebration of flavor and quality.
        </p>
        <p>
          At <strong>Pizza Haven</strong>, we believe that great pizza starts with great ingredients. That’s why we source only the finest, locally-sourced produce, premium meats, and artisanal cheeses. Every pizza is handcrafted with care, from our homemade dough to our signature sauces.
        </p>

            </div>
        </div>

    </section>
  )
}

export default About