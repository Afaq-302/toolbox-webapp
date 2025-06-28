"use client"

import { useState, useEffect } from "react"
import { Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const timeZones = [
  { name: "New York", zone: "America/New_York", flag: "🇺🇸" },
  { name: "Los Angeles", zone: "America/Los_Angeles", flag: "🇺🇸" },
  { name: "London", zone: "Europe/London", flag: "🇬🇧" },
  { name: "Paris", zone: "Europe/Paris", flag: "🇫🇷" },
  { name: "Tokyo", zone: "Asia/Tokyo", flag: "🇯🇵" },
  { name: "Sydney", zone: "Australia/Sydney", flag: "🇦🇺" },
  { name: "Dubai", zone: "Asia/Dubai", flag: "🇦🇪" },
  { name: "Singapore", zone: "Asia/Singapore", flag: "🇸🇬" },
  { name: "Hong Kong", zone: "Asia/Hong_Kong", flag: "🇭🇰" },
  { name: "Mumbai", zone: "Asia/Kolkata", flag: "🇮🇳" },
  { name: "São Paulo", zone: "America/Sao_Paulo", flag: "🇧🇷" },
  { name: "Mexico City", zone: "America/Mexico_City", flag: "🇲🇽" },
  { name: "Toronto", zone: "America/Toronto", flag: "🇨🇦" },
  { name: "Berlin", zone: "Europe/Berlin", flag: "🇩🇪" },
  { name: "Moscow", zone: "Europe/Moscow", flag: "🇷🇺" },
  { name: "Cairo", zone: "Africa/Cairo", flag: "🇪🇬" },
  { name: "Seoul", zone: "Asia/Seoul", flag: "🇰🇷" },
  { name: "Bangkok", zone: "Asia/Bangkok", flag: "🇹🇭" },
]

export default function WorldClock() {
  const [selectedZones, setSelectedZones] = useState([
    timeZones[0], // New York
    timeZones[2], // London
    timeZones[4], // Tokyo
  ])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedZone, setSelectedZone] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const addTimeZone = () => {
    const zone = timeZones.find((tz) => tz.zone === selectedZone)
    if (zone && !selectedZones.find((sz) => sz.zone === zone.zone)) {
      setSelectedZones([...selectedZones, zone])
      setSelectedZone("")
    }
  }

  const removeTimeZone = (zoneToRemove: string) => {
    setSelectedZones(selectedZones.filter((zone) => zone.zone !== zoneToRemove))
  }

  const formatTime = (timeZone: string) => {
    return currentTime.toLocaleTimeString("en-US", {
      timeZone,
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (timeZone: string) => {
    return currentTime.toLocaleDateString("en-US", {
      timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeOffset = (timeZone: string) => {
    const now = new Date()
    const utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
    const targetTime = new Date(utc.toLocaleString("en-US", { timeZone }))
    const offset = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60)
    return offset >= 0 ? `+${offset}` : `${offset}`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">World Clock</h1>
        <p className="text-gray-600">View current time in different time zones around the world</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Time Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Select value={selectedZone} onValueChange={setSelectedZone}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select a time zone to add" />
              </SelectTrigger>
              <SelectContent>
                {timeZones
                  .filter((tz) => !selectedZones.find((sz) => sz.zone === tz.zone))
                  .map((timeZone) => (
                    <SelectItem key={timeZone.zone} value={timeZone.zone}>
                      {timeZone.flag} {timeZone.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Button onClick={addTimeZone} disabled={!selectedZone}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedZones.map((zone) => (
          <Card key={zone.zone} className="relative">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">{zone.flag}</span>
                  {zone.name}
                </CardTitle>
                {selectedZones.length > 1 && (
                  <Button onClick={() => removeTimeZone(zone.zone)} variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center">
                <div className="text-3xl font-mono font-bold text-gray-900 mb-1">{formatTime(zone.zone)}</div>
                <div className="text-sm text-gray-600">{formatDate(zone.zone)}</div>
                <div className="text-xs text-gray-500 mt-2">UTC {getTimeOffset(zone.zone)}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Your Local Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-blue-600 mb-2">
              {currentTime.toLocaleTimeString("en-US", {
                hour12: true,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="text-gray-600">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-sm text-gray-500 mt-2">{Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
