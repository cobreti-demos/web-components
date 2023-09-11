import { WebComponentDetails } from "../web-components";
import { IApplication } from "./application";

declare global {
    interface Window {
      webComponents: Map<string, WebComponentDetails>,
      application: IApplication
    }
  }
  