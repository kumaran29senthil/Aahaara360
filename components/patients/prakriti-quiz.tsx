"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PrakritiResultDialog } from "./prakriti-result-dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PrakritiQuizProps {
  patientData: any
}

const quizQuestions = [
  {
    id: 1,
    question: "Body Frame",
    description: "Overall body structure and build",
    options: {
      vata: "Thin, lean, narrow frame - difficulty gaining weight",
      pitta: "Medium build, well-proportioned - moderate muscle development",
      kapha: "Large, broad frame - tendency to be heavy or stocky",
    },
  },
  {
    id: 2,
    question: "Skin Type",
    description: "Natural skin characteristics and tendencies",
    options: {
      vata: "Dry, rough, thin skin - tends to crack easily",
      pitta: "Soft, oily, warm skin - prone to acne, rashes, or sensitivity",
      kapha: "Thick, moist, cool skin - tends to be greasy or pale",
    },
  },
  {
    id: 3,
    question: "Body Weight Tendency",
    description: "Natural relationship with weight gain/loss",
    options: {
      vata: "Hard to gain weight - loses weight easily when stressed",
      pitta: "Stable weight - can gain or lose weight with effort",
      kapha: "Gains weight easily - very hard to lose weight",
    },
  },
  {
    id: 4,
    question: "Hunger Pattern",
    description: "Natural appetite and eating patterns",
    options: {
      vata: "Irregular, variable appetite - sometimes forgets to eat",
      pitta: "Sharp, urgent hunger - becomes irritable when hungry, cannot skip meals",
      kapha: "Steady, mild hunger - can easily skip meals without discomfort",
    },
  },
  {
    id: 5,
    question: "Weather Tolerance",
    description: "Preferred climate and weather sensitivity",
    options: {
      vata: "Dislikes cold, windy weather - prefers warm, humid climates",
      pitta: "Dislikes hot weather - prefers cool, well-ventilated environments",
      kapha: "Dislikes damp, cool weather - prefers warm, dry climates",
    },
  },
  {
    id: 6,
    question: "Reaction to Stress",
    description: "Typical emotional response under pressure",
    options: {
      vata: "Becomes anxious, worried, or fearful - tends to overthink",
      pitta: "Becomes angry, irritable, or critical - tends to blame others",
      kapha: "Becomes calm, withdrawn, or depressed - tends to avoid confrontation",
    },
  },
  {
    id: 7,
    question: "Pace of Activity",
    description: "Natural speed and style of movement",
    options: {
      vata: "Fast, always moving - restless, does many things at once",
      pitta: "Focused, intense activity - goal-oriented, efficient",
      kapha: "Slow, steady pace - methodical, prefers routine",
    },
  },
  {
    id: 8,
    question: "Sleep Pattern",
    description: "Natural sleep quality and characteristics",
    options: {
      vata: "Light, interrupted sleep - difficulty falling asleep, active dreams",
      pitta: "Moderate, sound sleep - falls asleep easily, vivid dreams",
      kapha: "Deep, heavy sleep - sleeps long hours, few dreams",
    },
  },
  {
    id: 9,
    question: "Bowel Movements",
    description: "Natural digestive elimination patterns",
    options: {
      vata: "Dry, hard, constipated - irregular timing",
      pitta: "Soft, loose, frequent - regular timing, sometimes urgent",
      kapha: "Heavy, slow, regular - well-formed, consistent timing",
    },
  },
  {
    id: 10,
    question: "Hair Type",
    description: "Natural hair characteristics and tendencies",
    options: {
      vata: "Dry, thin, frizzy hair - tends to be brittle or coarse",
      pitta: "Fine, soft hair - tends to thin early or grey prematurely",
      kapha: "Thick, oily, lustrous hair - tends to be wavy or curly",
    },
  },
]

export function PrakritiQuiz({ patientData }: PrakritiQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, "vata" | "pitta" | "kapha">>({})
  const [showResult, setShowResult] = useState(false)
  const [prakritiResult, setPrakritiResult] = useState<string>("")
  const [calculatedScores, setCalculatedScores] = useState<{ vata: number; pitta: number; kapha: number }>({
    vata: 0,
    pitta: 0,
    kapha: 0,
  })

  const handleAnswerChange = useCallback((questionId: number, answer: "vata" | "pitta" | "kapha") => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }, [])

  const calculatePrakriti = useMemo(() => {
    return () => {
      const scores = { vata: 0, pitta: 0, kapha: 0 }

      Object.values(answers).forEach((answer) => {
        scores[answer]++
      })

      // Determine dominant dosha(s)
      const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha)
      const dominantDoshas = Object.entries(scores)
        .filter(([_, score]) => score === maxScore)
        .map(([dosha, _]) => dosha)

      let result = ""
      if (dominantDoshas.length === 1) {
        // Single dominant dosha
        result = dominantDoshas[0].charAt(0).toUpperCase() + dominantDoshas[0].slice(1)
      } else if (dominantDoshas.length === 2) {
        // Dual constitution
        const [first, second] = dominantDoshas.map((d) => d.charAt(0).toUpperCase() + d.slice(1))
        result = `${first}-${second}`
      } else {
        // Tri-doshic (rare)
        result = "Tri-doshic (Vata-Pitta-Kapha)"
      }

      return { result, scores }
    }
  }, [answers])

  const handleNext = useCallback(() => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }, [currentQuestion])

  const handlePrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }, [currentQuestion])

  const handleSubmit = useCallback(() => {
    const { result, scores } = calculatePrakriti()
    setPrakritiResult(result)
    setCalculatedScores(scores)
    setShowResult(true)
  }, [calculatePrakriti])

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const currentQ = quizQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === quizQuestions.length - 1
  const canProceed = answers[currentQ.id] !== undefined
  const allQuestionsAnswered = Object.keys(answers).length === quizQuestions.length

  const currentAnswerValue = answers[currentQ.id]

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          <p className="text-muted-foreground">{currentQ.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(currentQ.options).map(([dosha, description]) => (
              <div
                key={dosha}
                className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleAnswerChange(currentQ.id, dosha as "vata" | "pitta" | "kapha")}
              >
                <div className="flex items-center justify-center w-4 h-4 mt-1">
                  <input
                    type="radio"
                    name={`question-${currentQ.id}`}
                    value={dosha}
                    checked={currentAnswerValue === dosha}
                    onChange={() => handleAnswerChange(currentQ.id, dosha as "vata" | "pitta" | "kapha")}
                    className="w-4 h-4 text-primary border-2 border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                </div>
                <label className="flex-1 cursor-pointer">
                  <div className="font-medium capitalize mb-1">{dosha}</div>
                  <div className="text-sm text-muted-foreground">{description}</div>
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center space-x-2">
          {!isLastQuestion ? (
            <Button onClick={handleNext} disabled={!canProceed} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!allQuestionsAnswered} className="gap-2">
              Complete Assessment
            </Button>
          )}
        </div>
      </div>

      {/* Completion Status */}
      {!allQuestionsAnswered && (
        <Alert>
          <AlertDescription>
            Please answer all questions to complete the Prakriti assessment.
            {Object.keys(answers).length} of {quizQuestions.length} questions answered.
          </AlertDescription>
        </Alert>
      )}

      {/* Result Dialog */}
      <PrakritiResultDialog
        open={showResult}
        onOpenChange={setShowResult}
        prakritiResult={prakritiResult}
        patientData={patientData}
        quizAnswers={answers}
        scores={calculatedScores}
      />
    </div>
  )
}
