import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PatientSelector } from "@/components/diet-charts/patient-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewDietChartPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Create Diet Chart</h1>
            <p className="text-muted-foreground text-pretty">
              Generate a personalized Ayurvedic diet plan for your patient using AI recommendations
            </p>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Select Patient</CardTitle>
              <CardDescription>Choose a patient to create their personalized diet chart</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading patients...</div>}>
                <PatientSelector />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
