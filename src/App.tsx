import React from 'react'
import List from './List'
import ListV2 from './ListV2'

import styles from './styles.module.css'

export default function App() {

  return (
    <div className={styles.container}>
      <List />
      <ListV2 />
    </div>
  )
}