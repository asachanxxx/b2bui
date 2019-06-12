import { Component, OnInit, Renderer, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/Inventory/product.service';
import { SystemMessages } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsParams } from 'src/app/shared/services/global.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-additemstocatelog',
  templateUrl: './additemstocatelog.component.html',
  styleUrls: ['./additemstocatelog.component.sass'],
  providers:[ProductService]
})
export class AdditemstocatelogComponent implements OnInit, OnDestroy,AfterViewInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  
  catelogItems:any;
  angForm: FormGroup;
  
  table1Selected: any;
  

  constructor(
    private productservice: ProductService,
    private messages: SystemMessages,
    private toastr: ToastrService,
    private renderer: Renderer,
    private fb: FormBuilder,
    private globalval: GlobalsParams
  ) {
    this.catelogItems = [];
    this.createForm();
    
  }

  createForm() {
    this.angForm = this.fb.group({
      Brand: [null],
      PartNumber: ['',null],
      Series: ['', Validators.required],
      ProductName: ['', Validators.required],
      ItemNo: [''],
      UNSPSC: [''],
      Level1Id: ['', Validators.required],
      Model: ['', Validators.required]
      
    });

    console.log("this.angForm " , this.angForm)
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
  }

  table1clickhandler(info: any): void {
    this.table1Selected = info;
    this.angForm.patchValue({
      spec_name: info[1],
    });
    console.log("info", info)
  }

  ngAfterViewInit(): void { 
 
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
  
  btn_save_click(){

    console.log("this.angForm.controls[]" ,  this.angForm.controls["dattype"]);
  }



}
