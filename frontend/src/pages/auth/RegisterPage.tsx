import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Home, Search, Handshake, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

const registerSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const roleCards = [
  {
    role: 'seller' as UserRole,
    icon: Home,
    title: 'Je vends un bien',
    description: 'Vendez votre bien avec un forfait fixe et économisez jusqu\'à 90% sur les frais',
    color: 'bg-primary-500'
  },
  {
    role: 'buyer' as UserRole,
    icon: Search,
    title: 'Je cherche un bien',
    description: 'Trouvez votre bien idéal et bénéficiez d\'un accompagnement personnalisé',
    color: 'bg-secondary-500'
  },
  {
    role: 'ambassador' as UserRole,
    icon: Handshake,
    title: 'Je veux être ambassadeur',
    description: 'Aidez vos voisins à vendre et gagnez des commissions attractives',
    color: 'bg-accent-500'
  }
];

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const referredBy = searchParams.get('ref') || undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!selectedRole) return;

    try {
      await registerUser({
        ...data,
        roles: [selectedRole],
        referredBy
      });

      // Go to step 3 (email verification)
      setStep(3);
      
      // Simulate email verification and redirect after 2 seconds
      setTimeout(() => {
        navigate(`/${selectedRole}/dashboard`);
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= i ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
                } font-semibold transition-all duration-300`}>
                  {step > i ? <Check className="w-5 h-5" /> : i}
                </div>
                {i < 3 && (
                  <div className={`w-24 h-1 ${
                    step > i ? 'bg-primary-500' : 'bg-gray-200'
                  } transition-all duration-300`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className={step >= 1 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
              Choisir un rôle
            </span>
            <span className={step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
              Informations
            </span>
            <span className={step >= 3 ? 'text-primary-600 font-medium' : 'text-gray-500'}>
              Vérification
            </span>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenue sur LoopImmo</h1>
              <p className="text-gray-600">Commençons par définir votre profil</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {roleCards.map((card) => (
                <Card
                  key={card.role}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedRole === card.role
                      ? 'ring-2 ring-primary-500 shadow-xl transform scale-105'
                      : 'hover:shadow-xl hover:transform hover:scale-105'
                  }`}
                  onClick={() => setSelectedRole(card.role)}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 ${card.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <card.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                    {selectedRole === card.role && (
                      <div className="mt-4">
                        <Check className="w-6 h-6 text-primary-500 mx-auto" />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedRole}
                size="lg"
              >
                Continuer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Registration Form */}
        {step === 2 && (
          <div className="animate-fade-in max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Créer votre compte</h2>
              <p className="text-gray-600">
                {selectedRole === 'seller' && 'Commencez à vendre votre bien'}
                {selectedRole === 'buyer' && 'Trouvez votre bien idéal'}
                {selectedRole === 'ambassador' && 'Rejoignez notre communauté'}
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    {...register('firstName')}
                    label="Prénom"
                    error={errors.firstName?.message}
                  />
                  <Input
                    {...register('lastName')}
                    label="Nom"
                    error={errors.lastName?.message}
                  />
                </div>

                <Input
                  {...register('email')}
                  type="email"
                  label="Email"
                  error={errors.email?.message}
                />

                <Input
                  {...register('phone')}
                  type="tel"
                  label="Téléphone"
                  placeholder="06 12 34 56 78"
                  error={errors.phone?.message}
                />

                <Input
                  {...register('password')}
                  type="password"
                  label="Mot de passe"
                  error={errors.password?.message}
                />

                <Input
                  {...register('confirmPassword')}
                  type="password"
                  label="Confirmer le mot de passe"
                  error={errors.confirmPassword?.message}
                />

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="flex-1"
                  >
                    Créer mon compte
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {/* Step 3: Email Verification */}
        {step === 3 && (
          <div className="animate-fade-in max-w-md mx-auto text-center">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compte créé avec succès !</h2>
            <p className="text-gray-600 mb-8">
              Un email de vérification a été envoyé à votre adresse. 
              Vous allez être redirigé vers votre tableau de bord...
            </p>
            <div className="animate-pulse">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
