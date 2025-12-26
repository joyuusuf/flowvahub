import { useState } from "react";
import { supabase } from "../services/supabase";

function generateReferralCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Ensure user has a referral code
async function ensureReferralCode(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching profile:", error.message);
    return null;
  }

  if (!data?.referral_code) {
    const referralCode = generateReferralCode();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ referral_code: referralCode })
      .eq("id", userId);

    if (updateError) {
      console.error("Error updating referral code:", updateError.message);
      return null;
    }

    return referralCode;
  }

  return data.referral_code;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // --- SIGN UP ---
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.user) {
          const userId = data.user.id;

          // Insert or upsert profile
          await supabase.from("profiles").upsert({ id: userId, email });

          // Ensure referral code exists
          await ensureReferralCode(userId);

          alert("Account created 🎉\nCheck your email to confirm your account.");
        }
      } else {
        // --- SIGN IN ---
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        const { data } = await supabase.auth.getUser();
        if (data.user) {
          // Ensure referral code exists
          await ensureReferralCode(data.user.id);
        }
      }
    } catch (err: any) {
      alert(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE AUTH
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err: any) {
      alert(err?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#8B2CF5] to-[#7C1EE6] flex items-center justify-center">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl px-8 py-10">
        {/* Header */}
        <h1 className="text-center text-[24px] font-bold text-[#7C1EE6]">
          {isSignUp ? "Create your flowwa account" : "Log in to flowwa"}
        </h1>

        <p className="text-center text-sm text-gray-500 mt-2">
          {isSignUp
            ? "Sign up to start earning rewards"
            : "Log in to receive personalized recommendations"}
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[48px] rounded-lg bg-[#EEF4FF] px-4 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-left text-sm font-medium text-gray-900 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[48px] rounded-lg bg-[#EEF4FF] px-4 pr-14 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-purple-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] rounded-full bg-[#8B2CF5] text-white font-semibold text-sm hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full h-[48px] rounded-lg border border-gray-200 flex items-center justify-center gap-3 text-sm font-medium hover:bg-gray-50 transition"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.23 9.22 3.64l6.88-6.88C35.82 2.38 30.2 0 24 0 14.64 0 6.64 5.38 2.76 13.22l8.02 6.23C12.6 13.4 17.9 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.1 24.5c0-1.6-.14-3.14-.4-4.64H24v9.02h12.44c-.54 2.9-2.18 5.36-4.64 7.02l7.18 5.58C43.9 37.02 46.1 31.26 46.1 24.5z" />
            <path fill="#FBBC05" d="M10.78 28.55a14.4 14.4 0 0 1 0-9.1l-8.02-6.23C.9 16.96 0 20.38 0 24c0 3.62.9 7.04 2.76 10.78l8.02-6.23z" />
            <path fill="#34A853" d="M24 48c6.2 0 11.82-2.04 15.76-5.52l-7.18-5.58c-2 1.34-4.56 2.14-8.58 2.14-6.1 0-11.4-3.9-13.22-9.55l-8.02 6.23C6.64 42.62 14.64 48 24 48z" />
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-600 font-medium cursor-pointer"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}
