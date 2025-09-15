// src/types/index.ts

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  event_type: 'virtual' | 'physical' | 'hybrid'
  start_date: string
  end_date: string
  timezone: string
  max_attendees?: number
  is_public: boolean
  status: 'draft' | 'published' | 'cancelled'
  cover_image_url?: string
  venue_address?: string
  zoom_meeting_id?: string
  zoom_meeting_url?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Ticket {
  id: string
  event_id: string
  name: string
  description?: string
  price: number
  quantity_total: number
  quantity_sold: number
  sale_start_date?: string
  sale_end_date?: string
  is_active: boolean
  created_at: string
}

export interface Registration {
  id: string
  event_id: string
  ticket_id?: string
  user_id?: string
  attendee_name: string
  attendee_email: string
  status: 'registered' | 'attended' | 'cancelled'
  registration_date: string
  check_in_time?: string
}

export interface Invitation {
  id: string
  event_id: string
  email: string
  status: 'sent' | 'opened' | 'registered'
  invite_token: string
  sent_at: string
  opened_at?: string
  responded_at?: string
}