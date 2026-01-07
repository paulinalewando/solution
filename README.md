### Installation

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure OpenAI**:

   ```bash
   # Copy env.txt to .env
   cp env.txt .env

   # Edit .env and add your OpenAI API key
   OPENAI_API_KEY=sk-proj-your_key_here
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   The add-in will be served at `https://localhost:3000`

4. **Sideload the add-in in Word**:
   - Open Microsoft Word
   - Go to Insert > Add-ins > My Add-ins
   - Choose "Upload My Add-in"
   - Select the `manifest.xml` file

### Build for Production

```bash
npm run build
```

## 🚧 Future Enhancements

### AI Service Improvements

- [ ] **Streaming Support** - Implement real-time streaming for better UX

  ```typescript
  // Use stream: true for progressive content display
  const stream = await openai.chat.completions.create({ stream: true });
  ```

- [ ] **Token Management** - Add maxTokens configuration and tracking

- [ ] **Response Metadata** - Return additional information

  ```typescript
  interface AIResponse {
    content: string;
    success: boolean;
    metadata?: {
      model: string;
      tokensUsed: number;
      finishReason: string;
      responseTime: number;
    };
  }
  ```

- [ ] **Cost & Confidence Tracking** - Monitor API usage and response quality

  ```typescript
  // Store cost per request and model confidence scores
  metadata: {
    estimatedCost: number;
    confidenceScore?: number;
  }
  ```

- [ ] **Enhanced System Prompts** - Add content filtering and validation

  ```typescript
  // Validate prompt length
  // Validate response
  // Forbid inappropriate content
  // Ask clarifying questions when prompt is unclear
  // Add safety guidelines and content policies
  systemPrompt: "You are a helpful assistant. Never generate: [prohibited content].
                 If prompt is unclear, ask: [clarifying questions]"
  ```

- [ ] **Prompt Caching** - Cache common prompts to reduce API calls

- [ ] **Conversation Memory** - Maintain context across requests

  ```typescript
  // Store conversation history for contextual responses
  messages: [...previousMessages, newMessage];
  ```

- [ ] **Evaluations (Evals)** - Test and validate AI response quality

  ```typescript
  // Automated testing of AI outputs
  interface Evaluation {
    testCases: Array<{ prompt: string; expectedOutput: string }>;
    metrics: {
      accuracy: number;
      relevance: number;
      safety: number;
    };
  }
  // Run evals before deployment to ensure quality
  ```

- [ ] **A/B Testing** - Compare different prompts and models

- [ ] **User Feedback Collection** - Gather ratings and improvements

  ```typescript
  // Thumbs up/down on generated content
  // Collect feedback to improve prompts
  ```

- [ ] **Rate Limiting** - Prevent API abuse and manage costs

- [ ] **Retry Logic**

- [ ] **Error Monitoring** - Track and alert on failures

  ```typescript
  // Integration with Sentry, LogRocket, or similar
  // Alert on high error rates or specific error types
  ```

- [ ] **Analytics & Telemetry** - Track usage patterns
  ```typescript
  // Monitor: most used prompts, success rates, response times
  // Identify areas for improvement
  ```

### General Features

- [ ] Support for multiple AI providers (Claude, Gemini) - OpenRouter
- [ ] Customize UI for user
- [ ] History of generated content
- [ ] Context-aware suggestions (analyze document content)
- [ ] Multi-language support
- [ ] Unit tests
