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


@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['./categorization.component.sass'],
  providers: [ProductService]
})
export class CategorizationComponent implements OnInit, OnDestroy,AfterViewInit {
  numbers: any;
  specmasters: any

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  angForm: FormGroup;
  angForm1: FormGroup;
  angForm2: FormGroup;

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
    this.specmasters = [];
    this.createForm();
    this.createForm1();
    this.createForm2();
  }


  createForm() {
    this.angForm = this.fb.group({
      category_name: ['', Validators.required],
    });
  }
  createForm1() {
    this.angForm1 = this.fb1.group({
      subcategory_name: ['', Validators.required],
    });
  }

  createForm2() {
    this.angForm2 = this.fb2.group({
      subcategory2_name: ['', Validators.required],
    });
  }

  ngOnInit() {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      select: true,
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.table1clickhandler(data);
        });
        return row;
      }
    };
    this.GetAllspecDetails();
   
  }

  table1clickhandler(info: any): void {
    this.table1Selected = info;
    this.angForm.patchValue({
      spec_name: info[1],
    });
    console.log("info", info)
  }

  ngAfterViewInit(): void { 
    console.log("ngAfterViewInit");
    // this.dtTrigger.next(); 
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    if( this.dtElement.dtInstance === undefined){
      this.dtTrigger.next(); 
    }
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
       dtInstance.destroy();
       this.dtTrigger.next();     
   });
  }

  GetAllspecDetails() {
    this.productservice.getSpecMasters().subscribe(
      data => {
        this.specmasters = data;
        this.rerender();
        //this.dtTrigger.next();
        console.log(this.specmasters);
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
        //this.dtTrigger.unsubscribe();
        this.GetAllspecDetails();
        this.rerender()
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

  Updatespecmaster() {
    if (this.table1Selected === undefined) {
      //error
      return;
    }
    console.log("this.angForm.controls[spec_name]", this.angForm.controls["spec_name"].value)
    var obj: SpecMaster = new SpecMaster();
    obj.Id = this.table1Selected[0];
    obj.SpecName = this.angForm.controls["spec_name"].value;
    obj.CreatedBy = this.globalval.LoggedInUserId;
    obj.ModifiedBy = this.globalval.LoggedInUserId;
    obj.CreatedWhen = new Date();
    obj.ModifiedWhen = new Date();
    this.productservice.saveSpecMaster(obj, 2).subscribe(
      data => {
        this.toastr.success("Specification master Updated succesfully", this.messages.MessageCaption);
        //this.dtTrigger.unsubscribe();
        this.GetAllspecDetails();
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
