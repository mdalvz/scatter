import { getRequirements } from './getRequirements';

export async function promptAndAnswer(apiKey: string): Promise<boolean> {
  const requirements = getRequirements();
  if (!requirements) {
    return false;
  }

  const prompt = `For each of these, give an example starting with the letter ${requirements.letter}.

Please make your examples true but also not common. Do not qualify your answers with explanations.

${requirements.questions.map((entry) => entry.question).join('\n')}
`;

  const response = await sendMessage(apiKey, prompt);

  for (const question of requirements.questions) {
    const regex = new RegExp(`${question.question}: ([^\n]+)(\n|$)`, 'i');
    const match = response.match(regex);
    if (match !== null) {
      setInputValue(question.input, match[1]);
    }
  }

  return true;
}

async function sendMessage(apiKey: string, prompt: string): Promise<string | null> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  });
  const data = await res.json();
  return data?.choices[0]?.message?.content || null;
}

function setInputValue(input: HTMLInputElement, value: string) {
  input.focus();
  input.select();
  document.execCommand('insertText', false, value);
  input.dispatchEvent(new Event('change', {
    bubbles: true,
  }));
}
