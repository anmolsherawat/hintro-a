import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { FeedbackView } from './components/FeedbackView';
import { CallInsightsView } from './components/CallInsightsView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { PromptsView } from './components/PromptsView';
import { BoxyControlsView } from './components/BoxyControlsView';
import { AuthView } from './components/AuthView';
import { useUser } from './context/UserContext';

const AppContent: React.FC = () => {
  const { userId } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!userId) {
    return <AuthView />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'insights':
        return <CallInsightsView />;
      case 'kb':
        return <KnowledgeBaseView />;
      case 'prompts':
        return <PromptsView />;
      case 'controls':
        return <BoxyControlsView />;
      case 'feedback':
      case 'feedback-history':
        return <FeedbackView />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Section Under Development</h2>
              <p className="text-gray-500">The {activeTab} page is coming soon!</p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="text-indigo-600 font-medium hover:underline"
              >
                Go back to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans antialiased text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col lg:pl-64 min-w-0">
        <Header />
        {renderContent()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
