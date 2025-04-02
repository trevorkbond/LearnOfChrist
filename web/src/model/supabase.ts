export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      book: {
        Row: {
          book: string | null
          book_id: number
          work_id: number | null
        }
        Insert: {
          book?: string | null
          book_id: number
          work_id?: number | null
        }
        Update: {
          book?: string | null
          book_id?: number
          work_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_work_id_fkey"
            columns: ["work_id"]
            isOneToOne: false
            referencedRelation: "work"
            referencedColumns: ["work_id"]
          },
        ]
      }
      description: {
        Row: {
          description: string | null
          description_id: number
        }
        Insert: {
          description?: string | null
          description_id: number
        }
        Update: {
          description?: string | null
          description_id?: number
        }
        Relationships: []
      }
      reference: {
        Row: {
          book_id: number | null
          chapter: number | null
          end_verse: number | null
          reference_id: number
          start_verse: number | null
        }
        Insert: {
          book_id?: number | null
          chapter?: number | null
          end_verse?: number | null
          reference_id: number
          start_verse?: number | null
        }
        Update: {
          book_id?: number | null
          chapter?: number | null
          end_verse?: number | null
          reference_id?: number
          start_verse?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reference_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["book_id"]
          },
        ]
      }
      reference_scripture: {
        Row: {
          reference_id: number
          scripture_id: number
        }
        Insert: {
          reference_id: number
          scripture_id: number
        }
        Update: {
          reference_id?: number
          scripture_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reference_scripture_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "reference"
            referencedColumns: ["reference_id"]
          },
          {
            foreignKeyName: "reference_scripture_scripture_id_fkey"
            columns: ["scripture_id"]
            isOneToOne: false
            referencedRelation: "scripture"
            referencedColumns: ["scripture_id"]
          },
        ]
      }
      reference_topic: {
        Row: {
          description_id: number
          reference_id: number
          topic_id: number
        }
        Insert: {
          description_id: number
          reference_id: number
          topic_id: number
        }
        Update: {
          description_id?: number
          reference_id?: number
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reference_topic_description_id_fkey"
            columns: ["description_id"]
            isOneToOne: false
            referencedRelation: "description"
            referencedColumns: ["description_id"]
          },
          {
            foreignKeyName: "reference_topic_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "reference"
            referencedColumns: ["reference_id"]
          },
          {
            foreignKeyName: "reference_topic_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topic"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      scripture: {
        Row: {
          content: string | null
          scripture_id: number
        }
        Insert: {
          content?: string | null
          scripture_id: number
        }
        Update: {
          content?: string | null
          scripture_id?: number
        }
        Relationships: []
      }
      test: {
        Row: {
          created_at: string
          foo: string | null
          id: number
        }
        Insert: {
          created_at?: string
          foo?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          foo?: string | null
          id?: number
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          id: number
          is_complete: boolean | null
          title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_complete?: boolean | null
          title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_complete?: boolean | null
          title?: string | null
        }
        Relationships: []
      }
      topic: {
        Row: {
          topic: string | null
          topic_id: number
        }
        Insert: {
          topic?: string | null
          topic_id: number
        }
        Update: {
          topic?: string | null
          topic_id?: number
        }
        Relationships: []
      }
      work: {
        Row: {
          work: string | null
          work_id: number
        }
        Insert: {
          work?: string | null
          work_id: number
        }
        Update: {
          work?: string | null
          work_id?: number
        }
        Relationships: []
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
