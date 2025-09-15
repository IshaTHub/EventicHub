// src/lib/database.ts
import { supabase } from '@/lib/supabase/client'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Event, Ticket, Registration, Invitation } from '@/types'
import type { Profile, EventWithDetails } from '@/types/database'

// Helper functions for authentication (client-side)
export const auth = {
  signUp: async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Client-side database operations
export const db = {
  // Events
  getPublicEvents: async () => {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        profiles:created_by (full_name, avatar_url),
        tickets (id, name, price, quantity_total, quantity_sold)
      `)
      .eq('is_public', true)
      .eq('status', 'published')
      .order('start_date', { ascending: true })
    
    return { data, error }
  },

  getUserEvents: async (userId: string) => {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        tickets (id, name, price, quantity_total, quantity_sold),
        registrations (id, status)
      `)
      .eq('created_by', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  getEventById: async (eventId: string) => {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        profiles:created_by (full_name, avatar_url, company),
        tickets (*),
        registrations (
          id, 
          attendee_name, 
          attendee_email, 
          status, 
          registration_date,
          profiles:user_id (full_name, avatar_url)
        )
      `)
      .eq('id', eventId)
      .single()
    
    return { data, error }
  },

  createEvent: async (eventData: any) => {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single()
    
    return { data, error }
  },

  updateEvent: async (eventId: string, updates: any) => {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single()
    
    return { data, error }
  },

  deleteEvent: async (eventId: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
    
    return { error }
  },

  // Tickets
  createTicket: async (ticketData: any) => {
    const { data, error } = await supabase
      .from('tickets')
      .insert([ticketData])
      .select()
      .single()
    
    return { data, error }
  },

  updateTicket: async (ticketId: string, updates: any) => {
    const { data, error } = await supabase
      .from('tickets')
      .update(updates)
      .eq('id', ticketId)
      .select()
      .single()
    
    return { data, error }
  },

  // Registrations
  registerForEvent: async (registrationData: any) => {
    const { data, error } = await supabase
      .from('registrations')
      .insert([registrationData])
      .select()
      .single()
    
    return { data, error }
  },

  getUserRegistrations: async (userId: string) => {
    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        events (
          id, title, start_date, end_date, event_type, 
          cover_image_url, venue_address, zoom_meeting_url
        ),
        tickets (name, price)
      `)
      .eq('user_id', userId)
      .order('registration_date', { ascending: false })
    
    return { data, error }
  },

  // Profiles
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  },

  updateProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    return { data, error }
  },

  // Invitations
  createInvitation: async (invitationData: any) => {
    const { data, error } = await supabase
      .from('invitations')
      .insert([invitationData])
      .select()
      .single()
    
    return { data, error }
  },

  getInvitationByToken: async (token: string) => {
    const { data, error } = await supabase
      .from('invitations')
      .select(`
        *,
        events (
          id, title, description, start_date, end_date,
          event_type, venue_address, cover_image_url
        )
      `)
      .eq('invite_token', token)
      .single()
    
    return { data, error }
  }
}

// Server-side database operations (for server components and API routes)
export const serverDb = {
  // Events
  getPublicEvents: async () => {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        profiles:created_by (full_name, avatar_url),
        tickets (id, name, price, quantity_total, quantity_sold)
      `)
      .eq('is_public', true)
      .eq('status', 'published')
      .order('start_date', { ascending: true })
    
    return { data, error }
  },

  getUserEvents: async (userId: string) => {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        tickets (id, name, price, quantity_total, quantity_sold),
        registrations (id, status)
      `)
      .eq('created_by', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },

  getEventById: async (eventId: string) => {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        profiles:created_by (full_name, avatar_url, company),
        tickets (*),
        registrations (
          id, 
          attendee_name, 
          attendee_email, 
          status, 
          registration_date,
          profiles:user_id (full_name, avatar_url)
        )
      `)
      .eq('id', eventId)
      .single()
    
    return { data, error }
  },

  getCurrentUser: async () => {
    const supabase = createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getProfile: async (userId: string) => {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  }
}