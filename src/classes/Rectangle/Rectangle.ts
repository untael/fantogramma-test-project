export default class Rectangle {
  x = 0
  y = 0
  width = 0
  height = 0

  draw (context: CanvasRenderingContext2D, mouseX?: number, mouseY?: number) {
    context.beginPath()
    if (mouseX && mouseY) {
      context.fillStyle = 'rgba(0, 0, 255, 0.5)'
      context.fillRect(mouseX - this.x, mouseY - this.y, 50, 50)
    } else {
      context.fillStyle = 'rgba(0, 255, 0, 0.5)'
      context.fillRect(225, 225, 50, 50)
    }
    context.stroke()
  }

  constructor (data: Partial<Rectangle>) {
    Object.assign(this, data)
  }
}
