"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Target, AlertCircle, Clock, Utensils } from "lucide-react"

const configurationSchema = z.object({
  goal: z.string().min(10, "Goal must be at least 10 characters"),
  duration_weeks: z.number().min(1).max(12),
  calories_target: z.number().min(1000).max(4000).optional(),
  meal_preferences: z.array(z.string()),
  exclusions: z.array(z.string()),
  special_instructions: z.string().optional(),
})

type ConfigurationFormData = z.infer<typeof configurationSchema>

interface DietChartConfigurationProps {
  patient: any
  onComplete: (config: ConfigurationFormData) => void
}

const commonGoals = [
  "Weight management and healthy living",
  "Digestive health improvement",
  "Energy and vitality enhancement",
  "Stress management and mental clarity",
  "Hormonal balance support",
  "Diabetes management",
  "Heart health optimization",
  "Detoxification and cleansing",
]

const mealPreferences = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Low-carb",
  "High-protein",
  "Organic foods",
  "Local/seasonal foods",
  "Quick preparation",
]

const commonExclusions = [
  "Dairy products",
  "Gluten",
  "Nuts",
  "Shellfish",
  "Eggs",
  "Soy",
  "Spicy foods",
  "Caffeine",
  "Alcohol",
  "Refined sugar",
  "Processed foods",
  "Red meat",
]

export function DietChartConfiguration({ patient, onComplete }: DietChartConfigurationProps) {
  const [selectedMealPreferences, setSelectedMealPreferences] = useState<string[]>([])
  const [selectedExclusions, setSelectedExclusions] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConfigurationFormData>({
    resolver: zodResolver(configurationSchema),
    defaultValues: {
      duration_weeks: 4,
      meal_preferences: [],
      exclusions: [],
    },
  })

  const handleMealPreferenceChange = (preference: string, checked: boolean) => {
    const newPreferences = checked
      ? [...selectedMealPreferences, preference]
      : selectedMealPreferences.filter((p) => p !== preference)
    setSelectedMealPreferences(newPreferences)
    setValue("meal_preferences", newPreferences)
  }

  const handleExclusionChange = (exclusion: string, checked: boolean) => {
    const newExclusions = checked
      ? [...selectedExclusions, exclusion]
      : selectedExclusions.filter((e) => e !== exclusion)
    setSelectedExclusions(newExclusions)
    setValue("exclusions", newExclusions)
  }

  const onSubmit = (data: ConfigurationFormData) => {
    onComplete(data)
  }

  // Calculate recommended calories based on patient data
  const calculateRecommendedCalories = () => {
    // Basic BMR calculation (Harris-Benedict)
    const bmr =
      patient.gender === "Female"
        ? 447.593 + 9.247 * patient.weight + 3.098 * patient.height - 4.33 * patient.age
        : 88.362 + 13.397 * patient.weight + 4.799 * patient.height - 5.677 * patient.age

    const activityMultiplier =
      {
        Sedentary: 1.2,
        "Lightly Active": 1.375,
        "Moderately Active": 1.55,
        "Very Active": 1.725,
      }[patient.activity_level] || 1.55

    return Math.round(bmr * activityMultiplier)
  }

  const recommendedCalories = calculateRecommendedCalories()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Goal Setting */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Diet Goals & Objectives</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">Primary Goal *</Label>
            <Textarea
              id="goal"
              {...register("goal")}
              placeholder="Describe the main health goals for this diet plan..."
              rows={3}
            />
            {errors.goal && <p className="text-sm text-destructive">{errors.goal.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Common Goals (click to add)</Label>
            <div className="flex flex-wrap gap-2">
              {commonGoals.map((goal) => (
                <Button
                  key={goal}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                  onClick={() => setValue("goal", goal)}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Duration & Calories */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Clock className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Duration & Caloric Targets</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (weeks) *</Label>
            <Select onValueChange={(value) => setValue("duration_weeks", Number.parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 weeks</SelectItem>
                <SelectItem value="4">4 weeks (Recommended)</SelectItem>
                <SelectItem value="6">6 weeks</SelectItem>
                <SelectItem value="8">8 weeks</SelectItem>
                <SelectItem value="12">12 weeks</SelectItem>
              </SelectContent>
            </Select>
            {errors.duration_weeks && <p className="text-sm text-destructive">{errors.duration_weeks.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="calories">Daily Calories Target</Label>
            <Input
              id="calories"
              type="number"
              {...register("calories_target", { valueAsNumber: true })}
              placeholder={recommendedCalories.toString()}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: {recommendedCalories} calories based on patient profile
            </p>
          </div>
        </div>
      </div>

      {/* Meal Preferences */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Utensils className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Meal Preferences</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mealPreferences.map((preference) => (
            <div key={preference} className="flex items-center space-x-2">
              <Checkbox
                id={`pref-${preference}`}
                checked={selectedMealPreferences.includes(preference)}
                onCheckedChange={(checked) => handleMealPreferenceChange(preference, checked as boolean)}
              />
              <Label htmlFor={`pref-${preference}`} className="text-sm">
                {preference}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Exclusions */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <AlertCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Food Exclusions & Restrictions</h3>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Patient allergies from profile: {patient.allergies || "None reported"}</AlertDescription>
        </Alert>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {commonExclusions.map((exclusion) => (
            <div key={exclusion} className="flex items-center space-x-2">
              <Checkbox
                id={`excl-${exclusion}`}
                checked={selectedExclusions.includes(exclusion)}
                onCheckedChange={(checked) => handleExclusionChange(exclusion, checked as boolean)}
              />
              <Label htmlFor={`excl-${exclusion}`} className="text-sm">
                {exclusion}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="instructions">Special Instructions (Optional)</Label>
          <Textarea
            id="instructions"
            {...register("special_instructions")}
            placeholder="Any additional dietary requirements, cooking preferences, or special considerations..."
            rows={3}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" type="button" asChild>
          <a href="/dashboard/diet-charts">Cancel</a>
        </Button>
        <Button type="submit" className="gap-2">
          Generate AI Diet Plan
        </Button>
      </div>
    </form>
  )
}
