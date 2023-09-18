import { IApplication } from "./application";

declare global {
    interface Window {
      application: IApplication
    }
  }
  