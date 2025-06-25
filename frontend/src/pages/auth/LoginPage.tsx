import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simuler la connexion avec détection du rôle basé sur l'email
      await login(formData.email, formData.password);
      
      // Rediriger vers le dashboard approprié selon le rôle
      if (formData.email.includes('vendeur')) {
        navigate('/seller/dashboard');
      } else if (formData.email.includes('acheteur')) {
        navigate('/buyer/dashboard');
      } else if (formData.email.includes('ambassadeur')) {
        navigate('/ambassador/dashboard');
      } else if (formData.email.includes('trust')) {
        navigate('/trust-manager/dashboard');
      } else {
        // Par défaut, rediriger vers le dashboard vendeur
        navigate('/seller/dashboard');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fillTestCredentials = (role: 'buyer' | 'seller' | 'ambassador' | 'trust') => {
    const credentials = {
      buyer: { email: 'acheteur@test.com', password: 'test123' },
      seller: { email: 'vendeur@test.com', password: 'test123' },
      ambassador: { email: 'ambassadeur@test.com', password: 'test123' },
      trust: { email: 'trust@test.com', password: 'test123' }
    };
    
    setFormData({
      ...formData,
      email: credentials[role].email,
      password: credentials[role].password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour à l'accueil
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? 'Connectez-vous pour accéder à votre espace'
                : 'Rejoignez ImmoConnect dès maintenant'}
            </p>
          </div>

          {/* Test Credentials Info - Only show on login */}
          {isLogin && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 mb-2">
                    Comptes de démonstration disponibles :
                  </p>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('buyer')}
                      className="block w-full text-left text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                    >
                      <span className="font-medium">Acheteur :</span> acheteur@test.com / test123
                    </button>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('seller')}
                      className="block w-full text-left text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                    >
                      <span className="font-medium">Vendeur :</span> vendeur@test.com / test123
                    </button>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('ambassador')}
                      className="block w-full text-left text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                    >
                      <span className="font-medium">Ambassadeur :</span> ambassadeur@test.com / test123
                    </button>
                    <button
                      type="button"
                      onClick={() => fillTestCredentials('trust')}
                      className="block w-full text-left text-sm text-blue-700 hover:text-blue-800 hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                    >
                      <span className="font-medium">Trust Manager :</span> trust@test.com / test123
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Mot de passe oublié ?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {isLogin ? "S'inscrire" : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
