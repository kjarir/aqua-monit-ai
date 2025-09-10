export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      hmpi_standards: {
        Row: {
          bis_standard: number
          created_at: string
          id: string
          metal_name: string
          unit: string | null
          weight_factor: number
          who_standard: number
        }
        Insert: {
          bis_standard: number
          created_at?: string
          id?: string
          metal_name: string
          unit?: string | null
          weight_factor?: number
          who_standard: number
        }
        Update: {
          bis_standard?: number
          created_at?: string
          id?: string
          metal_name?: string
          unit?: string | null
          weight_factor?: number
          who_standard?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          contact_email: string | null
          created_at: string
          full_name: string | null
          id: string
          organization: string | null
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          organization?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          organization?: string | null
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      water_tests: {
        Row: {
          arsenic: number | null
          cadmium: number | null
          chromium: number | null
          collection_date: string
          copper: number | null
          created_at: string
          dissolved_oxygen: number | null
          electrical_conductivity: number | null
          hmpi_score: number | null
          id: string
          iron: number | null
          latitude: number
          lead: number | null
          location_name: string
          longitude: number
          manganese: number | null
          mercury: number | null
          nickel: number | null
          notes: string | null
          ph_level: number | null
          pollution_level: string | null
          status: string | null
          temperature: number | null
          test_name: string
          testing_date: string
          turbidity: number | null
          updated_at: string
          user_id: string
          zinc: number | null
        }
        Insert: {
          arsenic?: number | null
          cadmium?: number | null
          chromium?: number | null
          collection_date: string
          copper?: number | null
          created_at?: string
          dissolved_oxygen?: number | null
          electrical_conductivity?: number | null
          hmpi_score?: number | null
          id?: string
          iron?: number | null
          latitude: number
          lead?: number | null
          location_name: string
          longitude: number
          manganese?: number | null
          mercury?: number | null
          nickel?: number | null
          notes?: string | null
          ph_level?: number | null
          pollution_level?: string | null
          status?: string | null
          temperature?: number | null
          test_name: string
          testing_date: string
          turbidity?: number | null
          updated_at?: string
          user_id: string
          zinc?: number | null
        }
        Update: {
          arsenic?: number | null
          cadmium?: number | null
          chromium?: number | null
          collection_date?: string
          copper?: number | null
          created_at?: string
          dissolved_oxygen?: number | null
          electrical_conductivity?: number | null
          hmpi_score?: number | null
          id?: string
          iron?: number | null
          latitude?: number
          lead?: number | null
          location_name?: string
          longitude?: number
          manganese?: number | null
          mercury?: number | null
          nickel?: number | null
          notes?: string | null
          ph_level?: number | null
          pollution_level?: string | null
          status?: string | null
          temperature?: number | null
          test_name?: string
          testing_date?: string
          turbidity?: number | null
          updated_at?: string
          user_id?: string
          zinc?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_hmpi_score: {
        Args: {
          p_arsenic?: number
          p_cadmium?: number
          p_chromium?: number
          p_copper?: number
          p_iron?: number
          p_lead?: number
          p_manganese?: number
          p_mercury?: number
          p_nickel?: number
          p_zinc?: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
