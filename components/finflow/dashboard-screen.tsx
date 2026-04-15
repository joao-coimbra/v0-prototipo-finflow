"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ArrowDownLeft, ArrowUpRight } from "lucide-react"

const transactions = [
  {
    id: 1,
    type: "receita",
    description: "Cliente Acme",
    value: 3500,
    category: "Dev freelance",
    daysAgo: 3,
  },
  {
    id: 2,
    type: "despesa",
    description: "Adobe CC",
    value: 249,
    category: "Ferramentas",
    daysAgo: 5,
  },
  {
    id: 3,
    type: "receita",
    description: "Cliente Beta",
    value: 2000,
    category: "Design",
    daysAgo: 6,
  },
  {
    id: 4,
    type: "despesa",
    description: "Aluguel Escritório",
    value: 800,
    category: "Infraestrutura",
    daysAgo: 8,
  },
  {
    id: 5,
    type: "despesa",
    description: "Internet",
    value: 150,
    category: "Infraestrutura",
    daysAgo: 10,
  },
]

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function DashboardScreen() {
  const currentMonth = new Date().toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Olá, João 👋</h1>
        <p className="text-muted-foreground capitalize">{currentMonth}</p>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a5276] border-0 overflow-hidden">
        <CardContent className="p-6">
          <p className="text-sm text-slate-300 mb-1">Saldo do mês</p>
          <p className="text-3xl font-bold text-white mb-4">
            {formatCurrency(4200)}
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-300">Receitas</p>
                <p className="text-sm font-semibold text-emerald-400">
                  {formatCurrency(8500)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-slate-300">Despesas</p>
                <p className="text-sm font-semibold text-red-400">
                  {formatCurrency(4300)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">
          Últimos lançamentos
        </h2>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="bg-card border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === "receita"
                        ? "bg-emerald-500/20"
                        : "bg-red-500/20"
                    }`}
                  >
                    {tx.type === "receita" ? (
                      <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {tx.category} • {tx.daysAgo} dias atrás
                    </p>
                  </div>
                </div>
                <p
                  className={`font-semibold ${
                    tx.type === "receita" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {tx.type === "receita" ? "+" : "-"}
                  {formatCurrency(tx.value)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Alert Card */}
      <Card className="bg-amber-500/10 border-amber-500/30">
        <CardContent className="p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-400 mb-1">Alerta</p>
            <p className="text-sm text-amber-200/80">
              Mês projetado abaixo da sua meta. Receita esperada:{" "}
              <span className="font-semibold">{formatCurrency(5200)}</span> /
              Meta: <span className="font-semibold">{formatCurrency(6000)}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
