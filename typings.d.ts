declare namespace NodeJS {
  interface Global {
    fetch: any,
  }

  interface Process {
    browser: boolean,
  }
}

interface Prompt {
  id: number,
  title: string,
}