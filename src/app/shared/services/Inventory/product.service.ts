import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpecMaster } from '../../models/Inventory/spec.model';
import { HttpClient } from '@angular/common/http';
import { GlobalsParams } from '../global.service';
import { Brand, Model, Series } from '../../models/Inventory/branModelSeries.model';



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



    GetAllBrands(): Observable<Brand[]> {
        return this.http.get<Brand[]>(this.globals.PrimaryAPI + '/BrandAndModels/GetAllBrands');
    }

    
    GetAllModel(): Observable<Model[]> {
        return this.http.get<Model[]>(this.globals.PrimaryAPI + '/BrandAndModels/GetAllModels');
    }

    GetAllSeries(): Observable<Series[]> {
        return this.http.get<Series[]>(this.globals.PrimaryAPI + '/BrandAndModels/GetAllSeries');
    }

    SaveBrand(obj: Brand, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/brandandmodels/SaveBrand' + '?action=' + action , obj)
    }
    
    SaveModel(obj: Model, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/brandandmodels/SaveModel' + '?action=' + action , obj)
    }
    SaveSeries(obj: Series, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/brandandmodels/SaveSeries' + '?action=' + action , obj)
    }


}
