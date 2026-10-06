import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://npdhmygbmxwgqslxspck.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_kaLCIEYCEU6ptVXRTaAMww_0U4UHlEi";

export const supabase = createClient(supabaseUrl, supabaseKey);
