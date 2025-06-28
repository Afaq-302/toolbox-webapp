"use client"

import { useState } from "react"
import { Copy, RotateCcw, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TextCaseConverter() {
  const [text, setText] = useState("")

  const conversions = {
    uppercase: text.toUpperCase(),
    lowercase: text.toLowerCase(),
    titleCase: text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
    camelCase: text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
      .replace(/\s+/g, ""),
    pascalCase: text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, ""),
    snakeCase: text.toLowerCase().replace(/\s+/g, "_"),
    kebabCase: text.toLowerCase().replace(/\s+/g, "-"),
    sentenceCase: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
  }

  const copyText = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const clearText = () => {
    setText("")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Text Case Converter</h1>
        <p className="text-gray-600">Convert text between different cases and formats</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
              Input Text
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="flex gap-2">
              <Button onClick={clearText} variant="outline" disabled={!text}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {text && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(conversions).map(([type, convertedText]) => (
              <Card key={type}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg capitalize">{type.replace(/([A-Z])/g, " $1").trim()}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg min-h-[80px] font-mono text-sm break-all">
                    {convertedText || "No conversion available"}
                  </div>
                  <Button
                    onClick={() => copyText(convertedText)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={!convertedText}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
