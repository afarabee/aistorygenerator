import { useState, useRef } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { StoryBuilder } from "@/components/story/StoryBuilder";
import { ProjectSidebar } from "@/components/sidebar/ProjectSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";

const StoryGenerator = () => {
  const [storyGenerated, setStoryGenerated] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showTestData, setShowTestData] = useState(false);
  const [story, setStory] = useState<any>(null);

  // Refs to store handlers from StoryBuilder
  const applySuggestionRef = useRef<((type: string, content: any) => void) | null>(null);
  const undoSuggestionRef = useRef<(() => void) | null>(null);
  const restartStoryRef = useRef<(() => void) | null>(null);

  const handleStoryGenerated = () => {
    setStoryGenerated(true);
    setShowChat(true);
  };

  const handleNewStory = () => {
    setStoryGenerated(false);
    setShowTestData(false);
    setShowChat(false);
    setStory(null);
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  const handleToggleTestData = () => {
    setShowTestData(!showTestData);
  };

  const handleApplySuggestion = (type: string, content: any) => {
    if (applySuggestionRef.current) {
      applySuggestionRef.current(type, content);
    }
  };

  const handleUndoSuggestion = () => {
    // Undo is handled by version history in StoryBuilder
    console.log('Undo requested from ChatPanel');
  };

  const handleRestartStory = () => {
    if (restartStoryRef.current) {
      restartStoryRef.current();
    }
  };

  return (
    <AppLayout
      sidebarContent={
        <ProjectSidebar 
          showTestData={showTestData}
          onToggleTestData={handleToggleTestData}
          onNewStory={handleNewStory}
          onRestartStory={handleRestartStory}
        />
      }
      chatContent={
        <ChatPanel 
          key={storyGenerated ? 'story' : 'no-story'} 
          currentStory={story}
          onApplySuggestion={handleApplySuggestion}
          onUndoSuggestion={handleUndoSuggestion}
        />
      }
      showChat={showChat}
    >
      <StoryBuilder 
        storyGenerated={storyGenerated}
        onStoryGenerated={handleStoryGenerated}
        onNewStory={handleNewStory}
        showChat={showChat}
        onToggleChat={handleToggleChat}
        showTestData={showTestData}
        onToggleTestData={handleToggleTestData}
        onStoryUpdate={setStory}
        onSetApplySuggestionHandler={(applyHandler) => {
          applySuggestionRef.current = applyHandler;
        }}
        onSetRestartStoryHandler={(restartHandler) => {
          restartStoryRef.current = restartHandler;
        }}
      />
    </AppLayout>
  );
};

export default StoryGenerator;
