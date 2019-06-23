import { Component, OnInit } from '@angular/core';
import { SpecItem } from 'src/app/shared/models/Inventory/spec.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/Inventory/product.service';
import { SystemMessages } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsParams } from 'src/app/shared/services/global.service';

@Component({
  selector: 'app-specitems',
  templateUrl: './specitems.component.html',
  styleUrls: ['./specitems.component.sass'],
  providers:[ProductService]
})
export class SpecitemsComponent implements OnInit {
  _AllSpecs: SpecItem[]


  //For Brand data table
  selectedSpec: Number;
  pageSpec = 1;
  pageSizeSpec = 5;
  collectionSizeSpec = 0;
  SelectedRowSpecIndex: any;
  SelectedRowSpec: any;

  angForm: FormGroup;


 
  constructor(
    private productservice: ProductService,
    private messages: SystemMessages,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private globalval: GlobalsParams
  ) {
    this._AllSpecs = [];
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      Spec_name: ['', Validators.required],
      Spec_displayname: ['', Validators.required],
      Spec_datatype: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.GetAllSpecItems();

  }

  table1clickhandler(incomingBrand: any): void {
    this.angForm.patchValue({
      Spec_name: incomingBrand["SpecItemName"],
      Spec_displayname: incomingBrand["SpecItemDisplayName"],
      Spec_datatype: incomingBrand["DataType"],
    });
  }


  setClickedRowSpecItem(index, obj) {
    this.SelectedRowSpecIndex = index;
    this.SelectedRowSpec = obj;
    this.table1clickhandler(obj);
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

  btn_SpecItems_save_click(){

  }

  btn_SpecItems_update_click(){
    
  }

  btn_SpecItems_delete_click(){
    
  }

  AddSpecItems(action: number) {
    // console.log("this.angForm.controls[brand_name].value", this.angForm.controls["brand_name"].value)
    // console.log("this.SelectedRowBrand", this.SelectedRowBrand)

    // Spec_name: incomingBrand["SpecItemName"],
    // Spec_displayname: incomingBrand["SpecItemDisplayName"],
    // Spec_datatype: incomingBrand["DataType"],

    if (this.angForm.controls["Spec_name"].value === "") {
      this.toastr.error("Spec Name cannot be empty!", this.messages.MessageCaption);
      return;
    }
    if (this.angForm.controls["Spec_displayname"].value === "") {
      this.toastr.error("Spec Displayname cannot be empty!", this.messages.MessageCaption);
      return;
    }
    if (this.angForm.controls["Spec_datatype"].value === "") {
      this.toastr.error("Please select a data type from the list!", this.messages.MessageCaption);
      return;
    }

    var obj: SpecItem = new SpecItem();
    if (action == 2) {
      if (this.SelectedRowSpec === undefined) {
        this.toastr.error("Please select a record from brands table to update!", this.messages.MessageCaption);
        return;
      } else {
        obj.Id = this.SelectedRowSpec["Id"];
      }
    } else {
      obj.Id = 1;
    }
    obj.SpecItemName = this.angForm.controls["Spec_name"].value;
    obj.SpecItemDisplayName = this.angForm.controls["Spec_displayname"].value;
    obj.DataType = this.angForm.controls["Spec_datatype"].value;
    obj.CreatedBy = this.globalval.LoggedInUserId;
    obj.ModifiedBy = this.globalval.LoggedInUserId;
    obj.CreatedWhen = new Date();
    obj.ModifiedWhen = new Date();
    this.productservice.SaveSpecItems(obj, action).subscribe(
      data => {
        this.toastr.success("Brand saved succesfully", this.messages.MessageCaption);
        this._AllSpecs = [];
        this.GetAllSpecItems();
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

}
