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
      reservations: {
        Row: {
          advance_payment: string | null
          apartment_number: string | null
          boarding: string | null
          city: string | null
          company: string | null
          company_city: string | null
          company_country: string | null
          company_nip: string | null
          company_post_code: string | null
          company_street: string | null
          country: string | null
          deposit: string | null
          email: string | null
          end_date: string | null
          house_number: string | null
          id: string
          local_tax: number | null
          main_guest: string | null
          notes: string | null
          num_of_adults: number | null
          num_of_kids: number | null
          pass_code: string | null
          passport: string | null
          payment_on_place: string | null
          phone: string | null
          post_code: string | null
          registration: string | null
          room_id: string | null
          selected_end_date: Date| null
          selected_room: Json | null
          selected_start_date: Date 
          selected_status: Json | null
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          advance_payment?: string | null
          apartment_number?: string | null
          boarding?: string | null
          city?: string | null
          company?: string | null
          company_city?: string | null
          company_country?: string | null
          company_nip?: string | null
          company_post_code?: string | null
          company_street?: string | null
          country?: string | null
          deposit?: string | null
          email?: string | null
          end_date?: string | null
          house_number?: string | null
          id?: string
          local_tax?: number | null
          main_guest?: string | null
          notes?: string | null
          num_of_adults?: number | null
          num_of_kids?: number | null
          pass_code?: string | null
          passport?: string | null
          payment_on_place?: string | null
          phone?: string | null
          post_code?: string | null
          registration?: string | null
          room_id?: string | null
          selected_end_date?: Date | null
          selected_room?: Json | null
          selected_start_date?: Date 
          selected_status?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          advance_payment?: string | null
          apartment_number?: string | null
          boarding?: string | null
          city?: string | null
          company?: string | null
          company_city?: string | null
          company_country?: string | null
          company_nip?: string | null
          company_post_code?: string | null
          company_street?: string | null
          country?: string | null
          deposit?: string | null
          email?: string | null
          end_date?: string | null
          house_number?: string | null
          id?: string
          local_tax?: number | null
          main_guest?: string | null
          notes?: string | null
          num_of_adults?: number | null
          num_of_kids?: number | null
          pass_code?: string | null
          passport?: string | null
          payment_on_place?: string | null
          phone?: string | null
          post_code?: string | null
          registration?: string | null
          room_id?: string | null
          selected_end_date?: string | null
          selected_room?: Json | null
          selected_start_date?: Date 
          selected_status?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          additional_persons: number | null
          address: string | null
          area: string | null
          city: string | null
          color: string | null
          country: string | null
          country_flag_url: string | null
          description: string | null
          details: string | null
          extras: string | null
          guests: number | null
          id: string
          name: string | null
          num_of_double_beds: number | null
          num_of_persons: number | null
          num_of_single_beds: number | null
          post_code: string | null
          price: number | null
          type: string | null
          type_icon: string | null
          user_id: string | null
        }
        Insert: {
          additional_persons?: number | null
          address?: string | null
          area?: string | null
          city?: string | null
          color?: string | null
          country?: string | null
          country_flag_url?: string | null
          description?: string | null
          details?: string | null
          extras?: string | null
          guests?: number | null
          id?: string
          name?: string | null
          num_of_double_beds?: number | null
          num_of_persons?: number | null
          num_of_single_beds?: number | null
          post_code?: string | null
          price?: number | null
          type?: string | null
          type_icon?: string | null
          user_id?: string | null
        }
        Update: {
          additional_persons?: number | null
          address?: string | null
          area?: string | null
          city?: string | null
          color?: string | null
          country?: string | null
          country_flag_url?: string | null
          description?: string | null
          details?: string | null
          extras?: string | null
          guests?: number | null
          id?: string
          name?: string | null
          num_of_double_beds?: number | null
          num_of_persons?: number | null
          num_of_single_beds?: number | null
          post_code?: string | null
          price?: number | null
          type?: string | null
          type_icon?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
