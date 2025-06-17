import React, { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { MessageCircle, Phone, Mail, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdate: string;
  messages: number;
}

export function SupportPage() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'faq' | 'contact'>('tickets');
  const [tickets] = useState<Ticket[]>([
    {
      id: 'TCK-001',
      subject: 'Problème avec les photos de mon bien',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-01-15',
      lastUpdate: '2024-01-16',
      messages: 3
    },
    {
      id: 'TCK-002',
      subject: 'Question sur les frais de commission',
      status: 'resolved',
      priority: 'low',
      createdAt: '2024-01-10',
      lastUpdate: '2024-01-11',
      messages: 5
    }
  ]);

  const faqs = [
    {
      question: "Comment fonctionne le système d'ambassadeur ?",
      answer: "L'ambassadeur vous accompagne tout au long de la vente. Il gère les visites, prend les photos professionnelles et vous conseille sur la mise en valeur de votre bien."
    },
    {
      question: "Quels sont les frais de commission ?",
      answer: "Notre commission est de 2% du prix de vente, partagée entre la plateforme et votre ambassadeur. C'est l'une des plus basses du marché."
    },
    {
      question: "Combien de temps prend une vente en moyenne ?",
      answer: "En moyenne, nos biens se vendent en 45 jours. Cela dépend du prix, de la localisation et de la qualité de présentation du bien."
    },
    {
      question: "Puis-je changer d'ambassadeur ?",
      answer: "Oui, si vous n'êtes pas satisfait, vous pouvez demander un changement d'ambassadeur. Contactez notre support pour en discuter."
    }
  ];

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'text-blue-600 bg-blue-50';
      case 'in-progress': return 'text-yellow-600 bg-yellow-50';
      case 'resolved': return 'text-green-600 bg-green-50';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low': return 'text-gray-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
    }
  };

  return (
    <DashboardLayout role="seller">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support & Aide</h1>
          <p className="text-gray-600">Nous sommes là pour vous aider à chaque étape</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tickets'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mes tickets
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'faq'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contact'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Nous contacter
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'tickets' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Mes tickets de support</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Nouveau ticket
              </button>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{ticket.subject}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status === 'open' ? 'Ouvert' : ticket.status === 'in-progress' ? 'En cours' : 'Résolu'}
                        </span>
                        <span className={`text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority === 'low' ? 'Faible' : ticket.priority === 'medium' ? 'Moyenne' : 'Haute'} priorité
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Créé le {new Date(ticket.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {ticket.messages} messages
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Dernière mise à jour</p>
                      <p className="text-sm font-medium">{new Date(ticket.lastUpdate).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-6">Contactez-nous</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="De quoi s'agit-il ?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option>Question générale</option>
                    <option>Problème technique</option>
                    <option>Facturation</option>
                    <option>Ambassadeur</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Décrivez votre demande..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Envoyer
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-6">Autres moyens de contact</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">Du lundi au vendredi, 9h-18h</p>
                    <p className="text-indigo-600 font-medium">01 23 45 67 89</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">Réponse sous 24h</p>
                    <p className="text-indigo-600 font-medium">support@loopimmo.fr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Chat en direct</h3>
                    <p className="text-gray-600">Disponible en semaine</p>
                    <button className="text-indigo-600 font-medium hover:underline">
                      Démarrer une conversation
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Besoin d'aide urgente ?</h3>
                <p className="text-gray-600 mb-4">
                  Si vous rencontrez un problème urgent avec une visite ou une transaction, 
                  contactez directement votre ambassadeur ou appelez notre hotline.
                </p>
                <div className="flex items-center gap-2 text-red-600 font-medium">
                  <AlertCircle className="w-5 h-5" />
                  Hotline urgence : 06 12 34 56 78
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
