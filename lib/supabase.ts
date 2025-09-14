import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Add logging to help diagnose environment variable loading
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

// Provide valid fallback values for development
const defaultUrl = supabaseUrl || 'https://placeholder.supabase.co';
const defaultKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

// Create the Supabase client with optimized settings for production
export const supabase = createClient(defaultUrl, defaultKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'x-application-name': 'lizexpress-mobile-app'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  }
});

// Simple connection test without blocking
if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://placeholder.supabase.co') {
  supabase.auth.getSession()
    .then(() => {
      console.log('✅ Supabase connected successfully');
    })
    .catch(error => {
      console.warn('⚠️ Supabase connection warning:', error.message);
    });
} else {
  console.warn('⚠️ Using placeholder Supabase configuration');
}

export type Profile = {
  id: string;
  email?: string;
  full_name: string | null;
  avatar_url: string | null;
  residential_address: string | null;
  date_of_birth: string | null;
  language: string | null;
  gender: string | null;
  country: string | null;
  state: string | null;
  zip_code: string | null;
  nationality: string | null;
  is_verified: boolean;
  verification_submitted: boolean;
  profile_completed: boolean;
  created_at?: string;
  updated_at?: string;
};

export type Item = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  category: string;
  condition: string;
  buying_price: number | null;
  estimated_cost: number | null;
  swap_for: string | null;
  location: string | null;
  item_state: string | null;
  item_country: string | null;
  images: string[];
  receipt_image: string | null;
  status: string;
  created_at: string;
  updated_at?: string;
  approved_at?: string;
  approved_by?: string;
};

export type Notification = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  content: string | null;
  is_read: boolean;
  created_at: string;
};