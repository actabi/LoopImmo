import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, ShoppingBag, Users, LogIn } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">LoopImmo</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/acheter" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingBag className="w-4 h-4" />
              <span>Acheter</span>
            </Link>
            <Link to="/vendre" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <Home className="w-4 h-4" />
              <span>Vendre</span>
            </Link>
            <Link to="/looper" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <Users className="w-4 h-4" />
              <span>Devenir Looper</span>
            </Link>
            <Link to="/connexion">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Se connecter
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/acheter"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acheter</span>
            </Link>
            <Link
              to="/vendre"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span>Vendre</span>
            </Link>
            <Link
              to="/looper"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Users className="w-4 h-4" />
              <span>Devenir Looper</span>
            </Link>
            <Link
              to="/connexion"
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="w-4 h-4" />
              <span>Se connecter</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
