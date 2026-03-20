export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customer_orders: {
        Row: {
          id: string
          customer_id: string
          order_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          street_address: string
          city: string
          state: string
          postal_code: string
          country: string
          product: string
          quantity: number
          unit_price: number
          total_amount: number
          status: string
          created_by: string
          order_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          order_id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          street_address: string
          city: string
          state: string
          postal_code: string
          country: string
          product: string
          quantity?: number
          unit_price: number
          total_amount: number
          status?: string
          created_by: string
          order_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          order_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          street_address?: string
          city?: string
          state?: string
          postal_code?: string
          country?: string
          product?: string
          quantity?: number
          unit_price?: number
          total_amount?: number
          status?: string
          created_by?: string
          order_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      dashboard_configurations: {
        Row: {
          id: string
          user_id: string
          name: string
          widgets: Json
          layouts: Json
          date_filter: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string
          name?: string
          widgets?: Json
          layouts?: Json
          date_filter?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          widgets?: Json
          layouts?: Json
          date_filter?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
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
  }
}
