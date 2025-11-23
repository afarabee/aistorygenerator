import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { StoryBuilder } from "@/components/story/StoryBuilder";
import { ProjectSidebar } from "@/components/sidebar/ProjectSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";

const StoryGenerator = () => {
  const [storyGenerated, setStoryGenerated] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showTestData, setShowTestData] = useState(false);

  const handleStoryGenerated = () => {
    setStoryGenerated(true);
  };

  const handleNewStory = () => {
    setStoryGenerated(false);
    setShowTestData(false);
  };

  const handleToggleChat = () => {
    setShowChat(!showChat);
  };

  const handleToggleTestData = () => {
    setShowTestData(!showTestData);
  };

  return (
    <AppLayout
      sidebarContent={<ProjectSidebar />}
      chatContent={<ChatPanel />}
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
      />
    </AppLayout>
  );
};

export default StoryGenerator;
