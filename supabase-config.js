// ==========================================
// NR KIRANA KHANDWA - SUPABASE CONFIG
// ==========================================

const SUPABASE_URL =
    "https://rvzppdcpbrjyvswwvfgx.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_u_ztQg2rHxAQjZpVYkETJQ_GoTAqf04";


// ==========================================
// SUPABASE CLIENT
// ==========================================

if (typeof window.supabase === "undefined") {

    console.error(
        "❌ Supabase JS library load नहीं हुई।"
    );

} else {

    try {

        window.nrSupabase =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );

        console.log(
            "✅ NR Kirana Supabase connected"
        );

    } catch (error) {

        console.error(
            "❌ Supabase client बनाने में error:",
            error
        );

    }

}