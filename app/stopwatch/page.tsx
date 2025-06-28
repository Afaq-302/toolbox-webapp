"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Flag, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    const ms = Math.floor((milliseconds % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, time])
    }
  }

  const getBestLap = () => {
    if (laps.length === 0) return null
    return Math.min(...laps)
  }

  const getWorstLap = () => {
    if (laps.length === 0) return null
    return Math.max(...laps)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Stopwatch</h1>
        <p className="text-gray-600">Precise timing with lap functionality</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 justify-center">
            <Timer className="w-5 h-5" />
            Stopwatch
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-900 mb-6">{formatTime(time)}</div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={handleStartStop}
                size="lg"
                className={isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </>
                )}
              </Button>

              <Button onClick={handleLap} variant="outline" size="lg" disabled={!isRunning}>
                <Flag className="w-5 h-5 mr-2" />
                Lap
              </Button>

              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {laps.length > 0 && (
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold text-center">Lap Times</h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-700 font-medium">Best Lap</div>
                  <div className="text-lg font-mono font-bold text-green-600">{formatTime(getBestLap() || 0)}</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-700 font-medium">Worst Lap</div>
                  <div className="text-lg font-mono font-bold text-red-600">{formatTime(getWorstLap() || 0)}</div>
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto space-y-2">
                {laps.map((lapTime, index) => {
                  const isFirst = index === 0
                  const previousLapTime = isFirst ? 0 : laps[index - 1]
                  const splitTime = lapTime - previousLapTime
                  const isBest = lapTime === getBestLap()
                  const isWorst = lapTime === getWorstLap()

                  return (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg border ${
                        isBest
                          ? "bg-green-50 border-green-200"
                          : isWorst
                            ? "bg-red-50 border-red-200"
                            : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className="font-medium">Lap {laps.length - index}</span>
                      <div className="text-right">
                        <div className="font-mono font-bold">{formatTime(splitTime)}</div>
                        <div className="text-sm text-gray-500 font-mono">{formatTime(lapTime)}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
