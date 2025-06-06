import { colorFor } from "./drawing.js"

/** Fundamental sprite class. */
export class Bitmap {

  static fromString(colors: number[], pstr: string) {
    const lines = pstr.trim().split('\n').map(s => s.split(' ').map(s => parseInt(s, 16)))
    const pixels = lines.flatMap(c => c)
    return new Bitmap(colors, lines[0].length, pixels)
  }

  width: number
  height: number

  private original
  /** @deprecated */
  canvas
  private ctx

  private colors
  pixels

  private lastcol?: number

  constructor(colors: number[], w: number, pixels: number[]) {
    this.colors = colors
    this.pixels = pixels

    const h = pixels.length / w

    this.width = w
    this.height = h

    const canvas = new OffscreenCanvas(w, h)
    const ctx = canvas.getContext('2d')!

    this.canvas = canvas
    this.ctx = ctx

    let i = 0
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const ci = pixels[i++]
        if (ci > 0) {
          ctx.fillStyle = colorFor(colors[ci - 1])
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }

    this.original = new OffscreenCanvas(w, h)
    this.original.getContext('2d')!.drawImage(canvas, 0, 0)
  }

  toJsln() {
    const colors = this.colors.map(c => () => '0x' + c.toString(16).padStart(8, '0'))
    let lines: string[] = []
    let i = 0
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const index = this.pixels[i++]
        const space = x === this.width - 1 ? '\n' : ' '
        lines.push(index.toString(16), space)
      }
    }
    return { colors, pixels: lines.join('') }
  }

  /** Note: this mutates the existing bitmap. */
  colorize(col: number) {
    if (this.lastcol === col) return
    this.lastcol = col

    this.ctx.globalCompositeOperation = 'source-over'
    this.ctx.drawImage(this.original, 0, 0)

    this.ctx.globalCompositeOperation = 'source-in'
    this.ctx.fillStyle = colorFor(col)
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

}
