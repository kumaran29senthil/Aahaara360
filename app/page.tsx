import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">आ</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Aahaara360</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-balance">Ayurvedic Diet Planning Platform</h2>
            <p className="text-muted-foreground text-pretty">
              Professional tools for dietitians to create personalized Ayurvedic nutrition plans
            </p>
          </div>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to your dietitian account</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="/register" className="text-primary hover:underline font-medium">
              Register as a dietitian
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
