import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PatientCard } from "@/components/patients/patient-card"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Plus, Search } from "lucide-react"

// Mock data - will be replaced with Supabase queries
const mockPatients = [
  {
    id: "1",
    dietitian_id: "1",
    name: "Priya Sharma",
    age: 32,
    gender: "Female" as const,
    height: 165,
    weight: 58,
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    medical_history: "No major medical issues",
    current_medications: "None",
    allergies: "None",
    activity_level: "Moderately Active" as const,
    sleep_pattern: "7-8 hours",
    water_intake: "2-3 liters",
    bowel_movements: "Regular",
    agni: "Moderate" as const,
    prakriti: "Vata-Pitta",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    dietitian_id: "1",
    name: "Rajesh Kumar",
    age: 45,
    gender: "Male" as const,
    height: 175,
    weight: 78,
    phone: "+91 98765 43211",
    email: "rajesh.kumar@email.com",
    medical_history: "Diabetes Type 2",
    current_medications: "Metformin",
    allergies: "Nuts",
    activity_level: "Lightly Active" as const,
    sleep_pattern: "6-7 hours",
    water_intake: "2 liters",
    bowel_movements: "Irregular",
    agni: "Weak" as const,
    prakriti: "Kapha-Vata",
    created_at: "2024-01-14T10:00:00Z",
    updated_at: "2024-01-14T10:00:00Z",
  },
  {
    id: "3",
    dietitian_id: "1",
    name: "Anita Patel",
    age: 28,
    gender: "Female" as const,
    height: 160,
    weight: 52,
    phone: "+91 98765 43212",
    email: "anita.patel@email.com",
    medical_history: "PCOS",
    current_medications: "Birth control",
    allergies: "Dairy",
    activity_level: "Very Active" as const,
    sleep_pattern: "8-9 hours",
    water_intake: "3 liters",
    bowel_movements: "Regular",
    agni: "Strong" as const,
    prakriti: "Pitta",
    created_at: "2024-01-13T10:00:00Z",
    updated_at: "2024-01-13T10:00:00Z",
  },
]

export default function PatientsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Patient Management</h1>
            <p className="text-muted-foreground text-pretty">Manage your patients and their Ayurvedic profiles</p>
          </div>
          <Button asChild className="gap-2">
            <a href="/dashboard/patients/new">
              <Plus className="h-4 w-4" />
              Add New Patient
            </a>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients by name, email, or prakriti..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <Suspense fallback={<div>Loading patients...</div>}>
          {mockPatients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No patients yet</h3>
                  <p className="text-muted-foreground text-pretty max-w-md">
                    Start building your practice by adding your first patient and creating their Ayurvedic profile
                  </p>
                </div>
                <Button asChild className="gap-2">
                  <a href="/dashboard/patients/new">
                    <Plus className="h-4 w-4" />
                    Add Your First Patient
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
