import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ktbwmwzgskaqasnasvrq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_RxKh8VGVVYqvI83qzeAYew_rUbQ4LLp';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
