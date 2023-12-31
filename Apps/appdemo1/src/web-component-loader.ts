interface WebComponentsEntry {
    name: string;
    url: string;
}

export class WebComponentLoader {

    private _url: string;

    constructor(url: string) {
        this._url = url.replace('{mode}', import.meta.env.MODE);
        console.log(`loading web-components from ${this._url}`);
    }

    async loadWebComponents() {
        try {
            console.log('loading web component');
            const response = await fetch(this._url);

            if (!response.ok) {
                throw new Error(`unable to load web components json : ${this._url}`);
            }

            const text  = await response.text();
            const content = JSON.parse(text) as [WebComponentsEntry];

            content.forEach(entry => {
                this.addWebComponent(entry);
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    addWebComponent(entry: WebComponentsEntry) {
        try {
            const existingElm = document.getElementById(entry.name);

            if (!existingElm) {
                console.log(`loading web-component '${entry.name}' --> ${entry.url}`);
                const scriptElem = document.createElement('script');
                scriptElem.type = 'module';
                scriptElem.id = entry.name;
                scriptElem.src = entry.url;
                document.head.append(scriptElem);
            }
            else {
                console.log(`web-component '${entry.name}' already loaded`);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}
