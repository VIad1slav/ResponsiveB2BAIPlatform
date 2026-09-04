import React, { useState } from 'react';
import { Mail, Lock, Loader2, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../../context/language-context';
import { useAuth } from '../../context/auth-context';
import { useRole } from '../../context/role-context';
import { cn } from '../ui/utils';

interface LoginProps {
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const { t, language, setLanguage } = useLanguage();
  const { login } = useAuth();
  const { setRole } = useRole();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Show loading for 0.5 seconds before logging in
      await new Promise((resolve) => setTimeout(resolve, 500));
      // In a real app, the role would come from the backend
      // For demo purposes, set role to restaurant
      setRole('restaurant');
      await login(formData.email, formData.password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      // Show loading overlay for 0.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 500));
      // In a real app, the role would come from the backend
      // For demo purposes, set role to restaurant
      setRole('restaurant');
      // Simulate Google OAuth login with mock user
      await login('user@google.com', 'google-oauth');
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Quick login for development
  const handleQuickLogin = async (role: 'restaurant' | 'farmer' | 'logistics') => {
    setIsLoading(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setRole(role);
      await login('dev@plon.com', 'dev123');
    } catch (error) {
      console.error('Quick login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Loading Overlay */}
      {(isLoading || isGoogleLoading) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card rounded-2xl p-8 shadow-2xl border border-border flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-foreground font-medium">{t('loading')}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg shadow-primary/20">
            <span className="text-2xl font-bold text-primary-foreground">P</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('welcomeBack')}</h1>
          <p className="text-muted-foreground">{t('loginSubtitle')}</p>
        </div>

        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          {/* Language Selector - Inside Form */}
          <div className="mb-6 pb-6 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Language</span>
              </div>
              <div className="flex gap-2">
                {(['PL', 'UA', 'RU', 'EN'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setLanguage(lang);
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                      language === lang 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'bg-secondary text-foreground hover:bg-accent'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('workEmail')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                  placeholder={t('emailPlaceholder')}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-primary hover:underline font-medium"
              >
                {t('forgotPassword')}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('loading')}
                </>
              ) : (
                t('login')
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  {t('or')}
                </span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-background border border-input rounded-lg font-medium text-foreground hover:bg-accent transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isGoogleLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('loading')}
                </>
              ) : (
                t('continueWithGoogle')
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t('noAccount')}{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-primary hover:underline font-semibold"
              >
                {t('signup')}
              </button>
            </p>
          </div>
        </div>

        {/* Quick Login for Development */}
        <div className="mt-6 bg-yellow-500/10 border-2 border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-600" />
            <p className="text-sm font-semibold text-yellow-600">{t('quickLogin')}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('restaurant')}
              disabled={isLoading}
              className="px-3 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1 shadow-sm hover:shadow-md"
            >
              <span className="text-lg">🍽️</span>
              <span>{t('roleRestaurant')}</span>
            </button>
            <button
              onClick={() => handleQuickLogin('farmer')}
              disabled={isLoading}
              className="px-3 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1 shadow-sm hover:shadow-md"
            >
              <span className="text-lg">🌾</span>
              <span>{t('supplierFarmer')}</span>
            </button>
            <button
              onClick={() => handleQuickLogin('logistics')}
              disabled={isLoading}
              className="px-3 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center gap-1 shadow-sm hover:shadow-md"
            >
              <span className="text-lg">🚚</span>
              <span>{t('roleDriver')}</span>
            </button>
          </div>
          <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-3 text-center">
            {t('quickLoginDesc')}
          </p>
        </div>
      </div>
    </div>
  );
};

Login.displayName = 'Login';