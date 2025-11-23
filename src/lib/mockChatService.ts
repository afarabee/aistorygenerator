export interface ChatContext {
  type: 'story' | 'criteria' | 'testing' | 'dev-notes' | 'points';
  suggestion?: any;
  field?: string;
}

interface MockChatResponse {
  text: string;
  context: ChatContext;
}

export function generateMockChatResponse(
  userInput: string,
  currentStory: any
): MockChatResponse {
  const input = userInput.toLowerCase();
  
  // Detect action and intent
  if (input.includes('add') && (input.includes('acceptance') || input.includes('criterion') || input.includes('ac'))) {
    return {
      text: "I'll add a new acceptance criterion focusing on data validation and error handling.",
      context: {
        type: 'criteria',
        suggestion: 'System validates all user inputs and displays clear error messages for invalid data',
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if (input.includes('remove') && (input.includes('acceptance') || input.includes('criterion') || input.includes('ac'))) {
    return {
      text: "I recommend removing the first acceptance criterion as it seems redundant with the others.",
      context: {
        type: 'criteria',
        suggestion: { action: 'remove', index: 0 },
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if (input.includes('minus') && (input.includes('criterion') || input.includes('ac'))) {
    return {
      text: "I'll remove the last acceptance criterion to simplify the scope.",
      context: {
        type: 'criteria',
        suggestion: { action: 'remove', index: -1 },
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if ((input.includes('increase') || input.includes('bump') || input.includes('raise')) && input.includes('point')) {
    const points = parseInt(input.match(/\d+/)?.[0] || '8');
    return {
      text: `Given the complexity, I recommend increasing the story points to ${points}.`,
      context: {
        type: 'points',
        suggestion: points,
        field: 'storyPoints'
      }
    };
  }
  
  if ((input.includes('decrease') || input.includes('reduce') || input.includes('lower')) && input.includes('point')) {
    const points = parseInt(input.match(/\d+/)?.[0] || '3');
    return {
      text: `This seems simpler than initially thought. Let's reduce to ${points} story points.`,
      context: {
        type: 'points',
        suggestion: points,
        field: 'storyPoints'
      }
    };
  }
  
  if (input.includes('simplif') && input.includes('description')) {
    return {
      text: "I'll make the description more concise while keeping the key points.",
      context: {
        type: 'story',
        suggestion: currentStory.description.split('.')[0] + '. This enables better user experience and efficiency.',
        field: 'description'
      }
    };
  }
  
  if (input.includes('detail') && input.includes('description')) {
    return {
      text: "I'll add more technical details to the description.",
      context: {
        type: 'story',
        suggestion: currentStory.description + ' This includes comprehensive input validation, secure data handling, error recovery mechanisms, and audit logging for compliance.',
        field: 'description'
      }
    };
  }
  
  if (input.includes('change') && input.includes('title')) {
    return {
      text: "Here's a more descriptive title that better captures the user value.",
      context: {
        type: 'story',
        suggestion: 'Enhanced ' + currentStory.title + ' with Advanced Features',
        field: 'title'
      }
    };
  }
  
  if (input.includes('edge case')) {
    return {
      text: "I've identified an important edge case to consider for testing.",
      context: {
        type: 'testing',
        suggestion: 'Concurrent access from multiple sessions with conflicting data updates',
        field: 'edgeCases'
      }
    };
  }
  
  if (input.includes('security') || input.includes('secure')) {
    return {
      text: "I'll add security-focused acceptance criteria.",
      context: {
        type: 'criteria',
        suggestion: 'All data transmissions use HTTPS encryption and sensitive data is never logged',
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if (input.includes('performance') || input.includes('fast') || input.includes('speed')) {
    return {
      text: "Adding performance requirements to ensure optimal user experience.",
      context: {
        type: 'criteria',
        suggestion: 'Page load time must not exceed 2 seconds on standard broadband connection',
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if (input.includes('accessibility') || input.includes('a11y')) {
    return {
      text: "Accessibility is crucial. Let me add WCAG compliance criteria.",
      context: {
        type: 'criteria',
        suggestion: 'Interface meets WCAG 2.1 Level AA standards with keyboard navigation and screen reader support',
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if (input.includes('mobile') || input.includes('responsive')) {
    return {
      text: "Adding mobile responsiveness requirement.",
      context: {
        type: 'criteria',
        suggestion: 'Interface is fully responsive and works seamlessly on mobile devices (iOS and Android)',
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if (input.includes('error') || input.includes('validation')) {
    return {
      text: "Let's ensure robust error handling is covered.",
      context: {
        type: 'criteria',
        suggestion: 'All error states provide clear, actionable feedback to users with recovery options',
        field: 'acceptanceCriteria'
      }
    };
  }
  
  if (input.includes('technical') || input.includes('implementation')) {
    return {
      text: "Here are some technical implementation notes to consider:",
      context: {
        type: 'dev-notes',
        suggestion: `// API Integration\nconst fetchData = async () => {\n  try {\n    const response = await fetch('/api/endpoint', {\n      method: 'GET',\n      headers: { 'Authorization': 'Bearer token' }\n    });\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('API Error:', error);\n    throw error;\n  }\n};`,
        field: 'codeSnippets'
      }
    };
  }
  
  if (input.includes('test') && (input.includes('data') || input.includes('case'))) {
    return {
      text: "I recommend testing with this additional scenario.",
      context: {
        type: 'testing',
        suggestion: 'User attempts to perform action without required permissions or authentication',
        field: 'edgeCases'
      }
    };
  }
  
  // General helpful responses without suggestions
  if (input.includes('help') || input.includes('suggest') || input.includes('improve')) {
    return {
      text: "I can help you refine this story in several ways:\n\n• Add or remove acceptance criteria\n• Adjust story point estimates\n• Clarify the description\n• Add edge cases for testing\n• Provide implementation guidance\n\nWhat would you like to focus on?",
      context: { type: 'story' }
    };
  }
  
  // Default contextual response
  return {
    text: "I understand you want to refine the story. Could you be more specific about what you'd like to change? For example:\n\n• \"Add an acceptance criterion for security\"\n• \"Increase story points to 8\"\n• \"Add edge cases for testing\"\n• \"Simplify the description\"",
    context: { type: 'story' }
  };
}
