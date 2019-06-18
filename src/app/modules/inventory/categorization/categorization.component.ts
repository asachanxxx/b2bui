import { Component, OnInit, OnDestroy, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/shared/services/Inventory/product.service';
import { SpecMaster } from 'src/app/shared/models/Inventory/spec.model';
import { SystemMessages } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GlobalsParams } from 'src/app/shared/services/global.service';
import { Level1, Level2, Level3 } from 'src/app/shared/models/Inventory/categories.model';


@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['./categorization.component.sass'],
  providers: [ProductService]
})
export class CategorizationComponent implements OnInit {
  _AllLevel1: Level1[]
  _AllLevel2: Level2[]
  _AllLevel3: Level3[]

  angForm: FormGroup;
  angForm1: FormGroup;
  angForm2: FormGroup;

  //For level1 data table
  selectedRowLevel1: Level1;
  pageLevel1 = 1;
  pageSizeLevel1 = this.globalval.PageInitialSize;
  collectionSizeLevel1 = 0;
  SelectedRowLevel1Index: any;
  SelectedRowLevel1: any;

  //For level2 data table
  selectedRowLevel2: Level2;
  pageLevel2 = 1;
  pageSizeLevel2 = this.globalval.PageInitialSize;
  collectionSizeLevel2 = 0;
  SelectedRowLevel2Index: any;
  SelectedRowLevel2: any;

  //For level3 data table
  selectedRowLevel3: Level3;
  pageLevel3 = 1;
  pageSizeLevel3 = this.globalval.PageInitialSize;
  collectionSizeLevel3 = 0;
  SelectedRowLevel3Index: any;
  SelectedRowLevel3: any;


  constructor(
    private productservice: ProductService,
    private messages: SystemMessages,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private globalval: GlobalsParams
  ) {

    this._AllLevel1 = []
    this._AllLevel2 = []
    this._AllLevel3 = []

    this.createFormLevel1();
    this.createFormLevel2();
    this.createFormLevel3();
  }

  ngOnInit() {
    this.GetAllLevel1();
  }

  table1clickhandler(incomingobj: any): void {
    this.angForm.patchValue({
      category_name: incomingobj["Level1Name"],
    });
  }

  table1clickhandler2(incomingobj: any): void {
    this.angForm1.patchValue({
      subcategory_name: incomingobj["Level2Name"],
    });
  }

  table1clickhandler3(incomingobj: any): void {
    this.angForm2.patchValue({
      subcategory2_name: incomingobj["Level3Name"],
    });
  }

  //#region  Create Forms Section **********************************************************************************************************

  createFormLevel1() {
    this.angForm = this.fb.group({
      category_name: ['', Validators.required],
    });
  }
  createFormLevel2() {
    this.angForm1 = this.fb1.group({
      subcategory_name: ['', Validators.required],
      specID: ['', Validators.required],
      
    });
  }

  createFormLevel3() {
    this.angForm2 = this.fb2.group({
      subcategory2_name: ['', Validators.required],
    });
  }

  //#endregion

  //#region Data Loading Methods *****************************************************************************************************************

  Level1Mapped(): Level1[] {
    if (this._AllLevel1 !== undefined) {
      return this._AllLevel1.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageLevel1 - 1) * this.pageSizeLevel1, (this.pageLevel1 - 1) * this.pageSizeLevel1 + this.pageSizeLevel1);
    }
  }

  Level2Mapped(): Level2[] {
    if (this._AllLevel2 !== undefined) {
      return this._AllLevel2.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageLevel2 - 1) * this.pageSizeLevel2, (this.pageLevel2 - 1) * this.pageSizeLevel2 + this.pageSizeLevel2);
    }
  }
  Level3Mapped(): Level3[] {
    if (this._AllLevel3 !== undefined) {
      return this._AllLevel3.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageLevel3 - 1) * this.pageSizeLevel3, (this.pageLevel3 - 1) * this.pageSizeLevel3 + this.pageSizeLevel3);
    }
  }


  GetAllLevel1() {
    this.productservice.GetAllLevel1().subscribe(
      data => {
        this.collectionSizeLevel1 = data.length;
        this._AllLevel1 = data;

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

  GetAllLevel2(level1Id: number) {
    this.productservice.GetAllLevel2(level1Id).subscribe(
      data => {
        this.collectionSizeLevel2 = data.length;
        this._AllLevel2 = data;

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

  GetAllLevel3(level1Id: number,level2Id: number) {
    this.productservice.GetAllLevel3(level1Id,level2Id).subscribe(
      data => {
        this.collectionSizeLevel3 = data.length;
        this._AllLevel3 = data;

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

  //#region  Click events of all types ***********************************************************************************************************

  setClickedRowLevel1(index, obj) {
    this.SelectedRowLevel1Index = index;
    this.selectedRowLevel1 = obj;
    this.table1clickhandler(obj);
    console.log("setClickedRowLevel1", obj);
    this.GetAllLevel2(obj.Id)
  }

  setClickedRowLevel2(index, obj) {
    this.SelectedRowLevel2Index = index;
    this.selectedRowLevel2 = obj;
    this.table1clickhandler2(obj);
    console.log("setClickedRowLevel2", obj);
    this.GetAllLevel3(this.selectedRowLevel1.Id, obj.Id)
  }

  setClickedRowLevel3(index, obj) {
    this.SelectedRowLevel3Index = index;
    this.selectedRowLevel3 = obj;
    this.table1clickhandler3(obj);
    console.log("setClickedRowLevel2", obj);
    //this.GetAllLevel2(obj.Id)
  }


  btn_save_cat_click() {

  }

  btn_update_cat_click() {

  }

  btn_Delete_cat_click() {

  }

  //#endregion


}
