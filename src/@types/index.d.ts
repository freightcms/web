export declare global {
    interface Window {
      auth0Config: {
        domain: string;
        clientID: string;
      };
      appConfig: {
        name: string;
        logo: string;
        apiURL: string;
      };
    }
  }