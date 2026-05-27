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
    <div>
      {/* modal UI */}
    </div>
  );
}
export const AuthModal = memo(AuthModalComponent);
