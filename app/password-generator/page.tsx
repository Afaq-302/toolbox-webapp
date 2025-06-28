"use client"

import { useState } from "react"
import { Copy, RefreshCw, Key, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState([12])
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  })
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = ""
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (options.numbers) charset += "0123456789"
    if (options.symbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?"

    if (!charset) return

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    setPassword(result)
    setCopied(false)
  }

  const copyPassword = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy password:", err)
    }
  }

  const getStrengthColor = () => {
    if (length[0] < 8) return "bg-red-500"
    if (length[0] < 12) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (length[0] < 8) return "Weak"
    if (length[0] < 12) return "Medium"
    return "Strong"
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Password Generator</h1>
        <p className="text-gray-600">Generate secure passwords with customizable options</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Password Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Password Length: {length[0]}</label>
            <Slider value={length} onValueChange={setLength} max={50} min={4} step={1} className="w-full" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>4</span>
              <span>50</span>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Character Types</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={options.uppercase}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, uppercase: checked as boolean }))}
                />
                <label htmlFor="uppercase" className="text-sm">
                  Uppercase Letters (A-Z)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={options.lowercase}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, lowercase: checked as boolean }))}
                />
                <label htmlFor="lowercase" className="text-sm">
                  Lowercase Letters (a-z)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={options.numbers}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, numbers: checked as boolean }))}
                />
                <label htmlFor="numbers" className="text-sm">
                  Numbers (0-9)
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={options.symbols}
                  onCheckedChange={(checked) => setOptions((prev) => ({ ...prev, symbols: checked as boolean }))}
                />
                <label htmlFor="symbols" className="text-sm">
                  Symbols (!@#$%^&*)
                </label>
              </div>
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full" disabled={!Object.values(options).some(Boolean)}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Password
          </Button>

          {password && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium">Generated Password</label>
                <div className="flex gap-2">
                  <Input value={password} readOnly className="font-mono text-sm" />
                  <Button onClick={copyPassword} variant="outline" size="icon">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Strength:</span>
                <div className={`px-2 py-1 rounded text-xs font-medium text-white ${getStrengthColor()}`}>
                  {getStrengthText()}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
