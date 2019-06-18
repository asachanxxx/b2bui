import { Component, OnInit, Renderer, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/Inventory/product.service';
import { SystemMessages } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsParams } from 'src/app/shared/services/global.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Brand, Series, Model } from 'src/app/shared/models/Inventory/branModelSeries.model';
import { Level1 } from 'src/app/shared/models/Inventory/categories.model';
import { CateglogProducts } from 'src/app/shared/models/Inventory/catelog.model';


@Component({
  selector: 'app-additemstocatelog',
  templateUrl: './additemstocatelog.component.html',
  styleUrls: ['./additemstocatelog.component.sass'],
  providers: [ProductService]
})
export class AdditemstocatelogComponent implements OnInit {

  bindingBrands: Brand[];
  bindingSeries: Series[];
  bindingModels: Model[];
  bindingCategories: Level1[];
  AllCateglogProducts:CateglogProducts[]

  angForm: FormGroup;

  //For Brand data table
  selectedItem: Number;
  pageItem = 1;
  pageSizeItem = 5;
  collectionSizeItem = 0;
  SelectedRowItemIndex: any;
  SelectedRowItem: any;


  constructor(
    private productservice: ProductService,
    private messages: SystemMessages,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private globalval: GlobalsParams
  ) {
    this.createForm();

    this.bindingBrands = [];
    this.bindingSeries = [];
    this.bindingModels = [];
    this.bindingCategories = [];

    this.bindingBrands.push({ Id: 1, Name: "Dell", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingBrands.push({ Id: 2, Name: "HP", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingBrands.push({ Id: 3, Name: "IBM", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })

    this.bindingSeries.push({ Id: 1, Name: "LX928", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingSeries.push({ Id: 2, Name: "BG78542", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingSeries.push({ Id: 3, Name: "JK9838", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })

    this.bindingModels.push({ Id: 1, Name: "Optiplex", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingModels.push({ Id: 2, Name: "DUO209", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingModels.push({ Id: 3, Name: "SRP-9928", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })


    this.bindingCategories.push({ Id: 1, Level1Name: "PC Components", Code: "", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingCategories.push({ Id: 1, Level1Name: "PC Preparals", Code: "", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })
    this.bindingCategories.push({ Id: 1, Level1Name: "Printers", Code: "", CreatedBy: "", CreatedWhen: new Date, IsApproved: false, ModifiedBy: "", ModifiedWhen: new Date })

  }

  createForm() {
    this.angForm = this.fb.group({
      BrandId: [null],
      SeriesId: [null],
      ModelId: [null],
      ProductName: ['', Validators.required],
      CategoryId: [null],
    });

    console.log("this.angForm ", this.angForm)
  }




  SpecItemMapped(): CateglogProducts[] {
    if (this.AllCateglogProducts !== undefined) {
      return this.AllCateglogProducts.
        map((objmapped, i) => ({ id: i + 1, ...objmapped }))
        .slice((this.pageItem - 1) * this.pageSizeItem, (this.pageItem - 1) * this.pageSizeItem + this.pageSizeItem);
    }
  }

  setClickedRowSpecMaster(index, obj) {
    this.SelectedRowItemIndex= index;
    this.SelectedRowItem = obj;
    //this.table1clickhandler(obj);
  }

  btn_Delete_click(obj:CateglogProducts){
    console.log("btn_Delete_click", obj)
  }


  GetAllSpecItems() {
    this.productservice.GetCateglogProducts().subscribe(
      data => {
        this.collectionSizeItem = data.length;
        this.AllCateglogProducts = data;

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



  ngOnInit() {
    this.GetAllSpecItems();
  }


  btn_save_click() {
    this.AddCatelogItem()
    console.log("this.angForm.controls[spec_name]", this.angForm.controls["BrandId"].value.Id)
   // console.log("this.angForm.controls[]", this.angForm.controls["dattype"]);
  }

  AddCatelogItem() {
    //console.log("this.angForm.controls[spec_name]", this.angForm.controls["spec_name"].value)
    var obj: CateglogProducts = new CateglogProducts();
    obj.Id = 1;
    obj.BrandId = this.angForm.controls["BrandId"].value.Id;
    obj.SeriesId = this.angForm.controls["SeriesId"].value.Id;
    obj.ModelId= this.angForm.controls["ModelId"].value.Id;
    obj.CategoryId = this.angForm.controls["CategoryId"].value.Id;
    obj.Name = this.angForm.controls["ProductName"].value;
    obj.UserId = 1;
    obj.IpAddress = "";
    obj.CreatedBy = this.globalval.LoggedInUserId;
    obj.ModifiedBy = this.globalval.LoggedInUserId;
    obj.CreatedWhen = new Date();
    obj.ModifiedWhen = new Date();
    this.productservice.saveCatelogOriducts(obj, 1).subscribe(
      data => {
        this.toastr.success("Specification master saved succesfully", this.messages.MessageCaption);
        this.GetAllSpecItems();
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
