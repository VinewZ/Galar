export namespace app {
	
	export class DesktopApp {
	    Id: number;
	    Name: string;
	    GenericName: string;
	    Comment: string;
	    Icon: string;
	    Exec: string;
	    Terminal: string;
	    Keywords: string[];
	
	    static createFrom(source: any = {}) {
	        return new DesktopApp(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Id = source["Id"];
	        this.Name = source["Name"];
	        this.GenericName = source["GenericName"];
	        this.Comment = source["Comment"];
	        this.Icon = source["Icon"];
	        this.Exec = source["Exec"];
	        this.Terminal = source["Terminal"];
	        this.Keywords = source["Keywords"];
	    }
	}
	export class Plugin {
	    dir: string;
	    ID: number;
	    name: string;
	    entry: string;
	    style: string;
	    // Go type: struct { Name string "json:\"name\""; Cmd string "json:\"cmd\"" }
	    command: any;
	
	    static createFrom(source: any = {}) {
	        return new Plugin(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.dir = source["dir"];
	        this.ID = source["ID"];
	        this.name = source["name"];
	        this.entry = source["entry"];
	        this.style = source["style"];
	        this.command = this.convertValues(source["command"], Object);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

