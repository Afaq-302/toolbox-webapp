"use client"

import { useState } from "react"
import { ArrowUpDown, Copy, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Base64Converter() {
  const [plainText, setPlainText] = useState("")
  const [base64Text, setBase64Text] = useState("")

  const encodeToBase64 = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(plainText)))
      setBase64Text(encoded)
    } catch (error) {
      console.error("Encoding error:", error)
    }
  }

  const decodeFromBase64 = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(base64Text)))
      setPlainText(decoded)
    } catch (error) {
      console.error("Decoding error:", error)
      setPlainText("Invalid Base64 string")
    }
  }

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const clearAll = () => {
    setPlainText("")
    setBase64Text("")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Base64 Encoder/Decoder</h1>
        <p className="text-gray-600">Encode and decode Base64 strings</p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5" />
            Base64 Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="encode" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Plain Text</label>
                  <Textarea
                    placeholder="Enter text to encode..."
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={encodeToBase64} disabled={!plainText.trim()}>
                      Encode to Base64
                    </Button>
                    <Button onClick={() => copyText(plainText)} variant="outline" disabled={!plainText.trim()}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Base64 Output</label>
                  <Textarea
                    placeholder="Base64 encoded text will appear here..."
                    value={base64Text}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-gray-50"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => copyText(base64Text)} variant="outline" disabled={!base64Text}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Base64
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base64 Input</label>
                  <Textarea
                    placeholder="Enter Base64 string to decode..."
                    value={base64Text}
                    onChange={(e) => setBase64Text(e.target.value)}
                    className="min-h-[200px] font-mono text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={decodeFromBase64} disabled={!base64Text.trim()}>
                      Decode from Base64
                    </Button>
                    <Button onClick={() => copyText(base64Text)} variant="outline" disabled={!base64Text.trim()}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Decoded Text</label>
                  <Textarea
                    placeholder="Decoded text will appear here..."
                    value={plainText}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-gray-50"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => copyText(plainText)} variant="outline" disabled={!plainText}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Text
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-6">
            <Button onClick={clearAll} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>About Base64</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">What is Base64?</h4>
              <p className="text-gray-600 leading-relaxed">
                Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's
                commonly used to encode data that needs to be stored and transferred over media designed to deal with
                text.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Common Uses</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Email attachments (MIME)</li>
                <li>• Data URLs in web development</li>
                <li>• API authentication tokens</li>
                <li>• Storing binary data in JSON/XML</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
