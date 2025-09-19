export interface Patient {
  id: string
  dietitian_id: string

  // Basic Info
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  height: number // in cm
  weight: number // in kg
  phone: string
  email: string

  // Medical Info
  medical_history: string
  current_medications: string
  allergies: string

  // Ayurvedic Info
  activity_level: "Sedentary" | "Lightly Active" | "Moderately Active" | "Very Active"
  sleep_pattern: string
  water_intake: string
  bowel_movements: string
  agni: "Weak" | "Moderate" | "Strong"

  // Prakriti Assessment Result
  prakriti: string // e.g., 'Vata-Pitta', 'Kapha', etc.

  created_at: string
  updated_at: string
}

export interface Food {
  id: string
  name: string
  calories_per_100g: number
  protein_g: number
  carbs_g: number
  fat_g: number
  fiber_g: number

  // Ayurvedic Properties
  rasa: string // taste
  guna: string // qualities
  virya: string // potency
  dosha_effects: {
    vata: "increase" | "decrease" | "neutral"
    pitta: "increase" | "decrease" | "neutral"
    kapha: "increase" | "decrease" | "neutral"
  }

  created_at: string
}

export interface DietChart {
  id: string
  patient_id: string
  dietitian_id: string
  goal: string
  exclusions: string[]

  // 7-day meal plan
  meal_plan: {
    [day: string]: {
      breakfast: MealItem[]
      lunch: MealItem[]
      dinner: MealItem[]
      snacks: MealItem[]
    }
  }

  created_at: string
  updated_at: string
}

export interface MealItem {
  food_id: string
  food_name: string
  quantity: number
  unit: string
  calories: number
}

export interface PrakritiQuizAnswer {
  question: string
  vata_option: string
  pitta_option: string
  kapha_option: string
  selected: "vata" | "pitta" | "kapha"
}
