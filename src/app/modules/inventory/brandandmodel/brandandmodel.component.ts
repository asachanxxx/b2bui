import { Component, OnInit, OnDestroy, ViewChild, Renderer, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/shared/services/Inventory/product.service';
import { SystemMessages } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalsParams } from 'src/app/shared/services/global.service';
import { Brand, Model, Series } from 'src/app/shared/models/Inventory/branModelSeries.model';




@Component({
  selector: 'app-brandandmodel',
  templateUrl: './brandandmodel.component.html',
  styleUrls: ['./brandandmodel.component.sass'],
  providers: [ProductService]
})
export class BrandandmodelComponent implements OnInit {
  numbers: any;
  _AllBrands: Brand[]
  _AllModels: Model[]
  _AllSeries: Series[]

  //For Brand data table
  selectedRowBrand: Number;
  pageBrand = 1;
  pageSizeBrand = 5;
  collectionSizeBRand = 0;
  SelectedRowBrandIndex: any;
  SelectedRowBrand: any;

  //For Model data table
  selectedRowModel: Number;
  pageModel = 1;
  pageSizeModel = 5;
  collectionSizeModel = 0;
  SelectedRowModelIndex: any;
  SelectedRowModel: any;

  //For Series data table
  selectedRowSeries: Number;
  pageSeries = 1;
  pageSizeSeries = 5;
  collectionSizeSeries = 0;
  SelectedRowSeriesIndex: any;
  SelectedRowSeries: any;


  angForm: FormGroup;
  angFormModel: FormGroup;
  angFormSeries: FormGroup;




  constructor(
    private productservice: ProductService,
    private messages: SystemMessages,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private fbModel: FormBuilder,
    private fbSeries: FormBuilder,
    private globalval: GlobalsParams
  ) {
    this._AllBrands = [];
    this.createForm();
    this.createForm1();
    this.createForm2();
  }


  createForm() {
    this.angForm = this.fb.group({
      brand_name: ['', Validators.required],
    });
  }
  createForm1() {
    this.angFormModel = this.fbModel.group({
      model_name: ['', Validators.required],
    });
  }
  createForm2() {
    this.angFormSeries = this.fbSeries.group({
      series_name: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.GetAllBrands();
    this.GetAllModels();
    this.GetAllSeries();
  }

  table1clickhandler(incomingBrand: any): void {
    this.angForm.patchValue({
      brand_name: incomingBrand["Name"],
    });
  }

  table1clickhandlerModel(incomingModel: any): void {
    console.log("incomingBrand", incomingModel)
    this.angFormModel.patchValue({
      model_name: incomingModel["Name"],
    });
  }

  table1clickhandlerSeries(incomingSeries: any): void {
    console.log("incomingSeries", incomingSeries)
    this.angFormSeries.patchValue({
      series_name: incomingSeries["Name"],
    });
  }


  //#region Btton Clickes *************************************************************************************************************************

  btn_brand_save_click() {
    this.AddBrand(1);
  }

  btn_brand_update_click() {
    this.AddBrand(2);
  }

  btn_brand_delete_click() {

  }

  btn_model_excel_click() {

  }

  btn_model_save_click() {
    this.AddModel(1);
  }

  btn_model_update_click() {
    this.AddModel(2);
  }
  btn_model_delete_click() {

  }

  btn_Series_excel_click(){

  }
  btn_Seriessave_click(){
    this.AddSeries(1);
  }
  btn_Seriesupdate_click(){
    this.AddSeries(2);
  }
  btn_Seriesdelete_click(){
    
  }


  setClickedRowBrand(index, obj) {
    this.SelectedRowBrandIndex = index;
    this.SelectedRowBrand = obj;
    this.table1clickhandler(obj);
  }


  setClickedRowModel(index, obj) {
    this.SelectedRowModelIndex = index;
    this.SelectedRowModel = obj;
    this.table1clickhandlerModel(obj);
  }

  setClickedRowSeries(index, obj) {
    this.SelectedRowSeriesIndex = index;
    this.SelectedRowSeries = obj;
    this.table1clickhandlerSeries(obj);
  }

  //#endregion

  //#region  Get All methods and  BrandsMapped section ********************************************************************************
  BrandsMapped(): Brand[] {
    if (this._AllBrands !== undefined) {
      return this._AllBrands.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageBrand - 1) * this.pageSizeBrand, (this.pageBrand - 1) * this.pageSizeBrand + this.pageSizeBrand);
    }
  }

  ModelMapped(): Model[] {
    if (this._AllModels !== undefined) {
    return this._AllModels.
      map((objmapped, i) => ({ id: i + 1, ...objmapped }))
      .slice((this.pageModel - 1) * this.pageSizeModel, (this.pageModel - 1) * this.pageSizeModel + this.pageSizeModel);
    }
  }
  SeriesMapped(): Model[] {
    if (this._AllSeries !== undefined) {
    return this._AllSeries.
      map((objmapped, i) => ({ id: i + 1, ...objmapped }))
      .slice((this.pageSeries - 1) * this.pageSizeSeries, (this.pageSeries - 1) * this.pageSizeSeries + this.pageSizeSeries);
    }
  }


  GetAllBrands() {
    this.productservice.GetAllBrands().subscribe(
      data => {
        this.collectionSizeBRand = data.length;
        this._AllBrands = data;

      },
      error => {
        if (error.status == 0) {
          this.toastr.error(this.messages.DataserviceNotAvaibale, this.messages.MessageCaption);
        } else {
          this.toastr.error(this.messages.GenaralError, this.messages.MessageCaption);
        }
      }

    )
  }

