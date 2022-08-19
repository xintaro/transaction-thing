import React from 'react'
import { Transaction } from './types'
import logo from './images/cereal.png'
import styles from './styles.module.css'

function TransactionItem({ item, removeItem }: { item: Transaction, removeItem?: (id:string) => void}) {
  return (
    <div className={styles.transaction}>
      <img className={styles.avatar} src={logo} />
      <div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.category}>{item.category}</div>
      </div>
      <div className={styles.amount}>{item.amount}</div>
      {
        removeItem ? (
          <button className={styles.void} onClick={(event) => { event.stopPropagation(); removeItem(item.id)}}>VOID</button>
        ) : null
      }
    </div>
  )
}

export default TransactionItem