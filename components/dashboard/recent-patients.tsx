import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit } from "lucide-react"

export function RecentPatients() {
  const patients = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 32,
      prakriti: "Vata-Pitta",
      lastVisit: "2024-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      age: 45,
      prakriti: "Kapha-Vata",
      lastVisit: "2024-01-14",
      status: "Follow-up",
    },
    {
      id: 3,
      name: "Anita Patel",
      age: 28,
      prakriti: "Pitta",
      lastVisit: "2024-01-13",
      status: "Active",
    },
    {
      id: 4,
      name: "Vikram Singh",
      age: 38,
      prakriti: "Vata",
      lastVisit: "2024-01-12",
      status: "Completed",
    },
  ]

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{patient.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {patient.prakriti}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Age: {patient.age} • Last visit: {patient.lastVisit}
                </p>
                <Badge
                  variant={
                    patient.status === "Active" ? "default" : patient.status === "Follow-up" ? "secondary" : "outline"
                  }
                  className="text-xs"
                >
                  {patient.status}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
