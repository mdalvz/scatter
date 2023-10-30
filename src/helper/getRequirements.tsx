export interface GetRequirementsOutput {
  letter: string;
  questions: {
    question: string;
    input: HTMLInputElement;
  }[];
}

export function getRequirements(): GetRequirementsOutput | null {
  const entries = getEntries();
  if (!entries) {
    return null;
  }
  const questions = entries.map((entry) => ({
    question: entry.querySelector('div:nth-child(1)').textContent,
    input: entry.querySelector('div:nth-child(2) > input') as HTMLInputElement,
  })).slice(0, 12);
  const letter = questions[0].input.placeholder;
  if (!letter) {
    return null;
  }
  return {
    letter,
    questions,
  };
}

function getEntries(): HTMLElement[] | null {
  const className = getEntryClassName();
  if (!className) {
    return null;
  }
  return [...document.querySelectorAll(`.${className}`)] as HTMLElement[];
}

function getEntryClassName(): string | null {
  const element = document.querySelector('div > div + div > input');
  const className = element?.parentElement?.parentElement?.className;
  return className || null;
}
