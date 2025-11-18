import React from 'react'
import styles from './BreadCrumb.module.css'
import { FaAngleRight } from 'react-icons/fa'

function BreadCrumb({ items = [] }) {
  return (
    <section className ={styles.breadcrumbsection}>
      <div className={styles.wrapper}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <h2>{item}</h2>
            {index < items.length - 1 && <FaAngleRight />}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default BreadCrumb  
