// src/types/database.ts
// This extends your existing types with Supabase-specific database types

import { 
  User as AppUser, 
  Event as AppEvent, 
  Ticket as AppTicket, 
  Registration as AppRegistration, 
  Invitation as AppInvitation 
} from './index'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Profile type (extends auth.users)
export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  company: string | null
  website: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

// Supabase Database schema type
export interface Database {
  public: {
    Tables: {
      events: {
        Row: AppEvent
        Insert: Omit<AppEvent, 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<AppEvent>
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tickets: {
        Row: AppTicket
        Insert: Omit<AppTicket, 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<AppTicket>
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      registrations: {
        Row: AppRegistration
        Insert: Omit<AppRegistration, 'id' | 'registration_date'> & {
          id?: string
          registration_date?: string
        }
        Update: Partial<AppRegistration>
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      invitations: {
        Row: AppInvitation
        Insert: Omit<AppInvitation, 'id' | 'sent_at'> & {
          id?: string
          sent_at?: string
        }
        Update: Partial<AppInvitation>
        Relationships: [
          {
            foreignKeyName: "invitations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'> & {
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Profile>
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Extended types with relationships (using your existing types as base)
export interface EventWithDetails extends AppEvent {
  profiles?: Profile
  tickets?: AppTicket[]
  registrations?: (AppRegistration & { profiles?: Profile })[]
}

export interface RegistrationWithDetails extends AppRegistration {
  events?: AppEvent
  tickets?: AppTicket
}

export interface InvitationWithEvent extends AppInvitation {
  events?: AppEvent
}

// Re-export your existing types for convenience
export type {
  User,
  Event,
  Ticket,
  Registration,
  Invitation
} from './index'