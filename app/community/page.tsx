import { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Heart, 
  Award, 
  TrendingUp, 
  MapPin, 
  Calendar,
  MessageCircle,
  Share
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community - FoodShare Platform",
  description: "Connect with the FoodShare community and see collective impact",
};

// Mock data
const communityStats = {
  totalMembers: 1247,
  activeDonors: 523,
  foodSaved: "2.3 tons",
  co2Reduced: "890 kg"
};

const topContributors = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder-avatar.png",
    donations: 47,
    foodSaved: "120 kg",
    badge: "Gold Saver",
    location: "Jakarta Selatan"
  },
  {
    id: "2", 
    name: "Green Farm Co.",
    avatar: "/placeholder-avatar.png",
    donations: 89,
    foodSaved: "340 kg",
    badge: "Super Donor",
    location: "Jakarta Barat"
  },
  {
    id: "3",
    name: "Ahmad Rahman",
    avatar: "/placeholder-avatar.png", 
    donations: 32,
    foodSaved: "85 kg",
    badge: "Community Hero",
    location: "Jakarta Pusat"
  }
];

const recentActivities = [
  {
    id: "1",
    user: "Maria Santos",
    action: "donated 5kg of fresh vegetables",
    time: "2 hours ago",
    location: "Menteng",
    likes: 12
  },
  {
    id: "2",
    user: "Happy Family Restaurant", 
    action: "shared 20 portions of cooked meals",
    time: "4 hours ago",
    location: "Kemang",
    likes: 28
  },
  {
    id: "3",
    user: "Local Bakery",
    action: "donated surplus bread and pastries",
    time: "6 hours ago", 
    location: "Senayan",
    likes: 15
  },
  {
    id: "4",
    user: "Community Center",
    action: "successfully distributed food to 50 families",
    time: "1 day ago",
    location: "Cibubur",
    likes: 45
  }
];

const impactStories = [
  {
    id: "1",
    title: "Local Restaurant Saves 500kg of Food in One Month",
    summary: "Green Bistro partnered with FoodShare to redirect surplus food to local shelters...",
    author: "FoodShare Team",
    date: "3 days ago",
    image: "/placeholder-story.jpg",
    category: "Success Story"
  },
  {
    id: "2",
    title: "Community Garden Initiative Reduces Waste by 60%",
    summary: "The Bekasi Community Garden project has shown remarkable results...",
    author: "Jakarta Green",
    date: "1 week ago", 
    image: "/placeholder-story.jpg",
    category: "Environmental"
  }
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BrandLogo size="sm" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              FoodShare Community
            </h1>
          </div>
          <p className="text-gray-600">
            Connect with fellow food warriors and see our collective impact 🌍
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{communityStats.totalMembers}</div>
              <div className="text-sm text-gray-600">Community Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{communityStats.activeDonors}</div>
              <div className="text-sm text-gray-600">Active Donors</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{communityStats.foodSaved}</div>
              <div className="text-sm text-gray-600">Food Saved</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{communityStats.co2Reduced}</div>
              <div className="text-sm text-gray-600">CO₂ Reduced</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="activity" className="space-y-6">
          <TabsList>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
            <TabsTrigger value="stories">Impact Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Community Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarFallback>
                        {activity.user.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="text-sm">
                        <span className="font-semibold text-green-700">{activity.user}</span>
                        {" " + activity.action}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <span>{activity.time}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {activity.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {activity.likes}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top Contributors This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-gold">
                          #{index + 1}
                        </div>
                        <Avatar>
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback>
                            {contributor.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold">{contributor.name}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {contributor.location}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className="mb-1" variant="secondary">
                          {contributor.badge}
                        </Badge>
                        <div className="text-sm">
                          <div>{contributor.donations} donations</div>
                          <div className="text-green-600 font-medium">{contributor.foodSaved} saved</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stories" className="space-y-4">
            {impactStories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {story.category}
                      </Badge>
                      <CardTitle className="text-lg">{story.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{story.summary}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>By {story.author} • {story.date}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
