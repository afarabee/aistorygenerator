import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { StoryBuilder } from "@/components/story/StoryBuilder";
import { ProjectSidebar } from "@/components/sidebar/ProjectSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";

const StoryGenerator = () => {
  const [storyGenerated, setStoryGenerated] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showTestData, setShowTestData] = useState(false);
  const [story, setStory] = useState<any>(null);

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

  return (
    <AppLayout
      sidebarContent={<ProjectSidebar />}
      chatContent={<ChatPanel key={storyGenerated ? 'story' : 'no-story'} currentStory={story} />}
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
      />
    </AppLayout>
  );
};

export default StoryGenerator;
