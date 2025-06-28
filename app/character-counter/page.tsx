"use client"

import { useState } from "react"
import { Copy, RotateCcw, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CharacterCounter() {
  const [text, setText] = useState("")

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length : 0,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0,
    lines: text ? text.split("\n").length : 0,
  }

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Character Counter</h1>
        <p className="text-gray-600">Count characters, words, sentences, and more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Text Input
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type or paste your text here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={copyText} variant="outline" disabled={!text}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Text
                </Button>
                <Button onClick={clearText} variant="outline" disabled={!text}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Characters</span>
                  <span className="text-xl font-bold text-blue-600">{stats.characters.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Characters (no spaces)</span>
                  <span className="text-xl font-bold text-green-600">{stats.charactersNoSpaces.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-900">Words</span>
                  <span className="text-xl font-bold text-purple-600">{stats.words.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-900">Sentences</span>
                  <span className="text-xl font-bold text-orange-600">{stats.sentences.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                  <span className="font-medium text-pink-900">Paragraphs</span>
                  <span className="text-xl font-bold text-pink-600">{stats.paragraphs.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">Lines</span>
                  <span className="text-xl font-bold text-gray-600">{stats.lines.toLocaleString()}</span>
                </div>
              </div>

              {text && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-2">Reading Time</h4>
                  <p className="text-sm text-gray-600">~{Math.ceil(stats.words / 200)} min read (200 WPM)</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
