
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);

async function fillMissingReferralCodes() {
  const { data: users, error } = await supabase
    .from("profiles")
    .select("id, referral_code");

  if (error) {
    console.error("Error fetching users:", error);
    return;
  }

  for (let user of users) {
    if (!user.referral_code) {
      await supabase
        .from("profiles")
        .update({ referral_code: generateReferralCode() })
        .eq("id", user.id);
      console.log(`Updated referral code for user: ${user.id}`);
    }
  }

  console.log("All missing referral codes have been added!");
}

fillMissingReferralCodes();