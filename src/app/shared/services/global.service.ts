import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsParams {

    private _LoggedInUserObject: string;
    public get LoggedInUserObject(): string {
        return this._LoggedInUserObject;
    }
    public set LoggedInUserObject(v: string) {
        this._LoggedInUserObject = v;
    }


    private _LoggedInUserId: string = "06c59cba-db70-4e69-90f8-57fbe8a50e73";
    public get LoggedInUserId(): string {
        return this._LoggedInUserId;
    }
    public set LoggedInUserId(v: string) {
        this._LoggedInUserId = v;
    }


    private _PrimaryAPI: string = "http://localhost:50965/";
    public get PrimaryAPI(): string {
        return this._PrimaryAPI;
    }
    public set PrimaryAPI(v: string) {
        this._PrimaryAPI = v;
    }


    private _ImageAPI: string;
    public get ImageAPI(): string {
        return this._ImageAPI;
    }
    public set ImageAPI(v: string) {
        this._ImageAPI = v;
    }

    
    private _PageInitialSize : number = 5;
    public get PageInitialSize() : number {
        return this._PageInitialSize;
    }
    public set PageInitialSize(v : number) {
        this._PageInitialSize = v;
    }
    

}