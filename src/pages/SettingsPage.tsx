import React from 'react';

interface SettingsPageProps {
  currentSubmenu: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ currentSubmenu }) => {
  const renderSettingsSection = () => {
    switch (currentSubmenu) {
      case 'game':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Game Settings
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Game Preferences</h3>
                <p className="text-gray-600">
                  Configure your game preferences here.
                </p>
              </div>
            </div>
          </div>
        );
      case 'dev':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Developer Settings
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Debug Options</h3>
                <p className="text-gray-600">
                  Developer tools and debug options.
                </p>
              </div>
            </div>
          </div>
        );
      case 'saving':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Save Settings
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Save & Load</h3>
                <p className="text-gray-600">
                  Manage your save files and auto-save settings.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-lg text-gray-600">
              Select a settings category from the menu.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Settings</h1>
        </div>
        {renderSettingsSection()}
      </div>
    </div>
  );
};

export default SettingsPage;
