// src/app/dashboard/page.tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { ProtectedRoute } from '../(auth)/ProtectedRoute'
import { LogOut, Plus, Calendar, Users, Settings } from 'lucide-react'

function DashboardContent() {
  const { user, profile, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Event Management
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {profile?.full_name || user?.email}
              </span>
              
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                Welcome to your Dashboard
              </h2>
              <p className="text-sm text-gray-500">
                Manage your events, track registrations, and engage with your audience.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Plus className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Create Event</p>
                  <p className="text-sm text-gray-500">Start a new event</p>
                </div>
              </div>
            </button>

            <button className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-green-600 group-hover:text-green-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">My Events</p>
                  <p className="text-sm text-gray-500">View all events</p>
                </div>
              </div>
            </button>

            <button className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-purple-600 group-hover:text-purple-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Attendees</p>
                  <p className="text-sm text-gray-500">Manage registrations</p>
                </div>
              </div>
            </button>

            <button className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow group">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Settings className="h-8 w-8 text-gray-600 group-hover:text-gray-700" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Settings</p>
                  <p className="text-sm text-gray-500">Account settings</p>
                </div>
              </div>
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Events
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Attendees
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Upcoming Events
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">0</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Events
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your latest event activity
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6 text-center">
                <div className="text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">No events created yet</p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}