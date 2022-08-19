import React, { useRef, useState } from 'react'
import { animated, useTransition } from '@react-spring/web'

import { move, makeSpringConfig, makeItem, scaleDown } from './utils'
import { SpringProps, Collection, Item, Transaction } from './types'

import TransactionItem from './ListItem'

import styles from './styles.module.css'

// Using useSpring and useChain
function ListV2() {
  const [items, setItems] = useState<Collection>([makeItem('pay'), makeItem('pay'), makeItem('pay'), makeItem('pay')])

  let Y = 0
  const transitions = useTransition(
    items.map(item => ({ ...item, y: (Y += 90) - 90 })),
    {
      key: (item: Item) => item.id,
      from: { scale: 1, opacity: 0 },
      leave: { scale: 0, opacity: 0 },
      enter: ({ y }) => ({ y, opacity: 1 }),
      // figure out lifecycle/keyframes for scaling up and down
      update: ({ y }) => ({ y }),
    }
  )

  const addItem = () => {
    setItems(Array.of(...items).concat(makeItem('pay')))
  }

  const removeItem = (id: string) => {
    const tempItems = Array.of(...items)

    tempItems.splice(tempItems.findIndex((item) => item.id === id), 1)

    setItems(tempItems)
  }

  const renderItem = (item: Item) => {
    if(item.type === 'transaction') {
      return <TransactionItem item={item as Transaction} removeItem={removeItem} />
    }

    // TODO: add section labels
    return 'label'
  }

  const magic = (whoToGo:number, id: string) => {

    // random for now
    const whereToGo = Math.ceil(Math.random() * items.length) - 1

    const newItems = Array.of(...items);
    // arrange items
    const newItemOrder = move(newItems, newItems.findIndex((item) => item.id === id), whereToGo)
    setItems(newItemOrder)
  }

  return (
    <div className={styles.content}>
      {
        transitions((style, item, t, index) => (
          <animated.div
            className={styles.item}
            style={style}
            onClick={() => [magic(index, items[index].id)]}
          >
            {
              renderItem(item)
            }
          </animated.div>
        ))
      }
      <button className={styles.addItem} onClick={addItem}>ADD ITEM</button>
    </div>

  )
}

export default ListV2