"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, User, Phone, Mail, Activity, Bed, Droplets, Heart } from "lucide-react"

const patientSchema = z.object({
  // Basic Info
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.number().min(1).max(120),
  gender: z.enum(["Male", "Female", "Other"]),
  height: z.number().min(50).max(250),
  weight: z.number().min(10).max(300),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),

  // Medical Info
  medical_history: z.string(),
  current_medications: z.string(),
  allergies: z.string(),

  // Ayurvedic Info
  activity_level: z.enum(["Sedentary", "Lightly Active", "Moderately Active", "Very Active"]),
  sleep_pattern: z.string().min(1, "Sleep pattern is required"),
  water_intake: z.string().min(1, "Water intake is required"),
  bowel_movements: z.string().min(1, "Bowel movement pattern is required"),
  agni: z.enum(["Weak", "Moderate", "Strong"]),
})

type PatientFormData = z.infer<typeof patientSchema>

export function PatientForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  })

  const onSubmit = async (data: PatientFormData) => {
    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Creating patient:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const patientDataParam = encodeURIComponent(JSON.stringify(data))
      router.push(`/dashboard/patients/new/prakriti?patientData=${patientDataParam}`)
    } catch (err) {
      setError("Failed to create patient. Please try again.")
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
          <User className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Basic Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" {...register("name")} placeholder="Enter patient's full name" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input id="age" type="number" {...register("age", { valueAsNumber: true })} placeholder="Enter age" />
            {errors.age && <p className="text-sm text-destructive">{errors.age.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select onValueChange={(value) => setValue("gender", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height (cm) *</Label>
            <Input
              id="height"
              type="number"
              {...register("height", { valueAsNumber: true })}
              placeholder="Enter height in cm"
            />
            {errors.height && <p className="text-sm text-destructive">{errors.height.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg) *</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              {...register("weight", { valueAsNumber: true })}
              placeholder="Enter weight in kg"
            />
            {errors.weight && <p className="text-sm text-destructive">{errors.weight.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="phone" {...register("phone")} placeholder="+91 98765 43210" className="pl-10" />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="patient@example.com"
                className="pl-10"
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Heart className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Medical Information</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="medical_history">Medical History</Label>
            <Textarea
              id="medical_history"
              {...register("medical_history")}
              placeholder="Any significant medical conditions, surgeries, or health issues..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current_medications">Current Medications</Label>
            <Textarea
              id="current_medications"
              {...register("current_medications")}
              placeholder="List all current medications, supplements, and dosages..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies & Food Intolerances</Label>
            <Textarea
              id="allergies"
              {...register("allergies")}
              placeholder="Any known allergies, food intolerances, or sensitivities..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Ayurvedic Information */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-border">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Lifestyle & Ayurvedic Information</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="activity_level">Activity Level *</Label>
            <Select onValueChange={(value) => setValue("activity_level", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sedentary">Sedentary (Little to no exercise)</SelectItem>
                <SelectItem value="Lightly Active">Lightly Active (Light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="Moderately Active">Moderately Active (Moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="Very Active">Very Active (Hard exercise 6-7 days/week)</SelectItem>
              </SelectContent>
            </Select>
            {errors.activity_level && <p className="text-sm text-destructive">{errors.activity_level.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="agni">Agni (Digestive Strength) *</Label>
            <Select onValueChange={(value) => setValue("agni", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select digestive strength" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weak">Weak (Poor digestion, bloating, gas)</SelectItem>
                <SelectItem value="Moderate">Moderate (Normal digestion)</SelectItem>
                <SelectItem value="Strong">Strong (Excellent digestion, can eat anything)</SelectItem>
              </SelectContent>
            </Select>
            {errors.agni && <p className="text-sm text-destructive">{errors.agni.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleep_pattern">Sleep Pattern *</Label>
            <div className="relative">
              <Bed className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="sleep_pattern"
                {...register("sleep_pattern")}
                placeholder="e.g., 7-8 hours, 10 PM - 6 AM"
                className="pl-10"
              />
            </div>
            {errors.sleep_pattern && <p className="text-sm text-destructive">{errors.sleep_pattern.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="water_intake">Daily Water Intake *</Label>
            <div className="relative">
              <Droplets className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="water_intake"
                {...register("water_intake")}
                placeholder="e.g., 2-3 liters, 8-10 glasses"
                className="pl-10"
              />
            </div>
            {errors.water_intake && <p className="text-sm text-destructive">{errors.water_intake.message}</p>}
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="bowel_movements">Bowel Movement Pattern *</Label>
            <Input
              id="bowel_movements"
              {...register("bowel_movements")}
              placeholder="e.g., Once daily, regular, constipated, loose"
            />
            {errors.bowel_movements && <p className="text-sm text-destructive">{errors.bowel_movements.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button variant="outline" type="button" asChild>
          <a href="/dashboard/patients">Cancel</a>
        </Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating Patient...
            </>
          ) : (
            "Continue to Prakriti Assessment"
          )}
        </Button>
      </div>
    </form>
  )
}
