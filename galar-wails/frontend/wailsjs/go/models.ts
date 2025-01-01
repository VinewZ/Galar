export namespace main {
	
	export class DesktopApp {
	    Name: string;
	    Icon: string;
	    Exec: string;
	    Terminal: string;
	
	    static createFrom(source: any = {}) {
	        return new DesktopApp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Icon = source["Icon"];
	        this.Exec = source["Exec"];
	        this.Terminal = source["Terminal"];
	    }
	}

}

