import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Eye, Edit, Download, Calendar, Target, AlertCircle } from "lucide-react"

interface DietChartCardProps {
  dietChart: {
    id: string
    patient_id: string
    patient_name: string
    patient_prakriti: string
    goal: string
    exclusions: string[]
    created_at: string
    status: string
  }
}

export function DietChartCard({ dietChart }: DietChartCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrakritiColor = (prakriti: string) => {
    if (prakriti.includes("Vata")) return "bg-blue-100 text-blue-800"
    if (prakriti.includes("Pitta")) return "bg-red-100 text-red-800"
    if (prakriti.includes("Kapha")) return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="border-border/50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {getInitials(dietChart.patient_name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold">{dietChart.patient_name}</h3>
              <Badge className={`text-xs ${getPrakritiColor(dietChart.patient_prakriti)}`}>
                {dietChart.patient_prakriti}
              </Badge>
            </div>
          </div>
          <Badge className={`text-xs ${getStatusColor(dietChart.status)}`}>{dietChart.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Goal */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Target className="h-3 w-3" />
            <span className="font-medium">Goal</span>
          </div>
          <p className="text-sm line-clamp-2">{dietChart.goal}</p>
        </div>

        {/* Exclusions */}
        {dietChart.exclusions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <AlertCircle className="h-3 w-3" />
              <span className="font-medium">Exclusions</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {dietChart.exclusions.slice(0, 3).map((exclusion, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {exclusion}
                </Badge>
              ))}
              {dietChart.exclusions.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{dietChart.exclusions.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>Created {formatDate(dietChart.created_at)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
