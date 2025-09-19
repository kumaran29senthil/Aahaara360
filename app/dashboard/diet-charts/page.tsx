import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DietChartCard } from "@/components/diet-charts/diet-chart-card"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Plus, Search, FileText } from "lucide-react"

// Mock diet chart data
const mockDietCharts = [
  {
    id: "1",
    patient_id: "1",
    patient_name: "Priya Sharma",
    patient_prakriti: "Vata-Pitta",
    dietitian_id: "1",
    goal: "Weight management and digestive health",
    exclusions: ["Dairy", "Gluten"],
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
    status: "Active",
  },
  {
    id: "2",
    patient_id: "2",
    patient_name: "Rajesh Kumar",
    patient_prakriti: "Kapha-Vata",
    dietitian_id: "1",
    goal: "Diabetes management and weight loss",
    exclusions: ["Sugar", "Refined carbs"],
    created_at: "2024-01-14T10:00:00Z",
    updated_at: "2024-01-14T10:00:00Z",
    status: "Active",
  },
  {
    id: "3",
    patient_id: "3",
    patient_name: "Anita Patel",
    patient_prakriti: "Pitta",
    dietitian_id: "1",
    goal: "PCOS management and hormonal balance",
    exclusions: ["Spicy foods", "Caffeine"],
    created_at: "2024-01-13T10:00:00Z",
    updated_at: "2024-01-13T10:00:00Z",
    status: "Draft",
  },
]

export default function DietChartsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Diet Charts</h1>
            <p className="text-muted-foreground text-pretty">
              Create and manage personalized Ayurvedic diet plans for your patients
            </p>
          </div>
          <Button asChild className="gap-2">
            <a href="/dashboard/diet-charts/new">
              <Plus className="h-4 w-4" />
              Create Diet Chart
            </a>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by patient name or goal..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Prakriti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vata">Vata</SelectItem>
                    <SelectItem value="pitta">Pitta</SelectItem>
                    <SelectItem value="kapha">Kapha</SelectItem>
                    <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                    <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                    <SelectItem value="kapha-vata">Kapha-Vata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diet Charts Grid */}
        <Suspense fallback={<div>Loading diet charts...</div>}>
          {mockDietCharts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDietCharts.map((chart) => (
                <DietChartCard key={chart.id} dietChart={chart} />
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No diet charts yet</h3>
                  <p className="text-muted-foreground text-pretty max-w-md">
                    Start creating personalized Ayurvedic diet plans for your patients
                  </p>
                </div>
                <Button asChild className="gap-2">
                  <a href="/dashboard/diet-charts/new">
                    <Plus className="h-4 w-4" />
                    Create Your First Diet Chart
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
