"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Sparkles, Pencil } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

const categories = [
  "Cliente/Projeto",
  "Ferramentas",
  "Infraestrutura",
  "Alimentação",
  "Transporte",
  "Imposto",
  "Outro",
]

export function NovoLancamentoScreen() {
  const [type, setType] = useState<"receita" | "despesa">("receita")
  const [valor, setValor] = useState("")
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState("")
  const [date, setDate] = useState<Date>(new Date())

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    const numericValue = parseInt(value, 10) / 100
    if (!isNaN(numericValue)) {
      setValor(
        numericValue.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
    } else {
      setValor("")
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Novo Lançamento</h1>
      </div>

      {/* Type Toggle */}
      <div className="flex rounded-xl bg-card border border-border p-1">
        <button
          onClick={() => setType("receita")}
          className={cn(
            "flex-1 py-3 rounded-lg font-medium transition-all",
            type === "receita"
              ? "bg-emerald-500 text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Receita
        </button>
        <button
          onClick={() => setType("despesa")}
          className={cn(
            "flex-1 py-3 rounded-lg font-medium transition-all",
            type === "despesa"
              ? "bg-red-500 text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Despesa
        </button>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Valor */}
        <div className="space-y-2">
          <Label htmlFor="valor" className="text-muted-foreground">
            Valor
          </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">
              R$
            </span>
            <Input
              id="valor"
              type="text"
              inputMode="numeric"
              value={valor}
              onChange={handleValorChange}
              placeholder="0,00"
              className="pl-14 h-16 text-3xl font-bold bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Descrição */}
        <div className="space-y-2">
          <Label htmlFor="descricao" className="text-muted-foreground">
            Descrição
          </Label>
          <Input
            id="descricao"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Projeto site institucional"
            className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Categoria */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Categoria</Label>
          <Select value={categoria} onValueChange={setCategoria}>
            <SelectTrigger className="h-12 bg-card border-border text-foreground">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="text-foreground">
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Data */}
        <div className="space-y-2">
          <Label className="text-muted-foreground">Data</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal bg-card border-border text-foreground"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                {date ? (
                  format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                ) : (
                  <span className="text-muted-foreground">
                    Selecione uma data
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* AI Tag */}
        <Card className="bg-purple-500/10 border-purple-500/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                Categorizado por IA:
              </span>
              <Badge
                variant="secondary"
                className="bg-purple-500/20 text-purple-300 border-purple-500/30"
              >
                Ferramentas
              </Badge>
            </div>
            <button className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors">
              <Pencil className="w-3 h-3" />
              editar
            </button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button className="w-full h-14 bg-[#0f3460] hover:bg-[#1a5276] text-white font-semibold text-lg mt-4">
          Registrar Lançamento
        </Button>
      </div>
    </div>
  )
}
