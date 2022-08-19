import React, { useRef, useState } from 'react'
import { useSprings, animated } from '@react-spring/web'

import { move, makeSpringConfig, makeItem, scaleDown } from './utils'
import { SpringProps, Collection, Item, Transaction } from './types'

import TransactionItem from './ListItem'

import styles from './styles.module.css'

// Using UseSprings
function List() {
  const [items, setItems] = useState<Collection>([makeItem('pay'), makeItem('pay'), makeItem('pay'), makeItem('pay')])
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  
  const [springs, api] = useSprings(items.length, makeSpringConfig(order.current, -1)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  const magic = (whoToGo:number, id: string) => {

    // random for now
    const whereToGo = Math.ceil(Math.random() * 4) - 1

    // arrange items
    const newOrder = move(order.current, order.current.indexOf(whoToGo), whereToGo)

    // animating the new order
    api.start(makeSpringConfig(newOrder, whoToGo))

    // update item data
    const test: Collection = Array.of(...items)
    const indexOfItem = items.findIndex((item) => item.id === id)
    test[indexOfItem] = makeItem('pay')
    setItems(test)

    // scaleDown
    // TODO: Figure out how to chain animations. or use/imitate keyframe animations
    // https://react-spring.dev/components/trail#trail
    // https://react-spring.dev/hooks/use-chain#usechain
    api.start(scaleDown(newOrder))

    // update the ref with the new index orders
    order.current = newOrder
  }

  const addItem = () => {
    const newIndex = Math.max(...order.current) + 1
    const newOrder = order.current.concat([newIndex])
    order.current = newOrder
    const newItems = Array.of(...items).concat(makeItem('pay'));
    setItems(newItems)
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

  return (
    <div className={styles.content} style={{ height: items.length * 200 }}>
      {
        springs.map((
          { zIndex, shadow, y, scale }: SpringProps,
          i: number
        ) => (<animated.div
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to((s:number) => `rgba(0, 0, 0, 0.15) 0px ${s - 1}px ${3 * s}px 0px`),
            y,
            scale,
          }}
          onClick={() => [magic(i, items[i].id)]}
          children={renderItem(items[i])}
        />))
      }
      <button className={styles.addItem} onClick={addItem}>ADD ITEM</button>
    </div>
  )
}

export default List