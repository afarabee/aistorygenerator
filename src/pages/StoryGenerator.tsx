import AppLayout from "@/components/layout/AppLayout";
import { StoryBuilder } from "@/components/story/StoryBuilder";
import { ProjectSidebar } from "@/components/sidebar/ProjectSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";

const StoryGenerator = () => {
  return (
    <AppLayout
      sidebarContent={<ProjectSidebar />}
      chatContent={<ChatPanel />}
      showChat={true}
    >
      <StoryBuilder />
    </AppLayout>
  );
};

export default StoryGenerator;
