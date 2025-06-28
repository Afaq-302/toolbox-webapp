"use client"

import { useState, useEffect } from "react"
import { ArrowLeftRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
]

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState("")
  const [rates, setRates] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState("")

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const mockRates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45, INR: 74.5, BRL: 5.2 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.6, INR: 87.8, BRL: 6.1 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.8, INR: 102, BRL: 7.1 },
  }

  const fetchRates = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRates(mockRates)
      setLastUpdated(new Date().toLocaleString())
    } catch (error) {
      console.error("Failed to fetch rates:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
  }, [])

  const convertCurrency = () => {
    if (!amount || !fromCurrency || !toCurrency || !rates[fromCurrency]) return

    const amountNum = Number.parseFloat(amount)
    if (isNaN(amountNum)) return

    if (fromCurrency === toCurrency) {
      setResult(amountNum.toFixed(2))
      return
    }

    const rate = rates[fromCurrency]?.[toCurrency] || 1
    const converted = amountNum * rate
    setResult(converted.toFixed(2))
  }

  useEffect(() => {
    convertCurrency()
  }, [amount, fromCurrency, toCurrency, rates])

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  const getSymbol = (code: string) => {
    return currencies.find((c) => c.code === code)?.symbol || code
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Currency Converter</h1>
        <p className="text-gray-600">Convert between currencies with live exchange rates</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Currency Exchange</CardTitle>
            <Button onClick={fetchRates} variant="outline" size="sm" disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" size="icon" onClick={swapCurrencies}>
                <ArrowLeftRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Converted Amount</label>
              <div className="p-3 bg-gray-50 rounded-lg text-lg font-semibold">
                {result ? `${getSymbol(toCurrency)} ${result}` : "0.00"}
              </div>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {result && fromCurrency !== toCurrency && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">
                1 {fromCurrency} = {rates[fromCurrency]?.[toCurrency]?.toFixed(4) || "N/A"} {toCurrency}
              </p>
            </div>
          )}

          {lastUpdated && <div className="text-center text-xs text-gray-500">Last updated: {lastUpdated}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
