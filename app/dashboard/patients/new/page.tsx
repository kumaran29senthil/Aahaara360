import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PatientForm } from "@/components/patients/patient-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewPatientPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Add New Patient</h1>
            <p className="text-muted-foreground text-pretty">
              Create a comprehensive patient profile including Ayurvedic assessment
            </p>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                Fill in the patient's details. After submitting, you'll complete the Prakriti assessment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
