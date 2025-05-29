// IMPORTANT: Replace with your actual project details from Supabase > Settings > API
const SUPABASE_URL = 'https://dzqefwiducncdbkmuquk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6cWVmd2lkdWNuY2Ria211cXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODc5OTAsImV4cCI6MjA2NDA2Mzk5MH0.zZ30iDGsEBJXCtQz-qHaiwlK8pnYffWEvtJupm9KONg';

// Initialize Supabase client (notice `supabase` is created via `createClient`)
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
