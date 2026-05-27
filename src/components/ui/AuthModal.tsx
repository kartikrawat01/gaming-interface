import { useState, memo } from 'react';
import { supabase } from '../../supabaseClient';

function AuthModalComponent({ onClose, setUser }: any) {

  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name },
          },
        });

        if (error) {
          alert(error.message);
        } else {
          alert('Signup successful! Check email.');
          onClose();
        }

      } else {

        const { data, error } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          });

        if (error) {
          alert(error.message);
        } else {
          setUser(data.user);
          onClose();
        }
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    };

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
