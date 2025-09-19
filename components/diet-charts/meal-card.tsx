"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Coffee, Sun, Moon, Apple } from "lucide-react"

interface MealCardProps {
  mealType: string
  meals: Array<{
    food_id: string
    food_name: string
    quantity: number
    unit: string
    calories: number
  }>
  onRegenerate: () => void
}

const mealIcons = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snacks: Apple,
}

export function MealCard({ mealType, meals, onRegenerate }: MealCardProps) {
  const Icon = mealIcons[mealType as keyof typeof mealIcons] || Apple
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-4 w-4 text-primary" />
            <CardTitle className="text-base capitalize">{mealType}</CardTitle>
            <Badge variant="outline" className="text-xs">
              {totalCalories} cal
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onRegenerate} className="gap-1">
            <RefreshCw className="h-3 w-3" />
            Swap
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {meals.map((meal, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex-1">
              <div className="font-medium">{meal.food_name}</div>
              <div className="text-muted-foreground text-xs">
                {meal.quantity} {meal.unit}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">{meal.calories} cal</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
