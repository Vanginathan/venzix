export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          email: string;
          phone: string;
          website: string | null;
          project_type: string;
          budget: string | null;
          message: string | null;
          status: "new" | "contacted" | "converted" | "closed";
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          email: string;
          phone: string;
          website?: string | null;
          project_type: string;
          budget?: string | null;
          message?: string | null;
          status?: "new" | "contacted" | "converted" | "closed";
          notes?: string | null;
        };
        Update: {
          status?: "new" | "contacted" | "converted" | "closed";
          notes?: string | null;
          updated_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role: "admin" | "user";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: "admin" | "user";
          created_at?: string;
        };
        Update: {
          role?: "admin" | "user";
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      has_role: {
        Args: { _role: string; _user_id: string };
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
};