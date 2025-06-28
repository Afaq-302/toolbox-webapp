"use client"

import { useState } from "react"
import { Activity, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaceCalculator() {
  const [distance, setDistance] = useState("")
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")
  const [seconds, setSeconds] = useState("")
  const [distanceUnit, setDistanceUnit] = useState("km")
  const [results, setResults] = useState<any>(null)

  const calculatePace = () => {
    const dist = Number.parseFloat(distance)
    const h = Number.parseInt(hours) || 0
    const m = Number.parseInt(minutes) || 0
    const s = Number.parseInt(seconds) || 0

    if (!dist || dist <= 0 || (h === 0 && m === 0 && s === 0)) return

    const totalSeconds = h * 3600 + m * 60 + s
    const totalMinutes = totalSeconds / 60
    const totalHours = totalSeconds / 3600

    // Convert distance to both km and miles
    const distanceKm = distanceUnit === "km" ? dist : dist * 1.60934
    const distanceMiles = distanceUnit === "miles" ? dist : dist * 0.621371

    // Calculate pace (time per unit distance)
    const paceSecondsPerKm = totalSeconds / distanceKm
    const paceSecondsPerMile = totalSeconds / distanceMiles

    const formatPace = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    // Calculate speed
    const speedKmh = distanceKm / totalHours
    const speedMph = distanceMiles / totalHours

    setResults({
      pacePerKm: formatPace(paceSecondsPerKm),
      pacePerMile: formatPace(paceSecondsPerMile),
      speedKmh: speedKmh.toFixed(2),
      speedMph: speedMph.toFixed(2),
      totalTime: `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`,
      distanceKm: distanceKm.toFixed(2),
      distanceMiles: distanceMiles.toFixed(2),
    })
  }

  const clearForm = () => {
    setDistance("")
    setHours("")
    setMinutes("")
    setSeconds("")
    setResults(null)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pace Calculator</h1>
        <p className="text-gray-600">Calculate your running pace and speed</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Running Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Distance</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter distance"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  min="0"
                  step="0.1"
                />
                <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">km</SelectItem>
                    <SelectItem value="miles">miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="Hours"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  min="0"
                />
                <Input
                  type="number"
                  placeholder="Minutes"
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  min="0"
                  max="59"
                />
                <Input
                  type="number"
                  placeholder="Seconds"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  min="0"
                  max="59"
                />
              </div>
              <div className="text-xs text-gray-500 grid grid-cols-3 gap-2">
                <span>Hours</span>
                <span>Minutes</span>
                <span>Seconds</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculatePace} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate
            </Button>
            <Button onClick={clearForm} variant="outline">
              Clear
            </Button>
          </div>

          {results && (
            <div className="space-y-4 pt-4 border-t">
              <Tabs defaultValue="pace" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pace">Pace</TabsTrigger>
                  <TabsTrigger value="speed">Speed</TabsTrigger>
                </TabsList>

                <TabsContent value="pace" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.pacePerKm}</div>
                      <div className="text-sm text-gray-600">per kilometer</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{results.pacePerMile}</div>
                      <div className="text-sm text-gray-600">per mile</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="speed" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.speedKmh}</div>
                      <div className="text-sm text-gray-600">km/h</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{results.speedMph}</div>
                      <div className="text-sm text-gray-600">mph</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                <p className="text-sm text-gray-600">
                  {results.distanceKm} km ({results.distanceMiles} miles) in {results.totalTime}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
