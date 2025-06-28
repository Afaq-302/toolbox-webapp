"use client"

import { useState } from "react"
import { ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const conversions = {
  length: {
    name: "Length",
    units: {
      km: { name: "Kilometers", factor: 1000 },
      m: { name: "Meters", factor: 1 },
      cm: { name: "Centimeters", factor: 0.01 },
      mm: { name: "Millimeters", factor: 0.001 },
      mi: { name: "Miles", factor: 1609.34 },
      ft: { name: "Feet", factor: 0.3048 },
      in: { name: "Inches", factor: 0.0254 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kg: { name: "Kilograms", factor: 1 },
      g: { name: "Grams", factor: 0.001 },
      lb: { name: "Pounds", factor: 0.453592 },
      oz: { name: "Ounces", factor: 0.0283495 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      c: { name: "Celsius", factor: 1 },
      f: { name: "Fahrenheit", factor: 1 },
      k: { name: "Kelvin", factor: 1 },
    },
  },
}

export default function UnitConverter() {
  const [category, setCategory] = useState("length")
  const [fromUnit, setFromUnit] = useState("")
  const [toUnit, setToUnit] = useState("")
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")

  const convertValue = (value: string, from: string, to: string, cat: string) => {
    if (!value || !from || !to) return ""

    const num = Number.parseFloat(value)
    if (isNaN(num)) return ""

    if (cat === "temperature") {
      let celsius = num
      if (from === "f") celsius = ((num - 32) * 5) / 9
      if (from === "k") celsius = num - 273.15

      if (to === "c") return celsius.toFixed(2)
      if (to === "f") return ((celsius * 9) / 5 + 32).toFixed(2)
      if (to === "k") return (celsius + 273.15).toFixed(2)
    } else {
      const fromFactor =
        conversions[cat as keyof typeof conversions].units[from as keyof typeof conversions.length.units]?.factor || 1
      const toFactor =
        conversions[cat as keyof typeof conversions].units[to as keyof typeof conversions.length.units]?.factor || 1
      const result = (num * fromFactor) / toFactor
      return result.toFixed(6).replace(/\.?0+$/, "")
    }
    return ""
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    setToValue(convertValue(value, fromUnit, toUnit, category))
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    setFromValue(convertValue(value, toUnit, fromUnit, category))
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    const tempValue = fromValue
    setFromUnit(toUnit)
    setToUnit(tempUnit)
    setFromValue(toValue)
    setToValue(tempValue)
  }

  const currentUnits = conversions[category as keyof typeof conversions]?.units || {}

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Unit Converter</h1>
        <p className="text-gray-600">Convert between different units of measurement</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Select Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value)
              setFromUnit("")
              setToUnit("")
              setFromValue("")
              setToValue("")
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(conversions).map(([key, conv]) => (
                <SelectItem key={key} value={key}>
                  {conv.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Enter value"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
              />
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="icon" onClick={swapUnits} disabled={!fromUnit || !toUnit}>
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currentUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Result"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
