"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  IconLeaf, 
  IconUsers, 
  IconPackage, 
  IconTrendingUp,
  IconAward,
  IconHeart,
  IconRecycle,
  IconWorld
} from "@tabler/icons-react"

const impactStats = {
  foodSaved: {
    total: 127.5,
    unit: "kg",
    thisMonth: 23.2,
    growth: 15
  },
  peopleFed: {
    total: 89,
    thisMonth: 16,
    growth: 12
  },
  donationsShared: {
    total: 34,
    thisMonth: 6,
    growth: 8
  },
  co2Saved: {
    total: 382.5,
    unit: "kg CO₂",
    thisMonth: 69.6,
    growth: 15
  }
}

const achievements = [
  {
    id: 1,
    title: "First Share",
    description: "Shared your first donation",
    icon: IconHeart,
    earned: true,
    date: "2 weeks ago"
  },
  {
    id: 2,
    title: "Food Saver",
    description: "Saved 50kg of food from waste",
    icon: IconRecycle,
    earned: true,
    date: "1 week ago"
  },
  {
    id: 3,
    title: "Community Helper",
    description: "Helped 25 people with food",
    icon: IconUsers,
    earned: true,
    date: "3 days ago"
  },
  {
    id: 4,
    title: "Eco Warrior",
    description: "Prevented 100kg CO₂ emissions",
    icon: IconLeaf,
    earned: false,
    progress: 75
  },
  {
    id: 5,
    title: "Global Impact",
    description: "Contributed to 1000kg global food savings",
    icon: IconWorld,
    earned: false,
    progress: 12
  }
]

const monthlyGoals = [
  {
    title: "Food Saved",
    target: 30,
    current: 23.2,
    unit: "kg"
  },
  {
    title: "People Helped",
    target: 20,
    current: 16,
    unit: "people"
  },
  {
    title: "Donations",
    target: 8,
    current: 6,
    unit: "donations"
  }
]

export default function ImpactPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Your Impact Dashboard</h1>
          <p className="text-content-secondary">See how you&apos;re making a difference in fighting food waste</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Food Saved</p>
                  <p className="text-2xl font-bold text-green-800">
                    {impactStats.foodSaved.total} <span className="text-sm font-normal">kg</span>
                  </p>
                  <div className="flex items-center mt-2">
                    <IconTrendingUp className="size-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{impactStats.foodSaved.growth}% this month</span>
                  </div>
                </div>
                <IconLeaf className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">People Fed</p>
                  <p className="text-2xl font-bold text-blue-800">{impactStats.peopleFed.total}</p>
                  <div className="flex items-center mt-2">
                    <IconTrendingUp className="size-4 text-blue-600 mr-1" />
                    <span className="text-sm text-blue-600">+{impactStats.peopleFed.growth}% this month</span>
                  </div>
                </div>
                <IconUsers className="size-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Donations</p>
                  <p className="text-2xl font-bold text-purple-800">{impactStats.donationsShared.total}</p>
                  <div className="flex items-center mt-2">
                    <IconTrendingUp className="size-4 text-purple-600 mr-1" />
                    <span className="text-sm text-purple-600">+{impactStats.donationsShared.growth}% this month</span>
                  </div>
                </div>
                <IconPackage className="size-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {impactStats.co2Saved.total} <span className="text-sm font-normal">kg</span>
                  </p>
                  <div className="flex items-center mt-2">
                    <IconTrendingUp className="size-4 text-orange-600 mr-1" />
                    <span className="text-sm text-orange-600">+{impactStats.co2Saved.growth}% this month</span>
                  </div>
                </div>
                <IconWorld className="size-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconTrendingUp className="size-5 text-green-600" />
                Monthly Goals
              </CardTitle>
              <CardDescription>Track your progress towards this month&apos;s targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {monthlyGoals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-sm text-content-secondary">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="text-xs text-content-muted mt-1">
                      {Math.round(progress)}% complete
                    </p>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconAward className="size-5 text-yellow-600" />
                Achievements
              </CardTitle>
              <CardDescription>Your milestones in fighting food waste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className={`p-2 rounded-full ${
                    achievement.earned 
                      ? 'bg-yellow-100 text-yellow-600' 
                      : 'bg-gray-100 text-content-muted'
                  }`}>
                    <achievement.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.earned ? 'text-gray-900' : 'text-content-secondary'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-content-secondary">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="secondary" className="mt-1">
                        Earned {achievement.date}
                      </Badge>
                    ) : (
                      <div className="mt-2">
                        <Progress value={achievement.progress} className="h-2" />
                        <p className="text-xs text-content-muted mt-1">
                          {achievement.progress}% complete
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconWorld className="size-5 text-green-600" />
              Environmental Impact
            </CardTitle>
            <CardDescription>
              Understanding the environmental benefits of your food sharing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <IconLeaf className="size-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800">Water Saved</h4>
                <p className="text-2xl font-bold text-green-700">2,550L</p>
                <p className="text-sm text-green-600">Equivalent to 10 baths</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <IconRecycle className="size-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800">Waste Prevented</h4>
                <p className="text-2xl font-bold text-blue-700">127.5kg</p>
                <p className="text-sm text-blue-600">From going to landfill</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <IconWorld className="size-8 text-orange-600 mx-auto mb-2" />
                <h4 className="font-semibold text-orange-800">Carbon Footprint</h4>
                <p className="text-2xl font-bold text-orange-700">382.5kg CO₂</p>
                <p className="text-sm text-orange-600">Emissions prevented</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
