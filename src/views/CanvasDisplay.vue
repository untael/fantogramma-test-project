<template>
  <div class="canvas-display">
    <router-link
      :to="{path: '/'}"
    >
      <el-button type="primary" plain>Домой</el-button>
    </router-link>

    <canvas
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      ref="canvasImg"
      height="500px"
      width="500px"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import axios from 'axios'
import Rectangle from '../classes/Rectangle/Rectangle'

@Component
export default class Canvas extends Vue {
  reader: FileReader = new FileReader()
  imgBlob: any
  image: HTMLImageElement = new Image()
  mousePressed = false
  cursorInRect = false
  rect: Rectangle = new Rectangle({ x: 225, y: 225, width: 50, height: 50 })
  mouseCoords: any = {
    x: 0,
    y: 0
  }

  get canvasContext (): CanvasRenderingContext2D {
    const canvas = this.$refs.canvasImg as HTMLCanvasElement
    return canvas.getContext('2d') as CanvasRenderingContext2D
  }

  onMouseMove (value: MouseEvent): void {
    if (this.mousePressed && this.cursorInRect) {
      const canvas = this.$refs.canvasImg as HTMLCanvasElement
      this.mouseCoords.x = value.pageX - canvas.offsetLeft
      this.mouseCoords.y = value.pageY - canvas.offsetTop
      const move = () => {
        this.canvasContext.clearRect(0, 0, 500, 500)
        this.canvasContext.drawImage(this.image, 0, 0)
        this.rect.draw(this.canvasContext, this.mouseCoords.x, this.mouseCoords.y)
      }
      requestAnimationFrame(move)
    }
  }

  onMouseUp (): void {
    this.mousePressed = false
    setTimeout(() => {
      this.canvasContext.drawImage(this.image, 0, 0)
      this.rect.draw(this.canvasContext)
    }, 50)
    this.cursorInRect = false
  }

  onMouseDown (value: MouseEvent): void {
    this.mousePressed = true
    const canvas = this.$refs.canvasImg as HTMLCanvasElement
    this.mouseCoords.x = value.pageX - canvas.offsetLeft
    this.mouseCoords.y = value.pageY - canvas.offsetTop

    this.cursorInRect =
      this.mouseCoords.x <= 275 &&
      this.mouseCoords.x >= 225 &&
      this.mouseCoords.y <= 275 &&
      this.mouseCoords.y >= 225

    this.rect.x = this.mouseCoords.x - 225
    this.rect.y = this.mouseCoords.y - 225
  }

  fillCanvas (): void {
    this.reader.readAsDataURL(this.imgBlob.data)
    this.reader.onloadend = () => {
      this.image.onload = () => {
        this.canvasContext.drawImage(this.image, 0, 0)
        this.rect.draw(this.canvasContext)
      }
      if (typeof (this.reader.result) === 'string') {
        this.image.src = this.reader.result
      }
    }
  }

  async getImage (): Promise<any> {
    return await axios.get('http://fantogramma.org/test.png', { responseType: 'blob' })
  }

  async mounted () {
    this.imgBlob = await this.getImage()
    this.fillCanvas()
  }
}
</script>

<style lang="scss">
.canvas-display {
  display: flex;
  flex-direction: column;
  align-items: center;

  canvas {
    border: 1px solid red;
    margin: 20px;
  }
}
</style>
