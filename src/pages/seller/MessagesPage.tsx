import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { 
  MessageSquare, User, Calendar, Clock, Search, 
  Filter, Star, Paperclip, Send, Phone, Mail,
  Home, ChevronRight, Archive, Trash2, MoreVertical
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface Message {
  id: string;
  conversationId: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
  status: 'active' | 'archived';
  type: 'inquiry' | 'offer' | 'visit' | 'general';
  messages: Array<{
    id: string;
    sender: 'contact' | 'owner';
    content: string;
    date: string;
    read: boolean;
  }>;
}

export const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  // Mock messages data
  const conversations: Message[] = [
    {
      id: '1',
      conversationId: 'conv-1',
      propertyId: '1',
      propertyTitle: 'Appartement 4 pièces - Neuilly-sur-Seine',
      propertyImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      contactName: 'Marie Dubois',
      contactEmail: 'marie.dubois@email.com',
      contactPhone: '06 12 34 56 78',
      lastMessage: 'Bonjour, est-il possible de visiter ce week-end ?',
      lastMessageDate: '2024-03-19T14:30:00',
      unreadCount: 2,
      status: 'active',
      type: 'visit',
      messages: [
        {
          id: 'm1',
          sender: 'contact',
          content: 'Bonjour, je suis très intéressée par votre appartement.',
          date: '2024-03-19T10:00:00',
          read: true
        },
        {
          id: 'm2',
          sender: 'owner',
          content: 'Bonjour Marie, merci pour votre intérêt. Que souhaitez-vous savoir ?',
          date: '2024-03-19T11:30:00',
          read: true
        },
        {
          id: 'm3',
          sender: 'contact',
          content: 'J\'aimerais organiser une visite. Êtes-vous disponible ce week-end ?',
          date: '2024-03-19T14:00:00',
          read: false
        },
        {
          id: 'm4',
          sender: 'contact',
          content: 'Bonjour, est-il possible de visiter ce week-end ?',
          date: '2024-03-19T14:30:00',
          read: false
        }
      ]
    },
    {
      id: '2',
      conversationId: 'conv-2',
      propertyId: '2',
      propertyTitle: 'Maison 6 pièces - Boulogne-Billancourt',
      propertyImage: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      contactName: 'Pierre Martin',
      contactEmail: 'pierre.martin@email.com',
      contactPhone: '06 98 76 54 32',
      lastMessage: 'Merci pour ces informations, je vais réfléchir.',
      lastMessageDate: '2024-03-18T16:45:00',
      unreadCount: 0,
      status: 'active',
      type: 'inquiry',
      messages: [
        {
          id: 'm5',
          sender: 'contact',
          content: 'Bonjour, pourriez-vous me donner plus d\'informations sur le jardin ?',
          date: '2024-03-18T09:00:00',
          read: true
        },
        {
          id: 'm6',
          sender: 'owner',
          content: 'Bonjour Pierre, le jardin fait 300m² avec une terrasse de 50m². Il est orienté sud.',
          date: '2024-03-18T10:30:00',
          read: true
        },
        {
          id: 'm7',
          sender: 'contact',
          content: 'Merci pour ces informations, je vais réfléchir.',
          date: '2024-03-18T16:45:00',
          read: true
        }
      ]
    },
    {
      id: '3',
      conversationId: 'conv-3',
      propertyId: '1',
      propertyTitle: 'Appartement 4 pièces - Neuilly-sur-Seine',
      propertyImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      contactName: 'Sophie Laurent',
      contactEmail: 'sophie.laurent@email.com',
      contactPhone: '06 45 67 89 01',
      lastMessage: 'Je vous fais une offre à 850 000€',
      lastMessageDate: '2024-03-17T11:20:00',
      unreadCount: 1,
      status: 'active',
      type: 'offer',
      messages: [
        {
          id: 'm8',
          sender: 'contact',
          content: 'Suite à la visite, je suis très intéressée.',
          date: '2024-03-17T10:00:00',
          read: true
        },
        {
          id: 'm9',
          sender: 'contact',
          content: 'Je vous fais une offre à 850 000€',
          date: '2024-03-17T11:20:00',
          read: false
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'unread' && conv.unreadCount === 0) return false;
    if (filter === 'archived' && conv.status !== 'archived') return false;
    if (searchQuery && !conv.contactName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !conv.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const getTypeColor = (type: Message['type']) => {
    switch (type) {
      case 'inquiry': return 'info';
      case 'offer': return 'success';
      case 'visit': return 'warning';
      case 'general': return 'default';
      default: return 'default';
    }
  };

  const getTypeText = (type: Message['type']) => {
    switch (type) {
      case 'inquiry': return 'Question';
      case 'offer': return 'Offre';
      case 'visit': return 'Visite';
      case 'general': return 'Général';
      default: return type;
    }
  };

  const formatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Il y a moins d\'une heure';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffHours < 48) return 'Hier';
    return date.toLocaleDateString('fr-FR');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConv) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] gap-6">
      {/* Conversations List */}
      <div className="w-96 flex flex-col">
        <div className="mb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'unread', 'starred', 'archived'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={cn(
                  "px-3 py-1 text-sm font-medium rounded-lg transition-colors",
                  filter === filterType 
                    ? "bg-primary-100 text-primary-700" 
                    : "text-gray-600 hover:bg-gray-100"
                )}
              >
                {filterType === 'all' && 'Tous'}
                {filterType === 'unread' && 'Non lus'}
                {filterType === 'starred' && 'Favoris'}
                {filterType === 'archived' && 'Archivés'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredConversations.map((conv) => (
            <Card
              key={conv.id}
              className={cn(
                "p-4 cursor-pointer hover:shadow-md transition-shadow",
                selectedConversation === conv.id && "ring-2 ring-primary-500",
                conv.unreadCount > 0 && "bg-blue-50"
              )}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <div className="flex items-start gap-3">
                <img 
                  src={conv.propertyImage} 
                  alt={conv.propertyTitle}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-gray-900 truncate">{conv.contactName}</h4>
                    <div className="flex items-center gap-2">
                      {conv.unreadCount > 0 && (
                        <Badge size="sm" variant="primary">
                          {conv.unreadCount}
                        </Badge>
                      )}
                      <Badge size="sm" variant={getTypeColor(conv.type)}>
                        {getTypeText(conv.type)}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 truncate mb-1">{conv.propertyTitle}</p>
                  <p className={cn(
                    "text-sm truncate",
                    conv.unreadCount > 0 ? "font-medium text-gray-900" : "text-gray-600"
                  )}>
                    {conv.lastMessage}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatMessageDate(conv.lastMessageDate)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Conversation Detail */}
      {selectedConv ? (
        <Card className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedConv.propertyImage} 
                  alt={selectedConv.propertyTitle}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedConv.contactName}</h3>
                  <p className="text-sm text-gray-600">{selectedConv.propertyTitle}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedConv.messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === 'owner' ? "justify-end" : "justify-start"
                )}
              >
                <div className={cn(
                  "max-w-[70%] rounded-lg px-4 py-2",
                  message.sender === 'owner' 
                    ? "bg-primary-500 text-white" 
                    : "bg-gray-100 text-gray-900"
                )}>
                  <p className="text-sm">{message.content}</p>
                  <p className={cn(
                    "text-xs mt-1",
                    message.sender === 'owner' ? "text-primary-100" : "text-gray-500"
                  )}>
                    {new Date(message.date).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Paperclip className="w-4 h-4" />
              </Button>
              <input
                type="text"
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Button 
                variant="primary"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Sélectionnez une conversation
            </h3>
            <p className="text-gray-600">
              Choisissez une conversation dans la liste pour voir les messages
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
