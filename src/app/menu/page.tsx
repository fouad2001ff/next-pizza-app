import Menu from '@/components/menu'
import { getProductsByCategory } from '@/server/db/product'
import React from 'react'

const MenuPage = async () => {
  const categories = await getProductsByCategory() 
  return (
    <main>
      {categories.map ((category) => {
        return (
          <section key={category.id} className='section-gap'>
            <div className="container text-center">
            <h2 className='text-primary italic font-bold text-4xl mb-9'>{category.name}</h2>
            <Menu items={category.products} />
            </div>
          </section>
        )
      })}
    </main>
  )
}

export default MenuPage