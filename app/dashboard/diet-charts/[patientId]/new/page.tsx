"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DietChartConfiguration } from "@/components/diet-charts/diet-chart-configuration"
import { DietChartGenerator } from "@/components/diet-charts/diet-chart-generator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Activity, Heart } from "lucide-react"

interface NewDietChartPageProps {
  params: {
    patientId: string
  }
}

// Mock patient data
const mockPatient = {
  id: "1",
  name: "Priya Sharma",
  age: 32,
  gender: "Female",
  height: 165,
  weight: 58,
  prakriti: "Vata-Pitta",
  activity_level: "Moderately Active",
  medical_history: "No major medical issues",
  allergies: "None",
  agni: "Moderate",
}

export default function NewDietChartPage({ params }: NewDietChartPageProps) {
  const [currentStep, setCurrentStep] = useState<"configure" | "generate">("configure")
  const [configuration, setConfiguration] = useState<any>(null)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getPrakritiColor = (prakriti: string) => {
    if (prakriti.includes("Vata")) return "bg-blue-100 text-blue-800"
    if (prakriti.includes("Pitta")) return "bg-red-100 text-red-800"
    if (prakriti.includes("Kapha")) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const handleConfigurationComplete = (config: any) => {
    setConfiguration(config)
    setCurrentStep("generate")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Patient Info Header */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {getInitials(mockPatient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-2xl font-bold">{mockPatient.name}</h1>
                      <Badge className={`${getPrakritiColor(mockPatient.prakriti)}`}>{mockPatient.prakriti}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>
                          {mockPatient.age} years, {mockPatient.gender}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Activity className="h-3 w-3" />
                        <span>{mockPatient.activity_level}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>Agni: {mockPatient.agni}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm text-muted-foreground">BMI</div>
                  <div className="text-lg font-semibold">
                    {(mockPatient.weight / (mockPatient.height / 100) ** 2).toFixed(1)}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content */}
          {currentStep === "configure" ? (
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Diet Chart Configuration</CardTitle>
                <CardDescription>
                  Set the goals and preferences for {mockPatient.name}'s personalized diet plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DietChartConfiguration patient={mockPatient} onComplete={handleConfigurationComplete} />
              </CardContent>
            </Card>
          ) : (
            <DietChartGenerator
              patient={mockPatient}
              configuration={configuration}
              onBack={() => setCurrentStep("configure")}
            />
          )}
        </div>
      </main>
    </div>
  )
}
