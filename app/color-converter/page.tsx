"use client"

import { useState } from "react"
import { Copy, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6")
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0,
      s = 0,
      l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360
    s /= 100
    l /= 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1 / 3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1 / 3)
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }

  const updateFromHex = (hexValue: string) => {
    if (!/^#[0-9A-F]{6}$/i.test(hexValue)) return

    setHex(hexValue)
    const rgbValue = hexToRgb(hexValue)
    if (rgbValue) {
      setRgb(rgbValue)
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b))
    }
  }

  const updateFromRgb = (r: number, g: number, b: number) => {
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) return

    setRgb({ r, g, b })
    setHex(rgbToHex(r, g, b))
    setHsl(rgbToHsl(r, g, b))
  }

  const updateFromHsl = (h: number, s: number, l: number) => {
    if (h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) return

    setHsl({ h, s, l })
    const rgbValue = hslToRgb(h, s, l)
    setRgb(rgbValue)
    setHex(rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Color Converter</h1>
        <p className="text-gray-600">Convert between HEX, RGB, and HSL color formats</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-32 rounded-lg border-2 border-gray-200" style={{ backgroundColor: hex }} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>HEX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hex Value</label>
                <Input
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  placeholder="#000000"
                  className="font-mono"
                />
              </div>
              <Button onClick={() => copyToClipboard(hex)} variant="outline" size="sm" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy HEX
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>RGB</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Red (0-255)</label>
                <Input
                  type="number"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb(Number.parseInt(e.target.value) || 0, rgb.g, rgb.b)}
                  min="0"
                  max="255"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Green (0-255)</label>
                <Input
                  type="number"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb(rgb.r, Number.parseInt(e.target.value) || 0, rgb.b)}
                  min="0"
                  max="255"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Blue (0-255)</label>
                <Input
                  type="number"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb(rgb.r, rgb.g, Number.parseInt(e.target.value) || 0)}
                  min="0"
                  max="255"
                />
              </div>
              <Button
                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy RGB
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>HSL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hue (0-360)</label>
                <Input
                  type="number"
                  value={hsl.h}
                  onChange={(e) => updateFromHsl(Number.parseInt(e.target.value) || 0, hsl.s, hsl.l)}
                  min="0"
                  max="360"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Saturation (0-100)</label>
                <Input
                  type="number"
                  value={hsl.s}
                  onChange={(e) => updateFromHsl(hsl.h, Number.parseInt(e.target.value) || 0, hsl.l)}
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Lightness (0-100)</label>
                <Input
                  type="number"
                  value={hsl.l}
                  onChange={(e) => updateFromHsl(hsl.h, hsl.s, Number.parseInt(e.target.value) || 0)}
                  min="0"
                  max="100"
                />
              </div>
              <Button
                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy HSL
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Color Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">HEX</div>
                <div className="font-mono text-gray-600">{hex}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">RGB</div>
                <div className="font-mono text-gray-600">
                  rgb({rgb.r}, {rgb.g}, {rgb.b})
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900 mb-1">HSL</div>
                <div className="font-mono text-gray-600">
                  hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
