import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Patients",
      value: "127",
      change: "+12 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Appointments Today",
      value: "8",
      change: "3 remaining",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Diet Charts Created",
      value: "45",
      change: "+8 this week",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2% improvement",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
