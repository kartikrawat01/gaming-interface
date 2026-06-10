import { useState, memo } from 'react';
import { supabase } from '../../supabaseClient';

function AuthModalComponent({ onClose, setUser }: any) {

  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [parentPhone, setParentPhone] = useState('');


  const handleAuth = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) {
          alert(error.message);
        } else {
          // Signup ke baad onboarding dikhao
          const token = data.session?.access_token;
          if (token) {
            setAccessToken(token);
            setShowOnboarding(true);
          } else {
            // Email verification on hai toh session nahi aata
            alert('Signup successful! Please check your email to verify, then login.');
            onClose();
          }
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
if (error) {
  alert(error.message);
} else {
  const token = data.session?.access_token;
  if (token) {
    try {
      const profileRes = await fetch(
        'https://wallet-api-backend-production.up.railway.app/wallet/profile',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const profile = await profileRes.json();

      if (!profile.childName || profile.childName === '') {
        // Profile empty hai — onboarding dikhao
        setAccessToken(token);
        setShowOnboarding(true);
      } else {
        // Already filled — seedha dashboard
        setUser(data.user);
        onClose();
      }
    } catch (err) {
      // Profile check fail ho toh bhi login karne do
      setUser(data.user);
      onClose();
    }
  }
}
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOnboarding = async () => {
    if (!childName.trim() || !parentPhone.trim() || !childAge) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await fetch(
        'https://wallet-api-backend-production.up.railway.app/wallet/profile',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            childName: childName.trim(),
            childAge: Number(childAge),
            parentPhone: parentPhone.trim(),
          }),
        }
      );

      // User set karo aur close karo
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
      onClose();
    } catch (err) {
      console.error('Onboarding save failed:', err);
      alert('Something went wrong, please try again');
    } finally {
      setLoading(false);
    }
  };

  // Onboarding screen
  if (showOnboarding) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <h2 className="text-2xl font-bold text-black mb-1">Almost there! 👋</h2>
          <p className="text-sm text-gray-500 mb-5">Tell us a bit about your child</p>

          <input
            type="text"
            placeholder="Child's Name (e.g. Aryan)"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-lg border text-black"
          />
          <input
            type="number"
            placeholder="Child's Age (e.g. 10)"
            min={4}
            max={18}
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full mb-3 px-4 py-3 rounded-lg border text-black"
          />
          <input
            type="tel"
            placeholder="Parent's Phone (e.g. 9876543210)"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-lg border text-black"
          />

          <button
            onClick={handleSaveOnboarding}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save & Start Playing 🎮'}
          </button>
        </div>
      </div>
    );
  }

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        <button
          onClick={onClose}
          className="text-black text-xl"
        >
          ✕
        </button>
      </div>

      {/* NAME */}
      {isSignup && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-4 py-3 rounded-lg border text-black"
        />
      )}

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-3 rounded-lg border text-black"
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 px-4 py-3 rounded-lg border text-black"
      />

      {/* CONFIRM PASSWORD */}
      {isSignup && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          className="w-full mb-3 px-4 py-3 rounded-lg border text-black"
        />
      )}

      {/* BUTTON */}
      <button
        onClick={handleAuth}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        {loading
          ? "Please wait..."
          : isSignup
          ? "Sign Up"
          : "Login"}
      </button>

      {/* SWITCH */}
      <p className="mt-4 text-center text-sm text-gray-600">
        {isSignup
          ? "Already have an account?"
          : "Don't have an account?"}

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="ml-1 text-blue-600 font-semibold"
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>

    </div>
  </div>
);
}
export const AuthModal = memo(AuthModalComponent);