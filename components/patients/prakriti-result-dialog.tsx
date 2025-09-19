"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, User, Activity, Droplets } from "lucide-react"

interface PrakritiResultDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prakritiResult: string
  patientData: any
  quizAnswers: Record<number, "vata" | "pitta" | "kapha">
  scores: { vata: number; pitta: number; kapha: number }
}

const doshaDescriptions = {
  vata: {
    name: "Vata",
    element: "Air & Space",
    characteristics: "Creative, energetic, quick-thinking, but prone to anxiety and irregular patterns",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: Activity,
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    characteristics: "Intelligent, focused, goal-oriented, but prone to anger and inflammation",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: Droplets,
  },
  kapha: {
    name: "Kapha",
    element: "Earth & Water",
    characteristics: "Calm, stable, nurturing, but prone to sluggishness and weight gain",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: User,
  },
}

export function PrakritiResultDialog({
  open,
  onOpenChange,
  prakritiResult,
  patientData,
  quizAnswers,
  scores,
}: PrakritiResultDialogProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleConfirm = async () => {
    setIsCreating(true)

    try {
      const completePatientData = {
        ...patientData,
        prakriti: prakritiResult,
        prakriti_scores: scores,
        quiz_answers: quizAnswers,
      }

      console.log("[v0] Creating patient with prakriti:", completePatientData)

      // Simulate API call to create patient
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsComplete(true)

      setTimeout(() => {
        window.location.href = "/dashboard/patients"
      }, 2000)
    } catch (error) {
      console.error("[v0] Failed to create patient:", error)
      alert("Failed to create patient. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  const getDominantDoshas = () => {
    if (!prakritiResult) return []

    // Handle different prakriti result formats
    if (prakritiResult.includes("Tri-doshic")) {
      return ["vata", "pitta", "kapha"]
    }

    // Split by dash and normalize to lowercase, filter out invalid doshas
    const doshas = prakritiResult
      .toLowerCase()
      .split("-")
      .map((dosha) => dosha.trim())
      .filter((dosha) => ["vata", "pitta", "kapha"].includes(dosha))

    return doshas
  }

  const getScorePercentage = (dosha: "vata" | "pitta" | "kapha") => {
    return (scores[dosha] / 10) * 100
  }

  if (isComplete) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4 py-6">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Patient Created Successfully!</h3>
              <p className="text-muted-foreground">
                {patientData.name} has been added to your practice with their Prakriti assessment.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Prakriti Assessment Complete</DialogTitle>
          <DialogDescription>
            Based on the quiz responses, here is {patientData.name}'s Ayurvedic constitution
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Result */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-primary">{prakritiResult}</CardTitle>
              <p className="text-muted-foreground">Dominant Ayurvedic Constitution</p>
            </CardHeader>
          </Card>

          {/* Dosha Scores */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detailed Dosha Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(scores).map(([dosha, score]) => {
                const doshaInfo = doshaDescriptions[dosha as keyof typeof doshaDescriptions]
                const percentage = getScorePercentage(dosha as "vata" | "pitta" | "kapha")

                return (
                  <div key={dosha} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <doshaInfo.icon className={`h-4 w-4 ${doshaInfo.color}`} />
                        <span className="font-medium capitalize">{dosha}</span>
                        <Badge variant="outline">{doshaInfo.element}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{score}/10</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Dominant Dosha Characteristics */}
          <div className="space-y-4">
            {getDominantDoshas().map((dosha) => {
              const doshaInfo = doshaDescriptions[dosha as keyof typeof doshaDescriptions]

              if (!doshaInfo) {
                console.warn(`[v0] Unknown dosha: ${dosha}`)
                return null
              }

              return (
                <Card key={dosha} className={`${doshaInfo.bgColor} ${doshaInfo.borderColor}`}>
                  <CardHeader>
                    <CardTitle className={`${doshaInfo.color} flex items-center space-x-2`}>
                      <doshaInfo.icon className="h-5 w-5" />
                      <span>{doshaInfo.name} Characteristics</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{doshaInfo.characteristics}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Confirmation */}
          <Alert>
            <AlertDescription>
              Please review the assessment results. Once confirmed, this patient profile will be saved to your practice.
            </AlertDescription>
          </Alert>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isCreating}>
              Review Answers
            </Button>
            <Button onClick={handleConfirm} disabled={isCreating} className="gap-2">
              {isCreating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Patient...
                </>
              ) : (
                "Confirm & Save Patient"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
