import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { t, login } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const bg = "bg-white";
  const text = "text-[#1a1a1a]";
  const inputBg = "bg-black/5 border-black/10 text-black focus:border-[#c9a227]";
  const overlayBg = "bg-white/60";

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');

    // Получаем текущий список пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('temp_users') || '[]');

    if (isLogin) {
      // ЛОГИКА ВХОДА
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        console.log('Успешный вход:', user);
        login(user);
        onClose();
        navigate('/profile');
      } else {
        setError(t('Invalid credentials') || 'Неверный email или пароль');
      }
    } else {
      // ЛОГИКА РЕГИСТРАЦИИ
      const userExists = users.some(u => u.email === email);
      if (userExists) {
        setError(t('User already exists') || 'Пользователь уже существует');
        return;
      }

      const newUser = { id: Date.now(), email, password, fullName };
      users.push(newUser);
      localStorage.setItem('temp_users', JSON.stringify(users));

      // Auto login after registration
      login(newUser);
      onClose();
      navigate('/profile');
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4">
      <div
        onClick={onClose}
        className={`absolute inset-0 backdrop-blur-sm ${overlayBg}`}
      />

      <div
        className={`relative w-full max-w-md overflow-y-auto rounded-t-[32px] md:rounded-[32px] border-t md:border border-black/10 ${bg} shadow-2xl z-10 pb-10 md:pb-0 max-h-[90vh] md:max-h-none`}
      >
        {/* Mobile Handle */}
        <div className="w-full flex justify-center pt-4 pb-2 md:hidden">
          <div className="w-12 h-1.5 rounded-full bg-black/20" />
        </div>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full p-2 hover:bg-[#c9a227] hover:text-white text-black/50 hover:bg-black/10"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          <div className="mb-8 text-center">
            <h2 className={`mb-2 text-3xl font-bold tracking-tight ${text}`}>
              {isLogin ? (t('Welcome Back') || 'Welcome Back') : (t('Create Account') || 'Create Account')}
            </h2>
          </div>
          {error && <p className="text-red-500 text-xs text-center mb-4">Invalid password or email</p>}
          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/70">
                  {t('full Name') || 'Full Name'}
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none ${inputBg}`}
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/70">
                {t('email') || 'Email Address'}
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none ${inputBg}`}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/70">
                {t('password') || 'Password'}
              </label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none ${inputBg}`}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#c9a227] px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-[#b08d22] hover:shadow-[0_0_20px_rgba(201,162,39,0.4)]"
            >
              {isLogin ? (t('login') || 'Login') : (t('register') || 'Register')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-[#c9a227] hover:text-[#b08d22]"
            >
              {isLogin ? (t('Sign Up') || 'Sign up') : (t('Sign In') || 'Sign in')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
