import { Injectable } from '@angular/core';

@Injectable()
export class SystemMessages {

    
    private _MessageCaption : string = "B2B Business Partner"
    public get MessageCaption() : string {
        return this._MessageCaption;
    }
    public set MessageCaption(v : string) {
        this._MessageCaption = v;
    }
    


    private _DataserviceNotAvaibale: string = "Back end data service not availavle right now. Pleas Try again.";
    public get DataserviceNotAvaibale(): string {
        return this._DataserviceNotAvaibale;
    }
    public set DataserviceNotAvaibale(v: string) {
        this._DataserviceNotAvaibale = v;
    }

    
    private _GenaralError : string = "Genarally unknown error has occured! Please contact tec support for more information.";
    public get GenaralError() : string {
        return this._GenaralError;
    }
    public set GenaralError(v : string) {
        this._GenaralError = v;
    }
    

}