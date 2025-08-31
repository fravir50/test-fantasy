import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Moon, Sun, Globe, Save } from 'lucide-react';

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    username: 'TennisLegend_2025',
    email: 'user@tennisverse.com',
    notifications: {
      matchResults: true,
      playerUpdates: true,
      leaderboardChanges: false,
      weeklyReports: true
    },
    theme: 'dark',
    language: 'english',
    privacy: {
      showProfile: true,
      showTeam: true,
      showStats: false
    }
  });

  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const updateSimpleSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          <span>Settings</span>
        </h1>
        <p className="text-gray-400 mt-1">Customize your TennisVerse experience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                        : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Profile Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      value={settings.username}
                      onChange={(e) => updateSimpleSetting('username', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateSimpleSetting('email', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => updateSimpleSetting('language', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Español</option>
                    <option value="french">Français</option>
                    <option value="german">Deutsch</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div>
                        <h3 className="font-medium text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {key === 'matchResults' && 'Get notified when your players finish matches'}
                          {key === 'playerUpdates' && 'Receive updates about player rankings and form'}
                          {key === 'leaderboardChanges' && 'Know when your leaderboard position changes'}
                          {key === 'weeklyReports' && 'Weekly summary of your team performance'}
                        </p>
                      </div>
                      <button
                        onClick={() => updateSetting('notifications', key, !value)}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                          value ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Appearance</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Theme</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'dark', label: 'Dark', icon: Moon, desc: 'Optimized for low-light viewing' },
                        { id: 'light', label: 'Light', icon: Sun, desc: 'Clean and bright interface' },
                        { id: 'auto', label: 'Auto', icon: Globe, desc: 'Follows system preference' }
                      ].map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => updateSimpleSetting('theme', theme.id)}
                            className={`p-4 rounded-lg border transition-all duration-300 text-left ${
                              settings.theme === theme.id
                                ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                                : 'bg-gray-900/30 border-gray-700/30 text-gray-400 hover:border-cyan-500/30'
                            }`}
                          >
                            <Icon className="w-6 h-6 mb-2" />
                            <h3 className="font-medium">{theme.label}</h3>
                            <p className="text-xs opacity-75">{theme.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white mb-4">Privacy Settings</h2>
                
                <div className="space-y-4">
                  {Object.entries(settings.privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                      <div>
                        <h3 className="font-medium text-white capitalize">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {key === 'showProfile' && 'Allow other users to view your profile'}
                          {key === 'showTeam' && 'Make your team composition visible to others'}
                          {key === 'showStats' && 'Share your performance statistics publicly'}
                        </p>
                      </div>
                      <button
                        onClick={() => updateSetting('privacy', key, !value)}
                        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                          value ? 'bg-cyan-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                          value ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg shadow-cyan-500/25">
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};