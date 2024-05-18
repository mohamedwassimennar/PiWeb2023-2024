import { Component } from '@angular/core';

interface CustomWindow extends Window {
  embeddedChatbotConfig?: {
    chatbotId: string;
    domain: string;
  };
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent {
  constructor() {
    const customWindow: CustomWindow = window;

    customWindow.embeddedChatbotConfig = {
      chatbotId: '4MQTo4IVDV5WMHBltDyBg',
      domain: 'www.chatbase.co',
    };

    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.setAttribute('chatbotId', '4MQTo4IVDV5WMHBltDyBg');
    script.setAttribute('domain', 'www.chatbase.co');
    script.defer = true;

    script.onload = () => {
      console.log('Chatbase script loaded successfully!');
      // Perform additional actions if needed
    };

    script.onerror = (error) => {
      console.error('Error loading Chatbase script:', error);
    };

    document.head.appendChild(script);
  }
}