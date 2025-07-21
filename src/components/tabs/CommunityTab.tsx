import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VoiceButton from '@/components/VoiceButton';
import { 
  Users, 
  MessageCircle, 
  Image as ImageIcon, 
  Send,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface CommunityTabProps {
  language: string;
}

interface ChatGroup {
  id: string;
  name: string;
  crop: string;
  icon: string;
  memberCount: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'voice';
  imageUrl?: string;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ language }) => {
  const [activeView, setActiveView] = useState<'groups' | 'chat'>('groups');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [chatGroups] = useState<ChatGroup[]>([
    {
      id: '1',
      name: 'Wheat Farmers Maharashtra',
      crop: 'Wheat',
      icon: '🌾',
      memberCount: 247,
      lastMessage: 'Best time to harvest wheat?',
      lastMessageTime: '2 mins ago',
      unreadCount: 3
    },
    {
      id: '2',
      name: 'Cotton Growers',
      crop: 'Cotton',
      icon: '🌱',
      memberCount: 189,
      lastMessage: 'Pink bollworm treatment advice needed',
      lastMessageTime: '15 mins ago',
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Vegetable Farmers',
      crop: 'Mixed',
      icon: '🥬',
      memberCount: 156,
      lastMessage: 'Tomato prices rising in Pune market',
      lastMessageTime: '1 hour ago',
      unreadCount: 1
    },
    {
      id: '4',
      name: 'Organic Farming',
      crop: 'Organic',
      icon: '🌿',
      memberCount: 98,
      lastMessage: 'Natural pest control methods',
      lastMessageTime: '3 hours ago',
      unreadCount: 0
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Ramesh Kumar',
      message: 'मेरे गेहूं की फसल में पीले पत्ते दिख रहे हैं। क्या करना चाहिए?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      sender: 'Suresh Patel',
      message: 'Yellow leaves could be nitrogen deficiency. Apply urea fertilizer.',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: '3',
      sender: 'Kisan AI',
      message: 'Based on the symptoms, this could be nitrogen deficiency or fungal infection. Check soil moisture and apply appropriate treatment.',
      timestamp: '10:36 AM',
      type: 'text'
    }
  ]);

  const filteredGroups = chatGroups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleJoinGroup = (groupId: string) => {
    setSelectedGroup(groupId);
    setActiveView('chat');
  };

  if (activeView === 'chat' && selectedGroup) {
    const group = chatGroups.find(g => g.id === selectedGroup);
    
    return (
      <div className="pb-20 p-4 space-y-4">
        {/* Chat Header */}
        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={() => setActiveView('groups')}
            className="mb-4"
          >
            ← Back to Groups
          </Button>
          
          <Card className="card-kisan">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{group?.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {group?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {group?.memberCount} members • Active now
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Messages */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.map((message) => (
            <Card key={message.id} className="p-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {message.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">
                    {message.message}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Message Input */}
        <Card className="card-kisan">
          <div className="flex items-center space-x-3">
            <div className="flex-1 flex items-center space-x-2">
              <Input
                placeholder="Type your message... टाइप करें..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button variant="ghost" size="icon">
                <ImageIcon className="w-4 h-4" />
              </Button>
              <VoiceButton
                language={language}
                size="sm"
                onTranscript={(transcript) => setMessageInput(transcript)}
              />
            </div>
            <Button onClick={handleSendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-20 p-4 space-y-6">
      {/* Header */}
      <div className="pt-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Farmer Community
        </h1>
        <div className="text-dual-lang">
          <p className="text-primary-lang text-muted-foreground">
            Connect with fellow farmers and share knowledge
          </p>
          <p className="text-secondary-lang text-sm text-muted-foreground">
            किसान भाइयों से जुड़ें और ज्ञान साझा करें
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search groups by crop or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Create Group CTA */}
      <Card className="card-kisan bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Start Your Own Group
            </h3>
            <p className="text-sm text-muted-foreground">
              Create a community for your crop or region
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </Card>

      {/* Groups List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">
          Popular Groups
        </h3>

        {filteredGroups.map((group) => (
          <Card key={group.id} className="card-feature p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="text-2xl">{group.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">
                      {group.name}
                    </h4>
                    {group.unreadCount > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {group.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {group.memberCount} members
                  </p>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {group.lastMessage}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleJoinGroup(group.id)}
                >
                  Join
                </Button>
                <p className="text-xs text-muted-foreground mt-1">
                  {group.lastMessageTime}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Community Assistant */}
      <Card className="card-kisan bg-accent/5 border-accent/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Kisan AI Assistant
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get instant answers to farming questions in any group chat.
            </p>
            <div className="flex items-center space-x-2">
              <VoiceButton
                language={language}
                size="sm"
                onTranscript={(transcript) => console.log('Community voice:', transcript)}
              />
              <span className="text-xs text-muted-foreground">
                Ask anything about farming
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommunityTab;