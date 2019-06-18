import { Component, OnInit, OnDestroy, ViewChild, Renderer, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from 'src/app/shared/services/Inventory/product.service';
import { SpecMaster, SpecItem, SpecDetail } from 'src/app/shared/models/Inventory/spec.model';
import { SystemMessages } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GlobalsParams } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.sass'],
  providers: [ProductService]
})
export class SpecificationsComponent implements OnInit {
  _AllSpecMaster: SpecMaster[]
  _AllSpecs: SpecItem[]
  _AllDet: SpecDetail[]

  //For Brand data table
  selectedSpec: Number;
  pageSpec = 1;
  pageSizeSpec = 5;
  collectionSizeSpec = 0;
  SelectedRowSpecIndex: any;
  SelectedRowSpec: any;

  //For Brand data table
  selectedRowSpecMaster: Number;
  pageSpecMaster = 1;
  pageSizeSpecMaster = 5;
  collectionSizeSpecMaster = 0;
  SelectedRowSpecMasterIndex: any;
  SelectedRowSpecMaster: any;

  //For Brand data table
  selectedSpecdet: Number;
  pageSpecdet = 1;
  pageSizeSpecdet = 5;
  collectionSizeSpecdet = 0;
  SelectedRowSpecdetIndex: any;
  SelectedRowSpecdet: any;


  angForm: FormGroup;
  angForm1: FormGroup;


  constructor(
    private productservice: ProductService,
    private messages: SystemMessages,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private globalval: GlobalsParams
  ) {
    this._AllSpecMaster = [];
    this.createForm();
    this.createForm1();
  }


  createForm() {
    this.angForm = this.fb.group({
      spec_name: ['', Validators.required],
    });
  }
  createForm1() {
    this.angForm1 = this.fb1.group({
      spec2_name: ['', Validators.required],
      dattype: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.GetAllspecMaster();
    this.GetAllSpecItems();
  }

  table1clickhandler(info: any): void {
    this.angForm.patchValue({
      spec_name: info[1],
    });
    console.log("info", info)
  }


  

  setClickedRowSpecMaster(index, obj) {
    this.SelectedRowSpecMasterIndex = index;
    this.SelectedRowSpecMaster = obj;
    this.table1clickhandler(obj);
  }

  setClickedRowSpecItem(index, obj) {
    this.SelectedRowSpecIndex = index;
    this.SelectedRowSpec = obj;
    this.table1clickhandlerSpecItem(obj);
  }
  setClickedRowSpecdet(index, obj) {
    this.SelectedRowSpecMasterIndex = index;
    this.SelectedRowSpecMaster = obj;
    this.table1clickhandler(obj);
  }



  table1clickhandlerSpecItem(incomingBrand: any): void {
    this.angForm.patchValue({
      Spec_name: incomingBrand["SpecItemName"],
      Spec_displayname: incomingBrand["SpecItemDisplayName"],
      Spec_datatype: incomingBrand["DataType"],
    });
  }


  BrandsSM(): SpecMaster[] {
    if (this._AllSpecMaster !== undefined) {
      return this._AllSpecMaster.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageSpecMaster - 1) * this.pageSizeSpecMaster, (this.pageSpecMaster - 1) * this.pageSizeSpecMaster + this.pageSizeSpecMaster);
    }
  }

  SpecDetMapped(): SpecDetail[] {
    if (this._AllDet !== undefined) {
      return this._AllDet.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageSpecdet - 1) * this.pageSizeSpecdet, (this.pageSpecdet - 1) * this.pageSizeSpecdet + this.pageSizeSpecdet);
    }
  }

  SpecItemMapped(): SpecItem[] {
    if (this._AllSpecs !== undefined) {
      return this._AllSpecs.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageSpec - 1) * this.pageSizeSpec, (this.pageSpec - 1) * this.pageSizeSpec + this.pageSizeSpec);
    }
  }



  GetAllSpecItems() {
    this.productservice.GetAllSpecItems().subscribe(
      data => {
        this.collectionSizeSpec = data.length;
        this._AllSpecs = data;

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


  GetAllspecMaster() {
    this.productservice.getSpecMasters().subscribe(
      data => {
        this.collectionSizeSpecMaster = data.length;
        this._AllSpecMaster = data;
        console.log(this._AllSpecMaster);
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

  GetAllspecDet(masterID:number) {
    this.productservice.getSpecDet(masterID).subscribe(
      data => {
        this.collectionSizeSpecdet = data.length;
        this._AllDet = data;
        console.log(this._AllDet);
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




  btn_Add_specItemToList(obj: SpecItem) {
    console.log("btn_Add_specItemToList", obj)
  }

  btn_Remove_specItem(obj){
    console.log("btn_Remove_specItem", obj)
  }





















  Addspecmaster() {
    console.log("this.angForm.controls[spec_name]", this.angForm.controls["spec_name"].value)
    var obj: SpecMaster = new SpecMaster();
    obj.Id = 1;
    obj.SpecName = this.angForm.controls["spec_name"].value;
    obj.CreatedBy = this.globalval.LoggedInUserId;
    obj.ModifiedBy = this.globalval.LoggedInUserId;
    obj.CreatedWhen = new Date();
    obj.ModifiedWhen = new Date();
    this.productservice.saveSpecMaster(obj, 1).subscribe(
      data => {
        this.toastr.success("Specification master saved succesfully", this.messages.MessageCaption);
        this.GetAllspecMaster();
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





}
