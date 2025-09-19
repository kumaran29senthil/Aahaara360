import { RegisterForm } from "@/components/auth/register-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
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
            <h2 className="text-xl font-semibold text-balance">Join Our Platform</h2>
            <p className="text-muted-foreground text-pretty">Create your dietitian account to start helping patients</p>
          </div>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Register as a certified dietitian</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/" className="text-primary hover:underline font-medium">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
