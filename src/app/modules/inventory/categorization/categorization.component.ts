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
 selectedRowLevel1: Number;
 pageLevel1 = 1;
 pageSizeLevel1 = 5;
 collectionSizeLevel1 = 0;
 SelectedRowLevel1Index: any;
 SelectedRowLevel1: any;

  table1Selected: any;
  table1Selected1: any;

  constructor(
    private productservice: ProductService,
    private messages: SystemMessages,
    private toastr: ToastrService,
    private renderer: Renderer,
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private fb2: FormBuilder,
    private globalval: GlobalsParams
  ) {
   
    this._AllLevel1=[]
    this._AllLevel2=[]
    this._AllLevel3=[]

    this.createFormLevel1();
    this.createFormLevel1();
    this.createFormLevel2();
  }


  createFormLevel1() {
    this.angForm = this.fb.group({
      category_name: ['', Validators.required],
    });
  }
  createFormLevel2() {
    this.angForm1 = this.fb1.group({
      subcategory_name: ['', Validators.required],
    });
  }

  createFormLevel3() {
    this.angForm2 = this.fb2.group({
      subcategory2_name: ['', Validators.required],
    });
  }

  ngOnInit() {
   
  }

  table1clickhandler(info: any): void {
    this.table1Selected = info;
    this.angForm.patchValue({
      spec_name: info[1],
    });
    console.log("info", info)
  }



 

  


}
