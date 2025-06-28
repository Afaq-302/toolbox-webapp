"use client"

import { useState } from "react"
import { QrCode, Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QRGenerator() {
  const [text, setText] = useState("")
  const [size, setSize] = useState("200")
  const [qrUrl, setQrUrl] = useState("")

  const generateQR = () => {
    if (!text.trim()) return

    // Using QR Server API for QR code generation
    const encodedText = encodeURIComponent(text)
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`
    setQrUrl(url)
  }

  const downloadQR = () => {
    if (!qrUrl) return

    const link = document.createElement("a")
    link.href = qrUrl
    link.download = "qrcode.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">QR Code Generator</h1>
        <p className="text-gray-600">Generate QR codes for text, URLs, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Text or URL</label>
              <Textarea
                placeholder="Enter text, URL, or any data to encode..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">150x150 px</SelectItem>
                  <SelectItem value="200">200x200 px</SelectItem>
                  <SelectItem value="300">300x300 px</SelectItem>
                  <SelectItem value="400">400x400 px</SelectItem>
                  <SelectItem value="500">500x500 px</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateQR} className="flex-1" disabled={!text.trim()}>
                Generate QR Code
              </Button>
              <Button onClick={copyText} variant="outline" disabled={!text.trim()}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrUrl ? (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <img
                    src={qrUrl || "/placeholder.svg"}
                    alt="Generated QR Code"
                    className="border rounded-lg shadow-sm"
                  />
                </div>
                <Button onClick={downloadQR} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Enter text and click "Generate QR Code" to create your QR code</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Website URLs</h4>
              <p className="text-blue-700">Share website links easily</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-1">Contact Info</h4>
              <p className="text-green-700">vCard or contact details</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">WiFi Passwords</h4>
              <p className="text-purple-700">Quick WiFi access</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-1">Text Messages</h4>
              <p className="text-orange-700">Any text or data</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
