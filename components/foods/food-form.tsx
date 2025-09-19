"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Apple, Activity, Flame } from "lucide-react"

const foodSchema = z.object({
  name: z.string().min(2, "Food name must be at least 2 characters"),
  calories_per_100g: z.number().min(0).max(1000),
  protein_g: z.number().min(0).max(100),
  carbs_g: z.number().min(0).max(100),
  fat_g: z.number().min(0).max(100),
  fiber_g: z.number().min(0).max(50),
  rasa: z.array(z.string()).min(1, "Select at least one rasa"),
  guna: z.array(z.string()).min(1, "Select at least one guna"),
  virya: z.enum(["Heating", "Cooling"]),
  vata_effect: z.enum(["increase", "decrease", "neutral"]),
  pitta_effect: z.enum(["increase", "decrease", "neutral"]),
  kapha_effect: z.enum(["increase", "decrease", "neutral"]),
})

type FoodFormData = z.infer<typeof foodSchema>

const rasaOptions = ["Sweet", "Sour", "Salty", "Pungent", "Bitter", "Astringent"]
const gunaOptions = [
  "Heavy",
  "Light",
  "Oily",
  "Dry",
  "Hot",
  "Cold",
  "Smooth",
  "Rough",
  "Dense",
  "Liquid",
  "Soft",
  "Hard",
  "Static",
  "Mobile",
  "Gross",
  "Subtle",
  "Cloudy",
  "Clear",
]

export function FoodForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedRasa, setSelectedRasa] = useState<string[]>([])
  const [selectedGuna, setSelectedGuna] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FoodFormData>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      rasa: [],
      guna: [],
      vata_effect: "neutral",
      pitta_effect: "neutral",
      kapha_effect: "neutral",
    },
  })

  const handleRasaChange = (rasa: string, checked: boolean) => {
    const newRasa = checked ? [...selectedRasa, rasa] : selectedRasa.filter((r) => r !== rasa)
    setSelectedRasa(newRasa)
    setValue("rasa", newRasa)
  }

  const handleGunaChange = (guna: string, checked: boolean) => {
    const newGuna = checked ? [...selectedGuna, guna] : selectedGuna.filter((g) => g !== guna)
    setSelectedGuna(newGuna)
    setValue("guna", newGuna)
  }

  const onSubmit = async (data: FoodFormData) => {
    setIsLoading(true)
    setError("")

    try {
      const foodData = {
        ...data,
        rasa: data.rasa.join(", "),
        guna: data.guna.join(", "),
        dosha_effects: {
          vata: data.vata_effect,
          pitta: data.pitta_effect,
          kapha: data.kapha_effect,
        },
      }

      console.log("[v0] Creating food:", foodData)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to foods list
      window.location.href = "/dashboard/foods"
    } catch (err) {
      setError("Failed to create food item. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Apple className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Basic Information</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Food Name *</Label>
          <Input id="name" {...register("name")} placeholder="e.g., Basmati Rice, Almonds, Spinach" />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
        </div>
      </div>

      {/* Nutritional Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Nutritional Information (per 100g)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="calories">Calories *</Label>
            <Input
              id="calories"
              type="number"
              step="0.1"
              {...register("calories_per_100g", { valueAsNumber: true })}
              placeholder="365"
            />
            {errors.calories_per_100g && <p className="text-sm text-destructive">{errors.calories_per_100g.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="protein">Protein (g) *</Label>
            <Input
              id="protein"
              type="number"
              step="0.1"
              {...register("protein_g", { valueAsNumber: true })}
              placeholder="7.1"
            />
            {errors.protein_g && <p className="text-sm text-destructive">{errors.protein_g.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="carbs">Carbohydrates (g) *</Label>
            <Input
              id="carbs"
              type="number"
              step="0.1"
              {...register("carbs_g", { valueAsNumber: true })}
              placeholder="78.2"
            />
            {errors.carbs_g && <p className="text-sm text-destructive">{errors.carbs_g.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fat">Fat (g) *</Label>
            <Input
              id="fat"
              type="number"
              step="0.1"
              {...register("fat_g", { valueAsNumber: true })}
              placeholder="0.9"
            />
            {errors.fat_g && <p className="text-sm text-destructive">{errors.fat_g.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fiber">Fiber (g) *</Label>
            <Input
              id="fiber"
              type="number"
              step="0.1"
              {...register("fiber_g", { valueAsNumber: true })}
              placeholder="1.3"
            />
            {errors.fiber_g && <p className="text-sm text-destructive">{errors.fiber_g.message}</p>}
          </div>
        </div>
      </div>

      {/* Ayurvedic Properties */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Flame className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Ayurvedic Properties</h3>
        </div>

        {/* Rasa */}
        <div className="space-y-3">
          <Label>Rasa (Taste) *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {rasaOptions.map((rasa) => (
              <div key={rasa} className="flex items-center space-x-2">
                <Checkbox
                  id={`rasa-${rasa}`}
                  checked={selectedRasa.includes(rasa)}
                  onCheckedChange={(checked) => handleRasaChange(rasa, checked as boolean)}
                />
                <Label htmlFor={`rasa-${rasa}`} className="text-sm">
                  {rasa}
                </Label>
              </div>
            ))}
          </div>
          {errors.rasa && <p className="text-sm text-destructive">{errors.rasa.message}</p>}
        </div>

        {/* Guna */}
        <div className="space-y-3">
          <Label>Guna (Qualities) *</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gunaOptions.map((guna) => (
              <div key={guna} className="flex items-center space-x-2">
                <Checkbox
                  id={`guna-${guna}`}
                  checked={selectedGuna.includes(guna)}
                  onCheckedChange={(checked) => handleGunaChange(guna, checked as boolean)}
                />
                <Label htmlFor={`guna-${guna}`} className="text-sm">
                  {guna}
                </Label>
              </div>
            ))}
          </div>
          {errors.guna && <p className="text-sm text-destructive">{errors.guna.message}</p>}
        </div>

        {/* Virya */}
        <div className="space-y-2">
          <Label htmlFor="virya">Virya (Potency) *</Label>
          <Select onValueChange={(value) => setValue("virya", value as "Heating" | "Cooling")}>
            <SelectTrigger>
              <SelectValue placeholder="Select potency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Heating">Heating (Ushna)</SelectItem>
              <SelectItem value="Cooling">Cooling (Sheeta)</SelectItem>
            </SelectContent>
          </Select>
          {errors.virya && <p className="text-sm text-destructive">{errors.virya.message}</p>}
        </div>

        {/* Dosha Effects */}
        <div className="space-y-4">
          <Label>Effects on Doshas *</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="vata-effect" className="text-blue-600 font-medium">
                Vata Effect
              </Label>
              <Select onValueChange={(value) => setValue("vata_effect", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase">Increases Vata</SelectItem>
                  <SelectItem value="decrease">Decreases Vata</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pitta-effect" className="text-red-600 font-medium">
                Pitta Effect
              </Label>
              <Select onValueChange={(value) => setValue("pitta_effect", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase">Increases Pitta</SelectItem>
                  <SelectItem value="decrease">Decreases Pitta</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kapha-effect" className="text-green-600 font-medium">
                Kapha Effect
              </Label>
              <Select onValueChange={(value) => setValue("kapha_effect", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase">Increases Kapha</SelectItem>
                  <SelectItem value="decrease">Decreases Kapha</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" type="button" asChild>
          <a href="/dashboard/foods">Cancel</a>
        </Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating Food...
            </>
          ) : (
            "Create Food Item"
          )}
        </Button>
      </div>
    </form>
  )
}
