import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  User, Mail, Phone, MapPin, Calendar, Clock, Camera,
  Save, Edit2, Plus, Trash2, Check, X, AlertCircle,
  Briefcase, Award, Star, Globe, Linkedin, Facebook,
  Instagram, FileText, Shield, CreditCard, Bell,
  ChevronRight, Building, Users, Target, TrendingUp
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verified: boolean;
}

interface BankInfo {
  iban: string;
  bic: string;
  accountHolder: string;
}

const DAYS_OF_WEEK = [
  'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
];

const SPECIALTIES = [
  'Appartements', 'Maisons', 'Terrains', 'Locaux commerciaux',
  'Immobilier de luxe', 'Investissement locatif', 'Primo-accédants',
  'Biens atypiques', 'Viager', 'Neuf'
];

const LANGUAGES = [
  'Français', 'Anglais', 'Espagnol', 'Italien', 'Allemand',
  'Portugais', 'Arabe', 'Chinois', 'Russe', 'Japonais'
];

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile data
  const [profile, setProfile] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '06 12 34 56 78',
    bio: 'Ambassadeur immobilier passionné avec 5 ans d\'expérience dans le secteur. Spécialisé dans l\'accompagnement personnalisé des vendeurs et acheteurs.',
    address: '15 rue de la République',
    city: 'Lyon',
    postalCode: '69002',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    coverImage: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260',
    experience: '5 ans',
    totalSales: 47,
    rating: 4.8,
    responseTime: '< 2h',
    successRate: 92
  });

  const [specialties, setSpecialties] = useState(['Appartements', 'Maisons', 'Primo-accédants']);
  const [languages, setLanguages] = useState(['Français', 'Anglais']);
  const [certifications, setCertifications] = useState<Certification[]>([
    { id: '1', name: 'Certification LoopImmo Expert', issuer: 'LoopImmo Academy', date: '2023', verified: true },
    { id: '2', name: 'Formation Négociation Avancée', issuer: 'FNAIM', date: '2022', verified: true }
  ]);

  // Availability data
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', day: 'Lundi', startTime: '09:00', endTime: '18:00', isActive: true },
    { id: '2', day: 'Mardi', startTime: '09:00', endTime: '18:00', isActive: true },
    { id: '3', day: 'Mercredi', startTime: '09:00', endTime: '18:00', isActive: true },
    { id: '4', day: 'Jeudi', startTime: '09:00', endTime: '18:00', isActive: true },
    { id: '5', day: 'Vendredi', startTime: '09:00', endTime: '17:00', isActive: true },
    { id: '6', day: 'Samedi', startTime: '10:00', endTime: '16:00', isActive: true },
    { id: '7', day: 'Dimanche', startTime: '', endTime: '', isActive: false }
  ]);

  const [vacationMode, setVacationMode] = useState(false);
  const [vacationDates, setVacationDates] = useState({ start: '', end: '' });

  // Social & Bank info
  const [socialLinks, setSocialLinks] = useState({
    website: 'www.jean-dupont-immo.fr',
    linkedin: 'linkedin.com/in/jean-dupont',
    facebook: '',
    instagram: '@jdupont_immo'
  });

  const [bankInfo, setBankInfo] = useState<BankInfo>({
    iban: 'FR76 1234 5678 9012 3456 7890 123',
    bic: 'BNPAFRPP',
    accountHolder: 'Jean Dupont'
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    newLeads: true,
    visitRequests: true,
    offerUpdates: true,
    weeklyReport: true,
    monthlyNewsletter: false,
    smsAlerts: true,
    emailAlerts: true
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Ici, vous feriez l'appel API pour sauvegarder
    console.log('Profil sauvegardé');
  };

  const handleAddTimeSlot = (day: string) => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day,
      startTime: '09:00',
      endTime: '18:00',
      isActive: true
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const handleUpdateTimeSlot = (id: string, field: keyof TimeSlot, value: any) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const handleDeleteTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Header avec image de couverture */}
      <Card className="overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-primary-500 to-secondary-500">
          {profile.coverImage && (
            <img 
              src={profile.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <div className="relative">
              <img 
                src={profile.profileImage} 
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="text-white pb-2">
              <h2 className="text-2xl font-bold">{profile.firstName} {profile.lastName}</h2>
              <p className="text-sm opacity-90">Ambassadeur LoopImmo</p>
            </div>
          </div>
          
          {!isEditing && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-4 right-4"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Modifier
            </Button>
          )}
        </div>

        <div className="p-6">
          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{profile.totalSales}</p>
              <p className="text-sm text-gray-600">Ventes réalisées</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                <Star className="w-5 h-5 inline text-yellow-500 mr-1" />
                {profile.rating}
              </p>
              <p className="text-sm text-gray-600">Note moyenne</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{profile.experience}</p>
              <p className="text-sm text-gray-600">Expérience</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{profile.responseTime}</p>
              <p className="text-sm text-gray-600">Temps de réponse</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{profile.successRate}%</p>
              <p className="text-sm text-gray-600">Taux de succès</p>
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
            
            {isEditing ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Téléphone</p>
                    <p className="font-medium">{profile.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Adresse</p>
                    <p className="font-medium">{profile.address}, {profile.postalCode} {profile.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Expérience</p>
                    <p className="font-medium">{profile.experience} dans l'immobilier</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-2">Bio</p>
                  <p className="text-gray-700">{profile.bio}</p>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-1" />
                  Enregistrer
                </Button>
              </div>
            )}
          </div>

          {/* Spécialités */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spécialités</h3>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" size="lg">
                  {specialty}
                </Badge>
              ))}
              {isEditing && (
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              )}
            </div>
          </div>

          {/* Langues */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Langues parlées</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((language) => (
                <Badge key={language} variant="primary" size="lg">
                  {language}
                </Badge>
              ))}
              {isEditing && (
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                    </div>
                  </div>
                  {cert.verified && (
                    <Badge variant="success" size="sm">
                      <Check className="w-3 h-3 mr-1" />
                      Vérifié
                    </Badge>
                  )}
                </div>
              ))}
              {isEditing && (
                <Button size="sm" variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter une certification
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAvailabilityTab = () => (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Gestion des disponibilités</h3>
          
          {/* Mode vacances */}
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Mode vacances</p>
                  <p className="text-sm text-gray-600">Désactivez temporairement vos disponibilités</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={vacationMode}
                  onChange={(e) => setVacationMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            {vacationMode && (
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                  <input
                    type="date"
                    value={vacationDates.start}
                    onChange={(e) => setVacationDates({ ...vacationDates, start: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                  <input
                    type="date"
                    value={vacationDates.end}
                    onChange={(e) => setVacationDates({ ...vacationDates, end: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Horaires hebdomadaires */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Horaires hebdomadaires</h4>
            <div className="space-y-3">
              {DAYS_OF_WEEK.map((day) => {
                const daySlots = timeSlots.filter(slot => slot.day === day);
                
                return (
                  <div key={day} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={daySlots.some(slot => slot.isActive)}
                            onChange={(e) => {
                              if (e.target.checked && daySlots.length === 0) {
                                handleAddTimeSlot(day);
                              } else {
                                setTimeSlots(timeSlots.map(slot => 
                                  slot.day === day ? { ...slot, isActive: e.target.checked } : slot
                                ));
                              }
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                        <span className="font-medium text-gray-900">{day}</span>
                      </div>
                      
                      {daySlots.some(slot => slot.isActive) && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddTimeSlot(day)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Ajouter un créneau
                        </Button>
                      )}
                    </div>
                    
                    {daySlots.length > 0 && daySlots.some(slot => slot.isActive) && (
                      <div className="space-y-2">
                        {daySlots.map((slot) => (
                          <div key={slot.id} className="flex items-center gap-2">
                            <input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => handleUpdateTimeSlot(slot.id, 'startTime', e.target.value)}
                              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                              disabled={!slot.isActive}
                            />
                            <span className="text-gray-500">à</span>
                            <input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => handleUpdateTimeSlot(slot.id, 'endTime', e.target.value)}
                              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                              disabled={!slot.isActive}
                            />
                            {daySlots.length > 1 && (
                              <button
                                onClick={() => handleDeleteTimeSlot(slot.id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Paramètres de réservation */}
          <div className="mt-8">
            <h4 className="font-medium text-gray-900 mb-4">Paramètres de réservation</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée minimale d'un rendez-vous
                </label>
                <select className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 heure</option>
                  <option value="90">1h30</option>
                  <option value="120">2 heures</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Délai minimum avant réservation
                </label>
                <select className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                  <option value="0">Immédiat</option>
                  <option value="2">2 heures</option>
                  <option value="24">24 heures</option>
                  <option value="48">48 heures</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre maximum de rendez-vous par jour
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  defaultValue="8"
                  className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-1" />
              Enregistrer les disponibilités
            </Button>
          </div>
        </div>
      </Card>

      {/* Aperçu du calendrier */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu de vos disponibilités</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-3">Vos créneaux disponibles cette semaine :</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeSlots.filter(slot => slot.isActive).map((slot) => (
                <div key={slot.id} className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-gray-900 text-sm">{slot.day}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Réseaux sociaux et liens</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe className="w-4 h-4 inline mr-1" />
                Site web
              </label>
              <input
                type="url"
                value={socialLinks.website}
                onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value })}
                placeholder="www.votre-site.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Linkedin className="w-4 h-4 inline mr-1" />
                LinkedIn
              </label>
              <input
                type="text"
                value={socialLinks.linkedin}
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                placeholder="linkedin.com/in/votre-profil"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Facebook className="w-4 h-4 inline mr-1" />
                Facebook
              </label>
              <input
                type="text"
                value={socialLinks.facebook}
                onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                placeholder="facebook.com/votre-page"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Instagram className="w-4 h-4 inline mr-1" />
                Instagram
              </label>
              <input
                type="text"
                value={socialLinks.instagram}
                onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                placeholder="@votre-compte"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-1" />
              Enregistrer
            </Button>
          </div>
        </div>
      </Card>

      {/* Documents */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Documents professionnels</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Carte professionnelle</p>
                  <p className="text-sm text-gray-600">Validité : 31/12/2024</p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                <Check className="w-3 h-3 mr-1" />
                Vérifié
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Assurance RC Pro</p>
                  <p className="text-sm text-gray-600">Validité : 31/12/2024</p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                <Check className="w-3 h-3 mr-1" />
                Vérifié
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Diplôme/Formation</p>
                  <p className="text-sm text-gray-600">BTS Professions Immobilières</p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                <Check className="w-3 h-3 mr-1" />
                Vérifié
              </Badge>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full mt-4">
            <Plus className="w-4 h-4 mr-1" />
            Ajouter un document
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderBankingTab = () => (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Informations bancaires</h3>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Informations sécurisées</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Vos informations bancaires sont cryptées et sécurisées. Elles ne sont utilisées que pour le versement de vos commissions.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titulaire du compte</label>
              <input
                type="text"
                value={bankInfo.accountHolder}
                onChange={(e) => setBankInfo({ ...bankInfo, accountHolder: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
              <input
                type="text"
                value={bankInfo.iban}
                onChange={(e) => setBankInfo({ ...bankInfo, iban: e.target.value })}
                placeholder="FR76 1234 5678 9012 3456 7890 123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">BIC/SWIFT</label>
              <input
                type="text"
                value={bankInfo.bic}
                onChange={(e) => setBankInfo({ ...bankInfo, bic: e.target.value })}
                placeholder="BNPAFRPP"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-1" />
              Enregistrer
            </Button>
          </div>
        </div>
      </Card>

      {/* Historique des paiements */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Historique des paiements</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Commission - Vente appartement T3</p>
                <p className="text-sm text-gray-600">15 novembre 2023</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+ 2 400 €</p>
                <Badge variant="success" size="sm">Payé</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Commission - Vente maison</p>
                <p className="text-sm text-gray-600">28 octobre 2023</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+ 2 400 €</p>
                <Badge variant="success" size="sm">Payé</Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Commission - Vente studio</p>
                <p className="text-sm text-gray-600">10 octobre 2023</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+ 2 400 €</p>
                <Badge variant="success" size="sm">Payé</Badge>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full mt-4">
            Voir tout l'historique
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Préférences de notifications</h3>
          
          <div className="space-y-6">
            {/* Notifications par email */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Notifications par email</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Nouveaux leads</p>
                    <p className="text-sm text-gray-600">Recevez un email pour chaque nouveau lead</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.newLeads}
                    onChange={(e) => setNotifications({ ...notifications, newLeads: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Demandes de visite</p>
                    <p className="text-sm text-gray-600">Soyez alerté des nouvelles demandes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.visitRequests}
                    onChange={(e) => setNotifications({ ...notifications, visitRequests: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Mises à jour d'offres</p>
                    <p className="text-sm text-gray-600">Suivez l'évolution des offres</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.offerUpdates}
                    onChange={(e) => setNotifications({ ...notifications, offerUpdates: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Rapport hebdomadaire</p>
                    <p className="text-sm text-gray-600">Résumé de votre activité chaque semaine</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.weeklyReport}
                    onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Newsletter mensuelle</p>
                    <p className="text-sm text-gray-600">Actualités et conseils LoopImmo</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.monthlyNewsletter}
                    onChange={(e) => setNotifications({ ...notifications, monthlyNewsletter: e.target.checked })}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                </label>
              </div>
            </div>

            {/* Notifications SMS */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Notifications SMS</h4>
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Alertes SMS</p>
                  <p className="text-sm text-gray-600">Recevez les notifications urgentes par SMS</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.smsAlerts}
                  onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                />
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button>
              <Save className="w-4 h-4 mr-1" />
              Enregistrer les préférences
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'availability', label: 'Disponibilités', icon: Calendar },
    { id: 'social', label: 'Réseaux & Documents', icon: Globe },
    { id: 'banking', label: 'Paiements', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <DashboardLayout role="ambassador">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600 mt-1">Gérez votre profil et vos préférences</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'availability' && renderAvailabilityTab()}
        {activeTab === 'social' && renderSocialTab()}
        {activeTab === 'banking' && renderBankingTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
      </div>
    </DashboardLayout>
  );
};
