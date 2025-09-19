import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentPatients } from "@/components/dashboard/recent-patients"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">Welcome back, Dr. Johnson</h1>
          <p className="text-muted-foreground text-pretty">
            Here's an overview of your practice and recent patient activity
          </p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentPatients />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
