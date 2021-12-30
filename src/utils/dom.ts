import { Point } from "./math"

export const getRelativePosition = (element: HTMLElement, target: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const x = targetRect.left - rect.left
  const y = targetRect.top - rect.top
  return { x, y }
}

export const isPointWithin = (element: HTMLElement, point: Point) => {
  const rect = element.getBoundingClientRect()
  return (
    point.x >= rect.left &&
    point.y >= rect.top &&
    point.x <= rect.right &&
    point.y <= rect.bottom
  )
}
