import { findLargestRectangle } from '.'

const map1 = [
  [0, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0],
]

const point1 = [4, 2] as [number, number]

const largestRectangle = findLargestRectangle(map1, point1)

console.log('>>> Largest rectangle:', largestRectangle)
