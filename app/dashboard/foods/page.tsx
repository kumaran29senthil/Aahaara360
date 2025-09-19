import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FoodCard } from "@/components/foods/food-card"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Plus, Search, Filter } from "lucide-react"
import type { Food } from "@/types"

// Mock food data - will be replaced with Supabase queries
const mockFoods: Food[] = [
  {
    id: "1",
    name: "Basmati Rice",
    calories_per_100g: 365,
    protein_g: 7.1,
    carbs_g: 78.2,
    fat_g: 0.9,
    fiber_g: 1.3,
    rasa: "Sweet",
    guna: "Heavy, Oily",
    virya: "Cooling",
    dosha_effects: {
      vata: "decrease",
      pitta: "decrease",
      kapha: "increase",
    },
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Almonds",
    calories_per_100g: 579,
    protein_g: 21.2,
    carbs_g: 21.6,
    fat_g: 49.9,
    fiber_g: 12.5,
    rasa: "Sweet, Astringent",
    guna: "Heavy, Oily, Hot",
    virya: "Heating",
    dosha_effects: {
      vata: "decrease",
      pitta: "increase",
      kapha: "increase",
    },
    created_at: "2024-01-14T10:00:00Z",
  },
  {
    id: "3",
    name: "Spinach",
    calories_per_100g: 23,
    protein_g: 2.9,
    carbs_g: 3.6,
    fat_g: 0.4,
    fiber_g: 2.2,
    rasa: "Sweet, Bitter, Astringent",
    guna: "Light, Dry, Cold",
    virya: "Cooling",
    dosha_effects: {
      vata: "increase",
      pitta: "decrease",
      kapha: "decrease",
    },
    created_at: "2024-01-13T10:00:00Z",
  },
  {
    id: "4",
    name: "Ginger",
    calories_per_100g: 80,
    protein_g: 1.8,
    carbs_g: 17.8,
    fat_g: 0.8,
    fiber_g: 2.0,
    rasa: "Pungent, Sweet",
    guna: "Light, Oily, Sharp",
    virya: "Heating",
    dosha_effects: {
      vata: "decrease",
      pitta: "increase",
      kapha: "decrease",
    },
    created_at: "2024-01-12T10:00:00Z",
  },
  {
    id: "5",
    name: "Coconut",
    calories_per_100g: 354,
    protein_g: 3.3,
    carbs_g: 15.2,
    fat_g: 33.5,
    fiber_g: 9.0,
    rasa: "Sweet",
    guna: "Heavy, Oily, Cold",
    virya: "Cooling",
    dosha_effects: {
      vata: "decrease",
      pitta: "decrease",
      kapha: "increase",
    },
    created_at: "2024-01-11T10:00:00Z",
  },
  {
    id: "6",
    name: "Turmeric",
    calories_per_100g: 354,
    protein_g: 7.8,
    carbs_g: 64.9,
    fat_g: 9.9,
    fiber_g: 21.1,
    rasa: "Bitter, Pungent",
    guna: "Light, Dry, Sharp",
    virya: "Heating",
    dosha_effects: {
      vata: "increase",
      pitta: "increase",
      kapha: "decrease",
    },
    created_at: "2024-01-10T10:00:00Z",
  },
]

export default function FoodsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Food Database</h1>
            <p className="text-muted-foreground text-pretty">
              Manage foods with modern nutritional data and Ayurvedic properties
            </p>
          </div>
          <Button asChild className="gap-2">
            <a href="/dashboard/foods/new">
              <Plus className="h-4 w-4" />
              Add New Food
            </a>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="border-border/50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search foods by name, rasa, or dosha effects..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Rasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sweet">Sweet</SelectItem>
                    <SelectItem value="sour">Sour</SelectItem>
                    <SelectItem value="salty">Salty</SelectItem>
                    <SelectItem value="pungent">Pungent</SelectItem>
                    <SelectItem value="bitter">Bitter</SelectItem>
                    <SelectItem value="astringent">Astringent</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Virya" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heating">Heating</SelectItem>
                    <SelectItem value="cooling">Cooling</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Dosha Effect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vata-decrease">Decreases Vata</SelectItem>
                    <SelectItem value="pitta-decrease">Decreases Pitta</SelectItem>
                    <SelectItem value="kapha-decrease">Decreases Kapha</SelectItem>
                    <SelectItem value="vata-increase">Increases Vata</SelectItem>
                    <SelectItem value="pitta-increase">Increases Pitta</SelectItem>
                    <SelectItem value="kapha-increase">Increases Kapha</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Foods Grid */}
        <Suspense fallback={<div>Loading foods...</div>}>
          {mockFoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFoods.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">No foods in database</h3>
                  <p className="text-muted-foreground text-pretty max-w-md">
                    Start building your food database by adding foods with their nutritional and Ayurvedic properties
                  </p>
                </div>
                <Button asChild className="gap-2">
                  <a href="/dashboard/foods/new">
                    <Plus className="h-4 w-4" />
                    Add Your First Food
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </Suspense>
      </div>
    </DashboardLayout>
  )
}
