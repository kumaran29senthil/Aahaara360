"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MealCard } from "./meal-card"
import { NutritionAnalysis } from "./nutrition-analysis"
import { PDFExportDialog } from "./pdf-export-dialog"
import { ArrowLeft, Sparkles, Save, Download, RefreshCw } from "lucide-react"

interface DietChartGeneratorProps {
  patient: any
  configuration: any
  onBack: () => void
}

// Mock meal data
const mockMealPlan = {
  monday: {
    breakfast: [
      { food_id: "1", food_name: "Oatmeal with almonds", quantity: 1, unit: "bowl", calories: 320 },
      { food_id: "2", food_name: "Fresh berries", quantity: 0.5, unit: "cup", calories: 40 },
    ],
    lunch: [
      { food_id: "3", food_name: "Quinoa salad", quantity: 1, unit: "bowl", calories: 280 },
      { food_id: "4", food_name: "Grilled vegetables", quantity: 1, unit: "serving", calories: 120 },
    ],
    dinner: [
      { food_id: "5", food_name: "Lentil curry", quantity: 1, unit: "bowl", calories: 250 },
      { food_id: "6", food_name: "Brown rice", quantity: 0.5, unit: "cup", calories: 110 },
    ],
    snacks: [{ food_id: "7", food_name: "Herbal tea with dates", quantity: 1, unit: "cup", calories: 60 }],
  },
  // Add other days...
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export function DietChartGenerator({ patient, configuration, onBack }: DietChartGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(true)
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [mealPlan, setMealPlan] = useState<any>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [showPDFExport, setShowPDFExport] = useState(false)

  useEffect(() => {
    // Simulate AI generation process
    const generateDietPlan = async () => {
      setIsGenerating(true)
      setGenerationProgress(0)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setGenerationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2500))

      setMealPlan(mockMealPlan)
      setIsGenerating(false)
    }

    generateDietPlan()
  }, [])

  const handleSaveDietChart = async () => {
    console.log("[v0] Saving diet chart:", { patient, configuration, mealPlan })
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    window.location.href = "/dashboard/diet-charts"
  }

  const handleRegenerateMeal = (day: string, mealType: string) => {
    console.log("[v0] Regenerating meal:", { day, mealType })
    // Simulate meal regeneration
  }

  if (isGenerating) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-16 space-y-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">Generating AI Diet Plan</h3>
            <p className="text-muted-foreground text-pretty max-w-md">
              Our AI is creating a personalized Ayurvedic diet plan based on {patient.name}'s prakriti and your
              configuration...
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <Progress value={generationProgress} className="h-2" />
            <p className="text-sm text-center text-muted-foreground">{generationProgress}% Complete</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Configuration
          </Button>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">AI-Generated Diet Plan</h2>
            <p className="text-sm text-muted-foreground">
              Personalized for {patient.prakriti} constitution • {configuration.duration_weeks} weeks
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setShowPDFExport(true)}>
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={handleSaveDietChart} className="gap-2">
            <Save className="h-4 w-4" />
            Save Diet Chart
          </Button>
        </div>
      </div>

      {/* Configuration Summary */}
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <strong>Goal:</strong> {configuration.goal} • <strong>Duration:</strong> {configuration.duration_weeks} weeks
          {configuration.exclusions.length > 0 && (
            <>
              {" "}
              • <strong>Exclusions:</strong> {configuration.exclusions.join(", ")}
            </>
          )}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Day Selector */}
        <div className="space-y-3">
          <h3 className="font-semibold">Select Day</h3>
          <div className="space-y-2">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                className="w-full justify-start bg-transparent"
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>

        {/* Meal Plan */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{selectedDay} Meal Plan</h3>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <RefreshCw className="h-3 w-3" />
              Regenerate Day
            </Button>
          </div>

          <div className="space-y-4">
            {["breakfast", "lunch", "dinner", "snacks"].map((mealType) => (
              <MealCard
                key={mealType}
                mealType={mealType}
                meals={mealPlan?.[selectedDay.toLowerCase()]?.[mealType] || []}
                onRegenerate={() => handleRegenerateMeal(selectedDay, mealType)}
              />
            ))}
          </div>
        </div>

        {/* Nutrition Analysis */}
        <div>
          <NutritionAnalysis
            selectedDay={selectedDay}
            meals={mealPlan?.[selectedDay.toLowerCase()] || {}}
            targetCalories={configuration.calories_target}
          />
        </div>
      </div>

      <PDFExportDialog open={showPDFExport} onOpenChange={setShowPDFExport} dietChart={mealPlan} patient={patient} />
    </div>
  )
}
