import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        router.push('/dashboard');
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      {user ? (
        <p>Redirecting to dashboard...</p>
      ) : (
        <>
          {isSignUp ? <SignUp onSignUp={() => setIsSignUp(false)} /> : <Login onLogin={() => setIsSignUp(false)} />}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </button>
        </>
      )}
    </div>
  );
}
