export namespace main {
	
	export class DesktopApp {
	    Id: number;
	    Name: string;
	    Icon: string;
	    Exec: string;
	    Terminal: string;
	
	    static createFrom(source: any = {}) {
	        return new DesktopApp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.Icon = source["Icon"];
	        this.Exec = source["Exec"];
	        this.Terminal = source["Terminal"];
	    }
	}

}

