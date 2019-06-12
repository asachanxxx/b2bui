import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpecMaster } from '../../models/Inventory/spec.model';
import { HttpClient } from '@angular/common/http';
import { GlobalsParams } from '../global.service';


@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient,
        private globals: GlobalsParams
    ) { }



    getSpecMasters(): Observable<SpecMaster> {
        return this.http.get<SpecMaster>(this.globals.PrimaryAPI + '/Product/GetSpecMaster');
    }

    saveSpecMaster(obj: SpecMaster, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/Product/AddSpecMaster' + '?type=' + action , obj)
    }

}
