import OpenAI from 'openai'

export function useOpenAI() {
  const keys = {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    project: import.meta.env.VITE_OPENAI_PROJECT_ID,
    organization: import.meta.env.VITE_OPENAI_ORG_ID,
  }

  const client = new OpenAI({ ...keys, dangerouslyAllowBrowser: true })

  async function sendChat(responder, contextMessages, contextMembers, model = 'gpt-4.1-nano') {
    // Build context
    const systemMessage = `
    This is a group chat with ${contextMembers.map(m => m.name).join(', ')}.
    You are ${responder.name}.
    Please respond to the messages in the context of this group chat.`

    const reshapedMessages = contextMessages.map(message => {
      const role = message.senderID === responder.id ? 'assistant' : 'user'
      const authorName = contextMembers.find(m => m.id === message.senderID).name

      return { role, content: `[${authorName}]: ${message.text}` }
    })

    const chatContext = [
      {
        role: 'developer',
        content: systemMessage,
      },
      ...reshapedMessages,
      {
        role: 'assistant',
        content: '',
      },
    ]

    // Request response
    const response = await client.responses.create({
      input: chatContext,
      model,
      max_output_tokens: 1024,
      store: true,
    })

    // Cleanup response
    const cleanedResponse = response.output_text
      .replace(/^\s*\[[^\]]+\]:\s*/, '')
      .replace(/\n/g, ' ')
      .trim()

    return cleanedResponse
  }

  return { sendChat }
}
