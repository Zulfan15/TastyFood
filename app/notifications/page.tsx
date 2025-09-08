"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconBell, IconUser, IconMapPin, IconClock, IconCheck } from "@tabler/icons-react"

const notifications = [
  {
    id: 1,
    type: "request",
    title: "New food request",
    message: "Sarah requested your donated rice and vegetables",
    time: "2 minutes ago",
    unread: true,
    action: "View Request"
  },
  {
    id: 2,
    type: "pickup",
    title: "Pickup scheduled",
    message: "Ahmad will pick up your bread donation today at 3 PM",
    time: "1 hour ago",
    unread: true,
    action: "View Details"
  },
  {
    id: 3,
    type: "completed",
    title: "Donation completed",
    message: "Your fruits donation was successfully picked up by Maria",
    time: "2 hours ago",
    unread: false,
    action: "Rate Experience"
  },
  {
    id: 4,
    type: "reminder",
    title: "Pickup reminder",
    message: "Don't forget: pickup scheduled in 30 minutes",
    time: "3 hours ago",
    unread: false,
    action: "View"
  },
  {
    id: 5,
    type: "community",
    title: "Community update",
    message: "You've helped save 50kg of food this month! 🎉",
    time: "1 day ago",
    unread: false,
    action: "View Impact"
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "request":
      return <IconUser className="size-5 text-blue-600" />
    case "pickup":
      return <IconMapPin className="size-5 text-green-600" />
    case "completed":
      return <IconCheck className="size-5 text-emerald-600" />
    case "reminder":
      return <IconClock className="size-5 text-orange-600" />
    case "community":
      return <IconBell className="size-5 text-purple-600" />
    default:
      return <IconBell className="size-5 text-content-secondary" />
  }
}

const getNotificationColor = (type: string) => {
  switch (type) {
    case "request":
      return "bg-blue-50 border-blue-200"
    case "pickup":
      return "bg-green-50 border-green-200"
    case "completed":
      return "bg-emerald-50 border-emerald-200"
    case "reminder":
      return "bg-orange-50 border-orange-200"
    case "community":
      return "bg-purple-50 border-purple-200"
    default:
      return "bg-gray-50 border-gray-200"
  }
}

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-800 mb-2">Notifications</h1>
              <p className="text-content-secondary">Stay updated with your food sharing activities</p>
            </div>
            <div className="flex items-center gap-4">
              {unreadCount > 0 && (
                <Badge variant="destructive">
                  {unreadCount} new
                </Badge>
              )}
              <Button variant="outline" size="sm">
                Mark all as read
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md ${
                notification.unread 
                  ? `${getNotificationColor(notification.type)} border-l-4` 
                  : "bg-white"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className={`font-semibold ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <p className="text-content-secondary mt-1">
                          {notification.message}
                        </p>
                        <p className="text-sm text-content-muted mt-2">
                          {notification.time}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {notification.unread && (
                          <div className="size-2 bg-blue-600 rounded-full"></div>
                        )}
                        <Button variant="outline" size="sm">
                          {notification.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <IconBell className="size-12 text-content-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-content-secondary mb-2">No notifications yet</h3>
              <p className="text-content-muted">
                When you start sharing or requesting food, you&apos;ll see updates here
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
