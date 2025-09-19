"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Flame, Snowflake, Activity, Droplets, User } from "lucide-react"
import type { Food } from "@/types"

interface FoodDetailsDialogProps {
  food: Food
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FoodDetailsDialog({ food, open, onOpenChange }: FoodDetailsDialogProps) {
  const getDoshaEffectColor = (effect: "increase" | "decrease" | "neutral") => {
    switch (effect) {
      case "increase":
        return "bg-red-100 text-red-800"
      case "decrease":
        return "bg-green-100 text-green-800"
      case "neutral":
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDoshaEffectText = (effect: "increase" | "decrease" | "neutral") => {
    switch (effect) {
      case "increase":
        return "Increases"
      case "decrease":
        return "Decreases"
      case "neutral":
        return "Neutral"
    }
  }

  const getDoshaIcon = (dosha: string) => {
    switch (dosha) {
      case "vata":
        return <Activity className="h-4 w-4 text-blue-600" />
      case "pitta":
        return <Droplets className="h-4 w-4 text-red-600" />
      case "kapha":
        return <User className="h-4 w-4 text-green-600" />
      default:
        return null
    }
  }

  const getViryaIcon = (virya: string) => {
    return virya.toLowerCase().includes("heating") ? (
      <Flame className="h-4 w-4 text-red-500" />
    ) : (
      <Snowflake className="h-4 w-4 text-blue-500" />
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{food.name}</DialogTitle>
          <DialogDescription>Complete nutritional and Ayurvedic profile</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Nutritional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nutritional Information (per 100g)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold text-primary">{food.calories_per_100g}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold">{food.protein_g}g</div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold">{food.carbs_g}g</div>
                  <div className="text-sm text-muted-foreground">Carbohydrates</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold">{food.fat_g}g</div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                </div>
                <div className="text-center space-y-1">
                  <div className="text-2xl font-bold">{food.fiber_g}g</div>
                  <div className="text-sm text-muted-foreground">Fiber</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ayurvedic Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ayurvedic Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rasa */}
              <div className="space-y-2">
                <h4 className="font-medium">Rasa (Taste)</h4>
                <div className="flex flex-wrap gap-2">
                  {food.rasa.split(", ").map((rasa, index) => (
                    <Badge key={index} variant="secondary">
                      {rasa}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Guna */}
              <div className="space-y-2">
                <h4 className="font-medium">Guna (Qualities)</h4>
                <div className="flex flex-wrap gap-2">
                  {food.guna.split(", ").map((guna, index) => (
                    <Badge key={index} variant="outline">
                      {guna}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Virya */}
              <div className="space-y-2">
                <h4 className="font-medium">Virya (Potency)</h4>
                <div className="flex items-center space-x-2">
                  {getViryaIcon(food.virya)}
                  <Badge variant="outline" className="gap-1">
                    {food.virya}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dosha Effects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Effects on Doshas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(food.dosha_effects).map(([dosha, effect]) => (
                  <div key={dosha} className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      {getDoshaIcon(dosha)}
                      <span className="font-medium capitalize">{dosha}</span>
                    </div>
                    <Badge className={getDoshaEffectColor(effect)}>{getDoshaEffectText(effect)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ayurvedic Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-medium text-green-700">Good for:</h4>
                <div className="text-sm text-muted-foreground">
                  {Object.entries(food.dosha_effects)
                    .filter(([_, effect]) => effect === "decrease")
                    .map(([dosha, _]) => `${dosha.charAt(0).toUpperCase() + dosha.slice(1)} imbalance`)
                    .join(", ") || "Balanced individuals"}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-red-700">Use with caution for:</h4>
                <div className="text-sm text-muted-foreground">
                  {Object.entries(food.dosha_effects)
                    .filter(([_, effect]) => effect === "increase")
                    .map(([dosha, _]) => `Excess ${dosha.charAt(0).toUpperCase() + dosha.slice(1)}`)
                    .join(", ") || "None"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
