"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle2, ExternalLink } from "lucide-react"

const dasHistory = [
  { month: "Março 2026", value: 75.9, paid: true },
  { month: "Fevereiro 2026", value: 75.9, paid: true },
  { month: "Janeiro 2026", value: 75.9, paid: true },
]

function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function MeiScreen() {
  const faturamentoAtual = 34000
  const limiteMei = 81000
  const porcentagem = Math.round((faturamentoAtual / limiteMei) * 100)

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Painel MEI</h1>
      </div>

      {/* DAS Card */}
      <Card className="bg-gradient-to-br from-[#0f3460] to-[#1a5276] border-0 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-300 mb-1">DAS de Abril 2026</p>
              <p className="text-3xl font-bold text-white">
                {formatCurrency(75.9)}
              </p>
            </div>
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 gap-1">
              <Clock className="w-3 h-3" />
              Vence em 5 dias
            </Badge>
          </div>
          <p className="text-sm text-slate-300 mb-4">
            Vencimento: <span className="font-medium text-white">20/04/2026</span>
          </p>
          <Button
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Gerar Boleto
          </Button>
        </CardContent>
      </Card>

      {/* Faturamento Progress */}
      <Card className="bg-card border-border">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">
            Faturamento 2026
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Faturado</span>
              <span className="font-semibold text-emerald-400">
                {formatCurrency(faturamentoAtual)}
              </span>
            </div>
            <Progress
              value={porcentagem}
              className="h-3 bg-muted"
            />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Limite MEI</span>
              <span className="font-medium text-foreground">
                {formatCurrency(limiteMei)}
              </span>
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-center text-muted-foreground">
                Você usou{" "}
                <span className="font-semibold text-emerald-400">
                  {porcentagem}%
                </span>{" "}
                do limite anual
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DAS History */}
      <div>
        <h3 className="font-semibold text-foreground mb-3">Histórico DAS</h3>
        <div className="space-y-2">
          {dasHistory.map((das) => (
            <Card key={das.month} className="bg-card border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{das.month}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(das.value)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                >
                  Pago
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
