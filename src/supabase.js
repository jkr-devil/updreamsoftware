import { createClient } from "@supabase/supabase-js";

const supabaseUrl="https://msjjnhqdikiiygxhpmii.supabase.co";
const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zampuaHFkaWtpaXlneGhwbWlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NjA1MDEsImV4cCI6MjA4MDQzNjUwMX0.H55H6XpQBKvCbTVAXwTnV_P_5bq4_pZ14N3XWs9BlTo"

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
