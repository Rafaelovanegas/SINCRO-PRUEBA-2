
import React, { useState } from 'react';
import { ToolType } from './types';
import Layout from './Layout';
import Dashboard from './Dashboard';
import ImageEditor from './ImageEditor';
import TextAssistant from './TextAssistant';
import AudioGenerator from './AudioGenerator';
import LiveTalk from './LiveTalk';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ToolType>(ToolType.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case ToolType.DASHBOARD: return <Dashboard onNavigate={setActiveTab} />;
      case ToolType.LIVE: return <LiveTalk />;
      case ToolType.IMAGE: return <ImageEditor />;
      case ToolType.TEXT: return <TextAssistant />;
      case ToolType.AUDIO: return <AudioGenerator />;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="pb-20 md:pb-0">{renderContent()}</div>
    </Layout>
  );
};

export default App;
