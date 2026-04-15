"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Jan", receita: 7800, despesa: 3900, future: false },
  { month: "Fev", receita: 8200, despesa: 4100, future: false },
  { month: "Mar", receita: 8500, despesa: 4300, future: false },
  { month: "Abr", receita: 7200, despesa: 4100, future: true },
  { month: "Mai", receita: 5800, despesa: 4300, future: true },
  { month: "Jun", receita: 5200, despesa: 4400, future: true },
]

const projectionCards = [
  {
    month: "Abril",
    receita: 7200,
    despesa: 4100,
    saldo: 3100,
    status: "green",
  },
  {
    month: "Maio",
    receita: 5800,
    despesa: 4300,
    saldo: 1500,
    status: "yellow",
  },
  {
    month: "Junho",
    receita: 5200,
    despesa: 4400,
    saldo: 800,
    status: "red",
  },
]

const chartConfig = {
  receita: {
    label: "Receita",
    color: "#10b981",
  },
  despesa: {
    label: "Despesa",
    color: "#ef4444",
  },
} satisfies ChartConfig

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

function formatCurrencyShort(value: number): string {
  return `R$ ${(value / 1000).toFixed(1)}k`
}

function getStatusEmoji(status: string): string {
  switch (status) {
    case "green":
      return "🟢"
    case "yellow":
      return "🟡"
    case "red":
      return "🔴"
    default:
      return ""
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "green":
      return "text-emerald-400"
    case "yellow":
      return "text-amber-400"
    case "red":
      return "text-red-400"
    default:
      return "text-foreground"
  }
}

export function ProjecaoScreen() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Projeção de Caixa
        </h1>
        <p className="text-muted-foreground">Baseada nos últimos 3 meses</p>
      </div>

      {/* Chart */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e4976"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={{ stroke: "#1e4976" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={{ stroke: "#1e4976" }}
                  tickLine={false}
                  tickFormatter={formatCurrencyShort}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(value as number)}
                    />
                  }
                />
                <Legend
                  wrapperStyle={{ paddingTop: "16px" }}
                  formatter={(value) =>
                    value === "receita" ? "Receita" : "Despesa"
                  }
                />
                <Bar
                  dataKey="receita"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  opacity={0.9}
                />
                <Bar
                  dataKey="despesa"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  opacity={0.9}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#0f3460] rounded" />
              <span>Realizado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#0f3460]/50 rounded border border-dashed border-[#1e4976]" />
              <span>Projetado</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projection Cards */}
      <div className="space-y-3">
        {projectionCards.map((card) => (
          <Card key={card.month} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{card.month}</h3>
                <span className={`font-bold ${getStatusColor(card.status)}`}>
                  {getStatusEmoji(card.status)} Saldo:{" "}
                  {formatCurrency(card.saldo)}
                </span>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Receita est.</span>
                  <p className="font-medium text-emerald-400">
                    {formatCurrency(card.receita)}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">Despesa est.</span>
                  <p className="font-medium text-red-400">
                    {formatCurrency(card.despesa)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insight Box */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="p-4 flex gap-3">
          <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-200/90">
            <span className="font-medium text-blue-300">Junho</span> está
            projetado como seu mês mais fraco. Considere antecipar cobranças ou
            reduzir despesas variáveis.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
