export const getRelativePosition = (element: HTMLElement, target: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const x = targetRect.left - rect.left
  const y = targetRect.top - rect.top
  return { x, y }
}
