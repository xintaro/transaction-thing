import { Range, Collection, Transaction, SectionTypes } from './types'
import { faker } from '@faker-js/faker'

// Get index range of section to move to
export const getRange = ({ collection, section }: { collection: Collection, section: SectionTypes }): Range => {
  return {
    min: 0,
    max: 10,
  }  
}

export const makeItem = (section: SectionTypes): Transaction => ({
  id: faker.fake(`${faker.random.alpha({count: 3, casing: 'upper'})}${faker.random.numeric(8)}`),
  section,
  type: 'transaction',
  title: faker.commerce.productName(),
  category: faker.commerce.department(),
  amount: faker.commerce.price(100, 1000, 2, '$')
})

export const move = (array: any[], moveIndex: number, toIndex: number) => {
  let item = array[moveIndex];
  let length = array.length;
  let diff = moveIndex - toIndex;

  if (diff > 0) {
    // move left
    return [
    ...array.slice(0, toIndex),
    item,
    ...array.slice(toIndex, moveIndex),
    ...array.slice(moveIndex + 1, length)
    ];
  } else if (diff < 0) {
    // move right
    return [
    ...array.slice(0, moveIndex),
    ...array.slice(moveIndex + 1, toIndex + 1),
    item,
    ...array.slice(toIndex + 1, length)
    ];
  }
  return array;
}

// TODO: Move magic numbers to constant
export const makeSpringConfig = (order: number[], activeIndex: number) => (index: number) => ({
    y: order.indexOf(index) * 90,
    scale: activeIndex === index ? 1.1 : 1,
    zIndex: activeIndex === index ? 1 : 0,
    shadow: activeIndex === index ? 2 : 1,
    immediate: false,
})

export const scaleDown = (order: number[]) => (index: number) => ({
  y: order.indexOf(index) * 90,
  scale: 1,
  shadow: 1,
  immediate: false,
  delay: 150,
})