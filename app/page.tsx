"use client"

import { useState } from "react"
import { Home, Plus, TrendingUp, Receipt } from "lucide-react"
import { DashboardScreen } from "@/components/finflow/dashboard-screen"
import { NovoLancamentoScreen } from "@/components/finflow/novo-lancamento-screen"
import { ProjecaoScreen } from "@/components/finflow/projecao-screen"
import { MeiScreen } from "@/components/finflow/mei-screen"

type TabType = "inicio" | "lancamentos" | "projecao" | "mei"

export default function FinFlowApp() {
  const [activeTab, setActiveTab] = useState<TabType>("inicio")

  const tabs = [
    { id: "inicio" as const, label: "Início", icon: Home },
    { id: "lancamentos" as const, label: "Lançamentos", icon: Plus },
    { id: "projecao" as const, label: "Projeção", icon: TrendingUp },
    { id: "mei" as const, label: "MEI", icon: Receipt },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === "inicio" && <DashboardScreen />}
        {activeTab === "lancamentos" && <NovoLancamentoScreen />}
        {activeTab === "projecao" && <ProjecaoScreen />}
        {activeTab === "mei" && <MeiScreen />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-emerald-400"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
