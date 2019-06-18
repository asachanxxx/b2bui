import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SpecMaster, SpecItem, SpecDetail } from '../../models/Inventory/spec.model';
import { HttpClient } from '@angular/common/http';
import { GlobalsParams } from '../global.service';
import { Brand, Model, Series } from '../../models/Inventory/branModelSeries.model';
import { Level1, Level2, Level3 } from '../../models/Inventory/categories.model';
import { CateglogProducts } from '../../models/Inventory/catelog.model';



@Injectable()
export class ProductService {

    constructor(
        private http: HttpClient,
        private globals: GlobalsParams
    ) { }



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
        return this.http.post<number>(this.globals.PrimaryAPI + '/brandandmodels/SaveBrand' + '?action=' + action, obj)
    }

    SaveModel(obj: Model, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/brandandmodels/SaveModel' + '?action=' + action, obj)
    }
    SaveSeries(obj: Series, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/brandandmodels/SaveSeries' + '?action=' + action, obj)
    }




    GetAllLevel1(): Observable<Level1[]> {
        return this.http.get<Level1[]>(this.globals.PrimaryAPI + '/Category/GetAllCategories');
    }


    GetAllLevel2(id: number): Observable<Level2[]> {
        return this.http.get<Level2[]>(this.globals.PrimaryAPI + '/Category/GetAllSubCategories' + '?CatId=' + id);
    }

    GetAllLevel3(level2id: number, level3id: number): Observable<Level3[]> {
        return this.http.get<Level3[]>(this.globals.PrimaryAPI + '/Category/GetAllSubCategor2s' + '?CatId=' + level2id + '&SubCatId=' + level3id);
    }



    GetAllSpecItems(): Observable<SpecItem[]> {
        return this.http.get<SpecItem[]>(this.globals.PrimaryAPI + '/Spec/GetAllSpecItems');
    }

    SaveSpecItems(obj: SpecItem, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/Spec/SaveSpecItemSingle' + '?action=' + action, obj)
    }

    getSpecMasters(): Observable<Array<SpecMaster>> {
        return this.http.get<Array<SpecMaster>>(this.globals.PrimaryAPI + '/Spec/GetAllSpecMaster');
    }

    saveSpecMaster(obj: SpecMaster, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/Spec/SaveSpecMaster' + '?type=' + action, obj)
    }

    getSpecDet(id:number): Observable<Array<SpecDetail>> {
        return this.http.get<Array<SpecDetail>>(this.globals.PrimaryAPI + '/Spec/GetAllSpecDetailsForMAster'+ '?CatId=' + id);
    }



    GetCateglogProducts(): Observable<CateglogProducts[]> {
        return this.http.get<CateglogProducts[]>(this.globals.PrimaryAPI + '/Product/GetAllCatelogItems');
    }

    saveCatelogOriducts(obj: CateglogProducts, action: number): Observable<number> {
        return this.http.post<number>(this.globals.PrimaryAPI + '/Product/SaveCatelog' + '?action=' + action, obj)
    }


    
}
