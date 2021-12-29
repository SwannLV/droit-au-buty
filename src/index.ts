/*
Sample map:
[
  [0, 1, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 1, 0],
]

In this program, think like this:
y:0,x:0
             UP
        LEFT <> RIGHT
            DOWN
                      y:max,x:max
*/

type Map = number[][]

type Point = [y: number, x: number]

type Rectangle = [Point, Point]

export function findLargestRectangle(map: Map, centralPoint: Point): Rectangle | null {
  console.log('Point:', centralPoint)
  console.log('Rectangle:')
  map.forEach((row) => console.log(row))

  // If the point touches the border of the map: return null
  const [y, x] = centralPoint
  if (y === 0 || y >= map.length - 1 || x === 0 || x >= map[0].length - 1) {
    console.log('The point touches the border or is outside the map...')
    return null
  }

  const allRectangles: Rectangle[] = []

  goUpFromCentralPoint(allRectangles, map, centralPoint)

  console.log('allRectangles:', allRectangles)

  const largestRectangle = getRectangleWithMaxArea(allRectangles)
  return largestRectangle
}

function goUpFromCentralPoint(allRectangles: Rectangle[], map: Map, centralPoint: Point) {
  const [yCentralPoint, xCentralPoint] = centralPoint

  for (let y = yCentralPoint - 1; y >= 0; y--) {
    const value = map[y][xCentralPoint]
    const isOne = !!value
    console.log('1:UP-FROM-CENTER', 'y:', y, 'x:', xCentralPoint)

    if (isOne) {
      goRight(allRectangles, map, centralPoint, y)
    }
  }
}

function goRight(allRectangles: Rectangle[], map: Map, centralPoint: Point, topY: number) {
  const [yCentralPoint, xCentralPoint] = centralPoint

  for (let x = xCentralPoint + 1; x < map[0].length; x++) {
    const value = map[topY][x]
    const isOne = !!value
    console.log(' 2:RIGHT', 'y:', topY, 'x:', x)

    // Si la ligne de 1 s'arrête, on s'arrête
    if (!isOne) {
      break
    }

    goDown(allRectangles, map, centralPoint, topY, x)
  }
}

function goDown(allRectangles: Rectangle[], map: Map, centralPoint: Point, topY: number, rightX: number) {
  const [yCentralPoint, xCentralPoint] = centralPoint

  for (let y = topY + 1; y < map.length; y++) {
    const value = map[y][rightX]
    const isOne = !!value
    console.log('  3:DOWN', 'y:', y, 'x:', rightX)

    // Si la colonne de 1 s'arrête, on s'arrête
    if (!isOne) {
      break
    }

    if (y > yCentralPoint) {
      goLeft(allRectangles, map, centralPoint, topY, rightX, y)
    }
  }
}

function goLeft(
  allRectangles: Rectangle[],
  map: Map,
  centralPoint: Point,
  topY: number,
  rightX: number,
  bottomY: number,
) {
  const [yCentralPoint, xCentralPoint] = centralPoint

  for (let x = rightX - 1; x >= 0; x--) {
    const value = map[bottomY][x]
    const isOne = !!value
    console.log('   4:LEFT', 'y:', bottomY, 'x:', x)

    // Si la ligne de 1 s'arrête, on s'arrête
    if (!isOne) {
      break
    }

    if (x < xCentralPoint) {
      goUpAndRightToTheEnd(allRectangles, map, centralPoint, topY, rightX, bottomY, x)
    }
  }
}

function goUpAndRightToTheEnd(
  allRectangles: Rectangle[],
  map: Map,
  centralPoint: Point,
  topY: number,
  rightX: number,
  bottomY: number,
  xLeft: number,
) {
  const [yCentralPoint, xCentralPoint] = centralPoint

  for (let y = bottomY - 1; y >= 0; y--) {
    const value = map[y][xLeft]
    const isOne = !!value
    let breakGoingUp = false
    console.log('     5:UP', 'y:', y, 'x:', xLeft)

    // Si la colonne de 1 s'arrête, on s'arrête
    if (!isOne) {
      breakGoingUp = true
    }
    if (breakGoingUp) {
      break
    }

    if (y === topY) {
      for (let x = xLeft + 1; x <= xCentralPoint; x++) {
        const value = map[topY][x]
        const isOne = !!value
        console.log('      6:RIGHT', 'y:', topY, 'x:', x)

        // Si la ligne de 1 s'arrête, on s'arrête
        if (!isOne) {
          breakGoingUp = true
          break
        }

        if (x === xCentralPoint) {
          // THIS IS A RECTANGLE OF ONES !
          const rectangle: Rectangle = [
            [topY, xLeft],
            [bottomY, rightX],
          ]
          allRectangles.push(rectangle)
          console.log('       7:VALID RECTANGLE:', rectangle)
        }
      }
    }
  }
}

function getRectangleWithMaxArea(allRectangles: Rectangle[]): Rectangle | null {
  let maxRectangle: Rectangle | null = null
  let maxArea = 0

  allRectangles.forEach((rectangle) => {
    const [[y1, x1], [y2, x2]] = rectangle
    const area = (y2 - y1) * (x2 - x1)

    if (area > maxArea) {
      maxArea = area
      maxRectangle = rectangle
    }
  })

  return maxRectangle
}