  GetAllModels() {
    this.productservice.GetAllModel().subscribe(
      data => {
        this.collectionSizeModel = data.length;
        this._AllModels = data;

      },
      error => {
        if (error.status == 0) {
          this.toastr.error(this.messages.DataserviceNotAvaibale, this.messages.MessageCaption);
        } else {
          this.toastr.error(this.messages.GenaralError, this.messages.MessageCaption);
        }
      }

    )
  }

  GetAllSeries() {
    this.productservice.GetAllSeries().subscribe(
      data => {
        this.collectionSizeSeries = data.length;
        this._AllSeries = data;

      },
      error => {
        if (error.status == 0) {
          this.toastr.error(this.messages.DataserviceNotAvaibale, this.messages.MessageCaption);
        } else {
          this.toastr.error(this.messages.GenaralError, this.messages.MessageCaption);
        }
      }

    )
  }


  //#endregion

  //#region  Data Saving Section

  AddBrand(action: number) {
    // console.log("this.angForm.controls[brand_name].value", this.angForm.controls["brand_name"].value)
    // console.log("this.SelectedRowBrand", this.SelectedRowBrand)
    if (this.angForm.controls["brand_name"].value === "") {
      this.toastr.error("Brand Name cannot be empty!", this.messages.MessageCaption);
      return;
    }

    var obj: Brand = new Brand();
    if (action == 2) {
      if (this.SelectedRowBrand === undefined) {
        this.toastr.error("Please select a record from brands table to update!", this.messages.MessageCaption);
        return;
      } else {
        obj.Id = this.SelectedRowBrand["Id"];
      }
    } else {
      obj.Id = 1;
    }
    obj.Name = this.angForm.controls["brand_name"].value;
    obj.CreatedBy = this.globalval.LoggedInUserId;
    obj.ModifiedBy = this.globalval.LoggedInUserId;
    obj.CreatedWhen = new Date();
    obj.ModifiedWhen = new Date();
    this.productservice.SaveBrand(obj, action).subscribe(
      data => {
        this.toastr.success("Brand saved succesfully", this.messages.MessageCaption);
        this._AllBrands = [];
        this.GetAllBrands();
      },
      error => {
        if (error.status == 500) {
          this.toastr.error(error.error.ExceptionMessage, this.messages.MessageCaption);
        } else if (error.status == 0) {
          this.toastr.error(this.messages.DataserviceNotAvaibale, this.messages.MessageCaption);
        } else {
          this.toastr.error(this.messages.GenaralError, this.messages.MessageCaption);
        }
      }
    )

  }

  AddModel(action: number) {
    console.log("this.angFormModel.controls[model_name].value", this.angFormModel.controls["model_name"].value)
    console.log("this.SelectedRowModel", this.SelectedRowModel)
    if (this.angFormModel.controls["model_name"].value === "") {
      this.toastr.error("Brand Name cannot be empty!", this.messages.MessageCaption);
      return;
    }

    var obj: Model = new Model();
    if (action == 2) {
      if (this.SelectedRowModel === undefined) {
        this.toastr.error("Please select a record from brands table to update!", this.messages.MessageCaption);
        return;
      } else {
        obj.Id = this.SelectedRowModel["Id"];
      }
    } else {
      obj.Id = 1;
    }
    obj.Name = this.angFormModel.controls["model_name"].value;
    obj.CreatedBy = this.globalval.LoggedInUserId;
    obj.ModifiedBy = this.globalval.LoggedInUserId;
    obj.CreatedWhen = new Date();
    obj.ModifiedWhen = new Date();
    this.productservice.SaveModel(obj, action).subscribe(
      data => {
        this.toastr.success("Model saved succesfully", this.messages.MessageCaption);
        this.GetAllModels();
      },
      error => {
        if (error.status == 500) {
          this.toastr.error(error.error.ExceptionMessage, this.messages.MessageCaption);
        } else if (error.status == 0) {
          this.toastr.error(this.messages.DataserviceNotAvaibale, this.messages.MessageCaption);
        } else {
          this.toastr.error(this.messages.GenaralError, this.messages.MessageCaption);
        }
      }
    )

  }


  AddSeries(action: number) {
    console.log("this.angFormModel.controls[model_name].value", this.angFormSeries.controls["series_name"].value)
    console.log("this.SelectedRowModel", this.SelectedRowSeries)
    if (this.angFormSeries.controls["series_name"].value === "") {
      this.toastr.error("Series Name cannot be empty!", this.messages.MessageCaption);
      return;
    }

    var obj: Series = new Series();
    if (action == 2) {
      if (this.SelectedRowSeries === undefined) {
        this.toastr.error("Please select a record from Series table to update!", this.messages.MessageCaption);
        return;
      } else {
        obj.Id = this.SelectedRowSeries["Id"];
      }
    } else {
      obj.Id = 1;
    }
    obj.Name = this.angFormSeries.controls["series_name"].value;
    obj.CreatedBy = this.globalval.LoggedInUserId;
    obj.ModifiedBy = this.globalval.LoggedInUserId;
    obj.CreatedWhen = new Date();
    obj.ModifiedWhen = new Date();
    this.productservice.SaveSeries(obj, action).subscribe(
      data => {
        this.toastr.success("Series saved succesfully", this.messages.MessageCaption);
        this.GetAllSeries();
      },
      error => {
        if (error.status == 500) {
          this.toastr.error(error.error.ExceptionMessage, this.messages.MessageCaption);
        } else if (error.status == 0) {
          this.toastr.error(this.messages.DataserviceNotAvaibale, this.messages.MessageCaption);
        } else {
          this.toastr.error(this.messages.GenaralError, this.messages.MessageCaption);
        }
      }
    )

  }

  //#endregion

}
