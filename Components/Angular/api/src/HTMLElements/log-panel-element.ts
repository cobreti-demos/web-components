import {LogPanelApi} from "../log-panel-api.ts";

export interface LogPanelElement extends HTMLElement {
    webComponentApi: LogPanelApi;
}
