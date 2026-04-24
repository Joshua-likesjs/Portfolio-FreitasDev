declare module '@emailjs/browser' {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export interface EmailJSParams {
    [key: string]: string | number | boolean;
  }

  export function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement | string,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;

  export function send(
    serviceID: string,
    templateID: string,
    templateParams: EmailJSParams,
    publicKey?: string
  ): Promise<EmailJSResponseStatus>;

  export function init(publicKey: string): void;

  const emailjs: {
    sendForm: typeof sendForm;
    send: typeof send;
    init: typeof init;
  };

  export default emailjs;
}

declare global {
  interface Window {
    emailjs: typeof import('@emailjs/browser').default;
  }
}

export {};