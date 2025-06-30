import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AiChatService {
  private chatHistory: Map<string, ChatMessage[]> = new Map();

  constructor() { }

  /**
   * Start a new chat session with initial context
   * @param messageId The ID of the message providing context
   * @param initialContext Initial message content for context
   */
  initializeChat(messageId: string, initialContext: string): ChatMessage[] {
    // Create system prompt with the initial context
    const contextMessage: ChatMessage = {
      role: 'assistant',
      content: `I'll help you with the following message: "${initialContext}". What would you like to know?`,
      timestamp: new Date()
    };

    // Initialize or reset chat history for this message
    this.chatHistory.set(messageId, [contextMessage]);
    return this.getChatHistory(messageId);
  }

  /**
   * Get chat history for a specific message
   * @param messageId Message ID
   * @returns Array of chat messages
   */
  getChatHistory(messageId: string): ChatMessage[] {
    return this.chatHistory.get(messageId) || [];
  }

  /**
   * Send a message to the AI assistant and get a response
   * @param messageId Message ID for the context
   * @param userMessage User's message content
   * @returns Observable of assistant's response
   */
  sendMessage(messageId: string, userMessage: string): Observable<ChatMessage> {
    // Create user message
    const userChatMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    // Add to history
    const history = this.getChatHistory(messageId);
    history.push(userChatMessage);
    this.chatHistory.set(messageId, history);

    // Generate AI response (simulated for now)
    return this.generateAiResponse(messageId, userMessage);
  }

  /**
   * Generate AI response based on message history and current query
   * @param messageId Message ID for context
   * @param userMessage User's message
   * @returns Observable of AI response message
   */
  private generateAiResponse(messageId: string, userMessage: string): Observable<ChatMessage> {
    // Get chat history
    const history = this.getChatHistory(messageId);
    const initialContext = history[0]?.content || '';

    // Simulate AI response based on user message and context
    // In a real app, this would call an actual AI service
    let responseContent = '';
    
    if (userMessage.toLowerCase().includes('summary')) {
      responseContent = 'Here\'s a summary of the key points in this message: \n\n' +
        '- The main topic is about project updates\n' +
        '- There are several action items mentioned\n' +
        '- The deadline mentioned is next week';
    } else if (userMessage.toLowerCase().includes('suggest') || userMessage.toLowerCase().includes('recommendation')) {
      responseContent = 'Based on this message, I recommend: \n\n' +
        '1. Schedule a follow-up meeting to discuss the specific action items\n' +
        '2. Prepare a timeline for the deliverables mentioned\n' +
        '3. Reach out to the stakeholders to confirm requirements';
    } else if (userMessage.toLowerCase().includes('explain')) {
      responseContent = 'This message appears to be about project coordination. The sender is providing updates on the ' +
        'current status and asking for input on next steps. There are several technical terms used that relate to ' +
        'the project methodology and deliverables.';
    } else {
      responseContent = 'I\'ve analyzed this message and can help you understand its context, suggest responses, ' +
        'or extract important information. What specific aspect would you like me to help with?';
    }

    // Create AI response message
    const aiResponse: ChatMessage = {
      role: 'assistant',
      content: responseContent,
      timestamp: new Date()
    };

    // Add to history
    history.push(aiResponse);
    this.chatHistory.set(messageId, history);

    // Return with a slight delay to simulate processing time
    return of(aiResponse).pipe(delay(1000));
  }

  /**
   * Clear chat history for a specific message
   * @param messageId Message ID
   */
  clearChat(messageId: string): void {
    this.chatHistory.delete(messageId);
  }
} 