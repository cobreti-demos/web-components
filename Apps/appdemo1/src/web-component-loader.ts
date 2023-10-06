interface WebComponentsEntry {
    url: string;
}

export class WebComponentLoader {
    constructor(private _url: string) {

    }

    async loadWebComponents() {
        try {
            const response = await fetch(this._url);

            if (!response.ok) {
                throw new Error(`unable to load web components json : ${this._url}`);
            }

            const text  = await response.text();
            const content = JSON.parse(text) as [WebComponentsEntry];

            content.forEach(entry => {
                this.addWebComponent(entry.url);
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    addWebComponent(url: string) {
        try {
            const scriptElem = document.createElement('script');
            scriptElem.type = 'module';
            scriptElem.src = url;
            document.head.append(scriptElem);
        }
        catch (error) {
            console.error(error);
        }
    }
}
