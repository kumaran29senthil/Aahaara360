"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, Loader2 } from "lucide-react"

interface PDFExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dietChart: any
  patient: any
}

export function PDFExportDialog({ open, onOpenChange, dietChart, patient }: PDFExportDialogProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportOptions, setExportOptions] = useState({
    includeNutritionAnalysis: true,
    includeAyurvedicNotes: true,
    includePatientInfo: true,
    includeInstructions: true,
    customNotes: "",
    clinicName: "Aahaara360 Wellness Center",
    doctorName: "Dr. Sarah Johnson",
  })

  const handleExport = async () => {
    setIsExporting(true)

    try {
      const pdfContent = generatePDFContent()

      // Create a blob with actual content
      const blob = new Blob([pdfContent], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      const element = document.createElement("a")
      element.href = url
      element.download = `${patient?.name || "Patient"}_Diet_Chart_${new Date().toISOString().split("T")[0]}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      // Clean up the URL
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Failed to export PDF:", error)
    }

    setIsExporting(false)
    onOpenChange(false)
  }

  const generatePDFContent = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const mealTypes = ["breakfast", "lunch", "dinner", "snacks"]

    let content = `PERSONALIZED AYURVEDIC DIET CHART\n`
    content += `${exportOptions.clinicName}\n`
    content += `${exportOptions.doctorName}\n`
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`

    if (exportOptions.includePatientInfo && patient) {
      content += `PATIENT INFORMATION:\n`
      content += `Name: ${patient.name}\n`
      content += `Age: ${patient.age} years\n`
      content += `Gender: ${patient.gender}\n`
      content += `Constitution (Prakriti): ${patient.prakriti || "Not assessed"}\n`
      if (patient.healthConditions?.length > 0) {
        content += `Health Conditions: ${patient.healthConditions.join(", ")}\n`
      }
      if (patient.allergies?.length > 0) {
        content += `Allergies: ${patient.allergies.join(", ")}\n`
      }
      content += `\n`
    }

    content += `WEEKLY MEAL PLAN:\n\n`

    days.forEach((day) => {
      content += `${day.toUpperCase()}:\n`
      content += `${"=".repeat(day.length + 1)}\n`

      mealTypes.forEach((mealType) => {
        const meals = dietChart?.[day.toLowerCase()]?.[mealType] || []
        content += `\n${mealType.charAt(0).toUpperCase() + mealType.slice(1)}:\n`

        if (meals.length > 0) {
          meals.forEach((meal: any) => {
            content += `• ${meal.food_name} - ${meal.quantity} ${meal.unit} (${meal.calories} cal)\n`
          })
        } else {
          content += `• No meals planned for this time\n`
        }
      })
      content += `\n`
    })

    if (exportOptions.includeInstructions) {
      content += `DIETARY GUIDELINES:\n`
      content += `• Eat meals at regular times\n`
      content += `• Drink warm water throughout the day\n`
      content += `• Avoid processed and packaged foods\n`
      content += `• Include all six tastes in your meals\n`
      content += `• Eat according to your constitution\n\n`
    }

    if (exportOptions.customNotes) {
      content += `ADDITIONAL NOTES:\n`
      content += `${exportOptions.customNotes}\n\n`
    }

    content += `This diet chart has been prepared based on Ayurvedic principles.\n`
    content += `Please consult with your healthcare provider before making significant dietary changes.\n`

    return content
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Export Diet Chart as PDF
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Clinic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Clinic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="clinicName">Clinic Name</Label>
                <Input
                  id="clinicName"
                  value={exportOptions.clinicName}
                  onChange={(e) => setExportOptions((prev) => ({ ...prev, clinicName: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="doctorName">Doctor Name</Label>
                <Input
                  id="doctorName"
                  value={exportOptions.doctorName}
                  onChange={(e) => setExportOptions((prev) => ({ ...prev, doctorName: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <h3 className="font-semibold">Include in PDF</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="patientInfo"
                  checked={exportOptions.includePatientInfo}
                  onCheckedChange={(checked) =>
                    setExportOptions((prev) => ({ ...prev, includePatientInfo: checked as boolean }))
                  }
                />
                <Label htmlFor="patientInfo">Patient Information & Constitution</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nutritionAnalysis"
                  checked={exportOptions.includeNutritionAnalysis}
                  onCheckedChange={(checked) =>
                    setExportOptions((prev) => ({ ...prev, includeNutritionAnalysis: checked as boolean }))
                  }
                />
                <Label htmlFor="nutritionAnalysis">Nutrition Analysis & Macros</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ayurvedicNotes"
                  checked={exportOptions.includeAyurvedicNotes}
                  onCheckedChange={(checked) =>
                    setExportOptions((prev) => ({ ...prev, includeAyurvedicNotes: checked as boolean }))
                  }
                />
                <Label htmlFor="ayurvedicNotes">Ayurvedic Properties & Recommendations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="instructions"
                  checked={exportOptions.includeInstructions}
                  onCheckedChange={(checked) =>
                    setExportOptions((prev) => ({ ...prev, includeInstructions: checked as boolean }))
                  }
                />
                <Label htmlFor="instructions">Dietary Instructions & Guidelines</Label>
              </div>
            </div>
          </div>

          {/* Custom Notes */}
          <div className="space-y-2">
            <Label htmlFor="customNotes">Additional Notes (Optional)</Label>
            <Textarea
              id="customNotes"
              placeholder="Add any custom notes or instructions for the patient..."
              value={exportOptions.customNotes}
              onChange={(e) => setExportOptions((prev) => ({ ...prev, customNotes: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Export Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
