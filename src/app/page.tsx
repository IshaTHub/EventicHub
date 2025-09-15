// src/app/page.tsx
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { Calendar, Users, Ticket, Mail } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Event Management Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, manage, and host amazing events with our comprehensive platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Guest Management</h3>
            <p className="text-gray-600 text-sm">
              Manage attendees and track RSVPs
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Ticket className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ticketing</h3>
            <p className="text-gray-600 text-sm">
              Create and sell event tickets
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Invites & Reminders</h3>
            <p className="text-gray-600 text-sm">
              Send invitations and automated reminders
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Event Calendar</h3>
            <p className="text-gray-600 text-sm">
              Schedule and view all your events
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="mr-4">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>

        <div className="mt-16 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            ✅ Phase 1 Setup Complete!
          </h2>
          <p className="text-green-700">
            Your Event Management Platform foundation is ready. Next, we'll set up the database schema and authentication.
          </p>
        </div>
      </div>
    </div>
  )
}
