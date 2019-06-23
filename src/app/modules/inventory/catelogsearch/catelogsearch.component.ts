import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-catelogsearch',
  templateUrl: './catelogsearch.component.html',
  styleUrls: ['./catelogsearch.component.sass']
})
export class CatelogsearchComponent implements OnInit {

  @ViewChildren(DataTableDirective)
  dtElements: QueryList<DataTableDirective>;

  dtOptions: DataTables.Settings[] = [];

   _AllBrands: Array<any>;
  _AllBrands2: Array<any>;
  constructor() {

    
    this._AllBrands = [];
    this._AllBrands.push(
      [
        { Id: 1, Name: "Asanga" },
        { Id: 2, Name: "Sarojan" },
        { Id: 3, Name: "Vishwanadan" }
      ]
    );


    this._AllBrands2 = [];
    this._AllBrands2.push(
      [
        { Id: 1, CustomerName: "Asanga" },
        { Id: 1, CustomerName: "Mobitel" },
        { Id: 1, CustomerName: "Airetell" },
      ]
    );
    this.dtTrigger.next();
    this.dtTrigger2.next();
   }

  dtTrigger: Subject<any> = new Subject();
  dtTrigger2: Subject<any> = new Subject();

  ngOnInit() {
   
    this.dtOptions[0] =  {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.dtOptions[1] = {
      pagingType: 'full_numbers',
      pageLength: 2
    };;

   
    console.log(" this.dtOptions[0]" ,  this.dtOptions[0])
  }

  displayToConsole(): void {
    this.dtElements.forEach((dtElement: DataTableDirective, index: number) => {
      dtElement.dtInstance.then((dtInstance: any) => {
        console.log("dtInstance", dtInstance)
        //dtInstance.destroy();
        //this.dtTriggerModel.next();
        console.log(`The DataTable ${index} instance ID is: ${dtInstance.table().node().id}`);

      });
    });
  }

 

  // private buildDtOptions(_AllBrandss:any): DataTables.Settings {
    
  //   return {
  //     data: _AllBrandss,
  //     columns: [{
  //       title: 'ID',
  //       data: 'Id'
  //     }, {
  //       title: 'First name',
  //       data: 'Name'
  //     }]
  //   };
  // }

  // private buildDtOptions2(_AllBrands2s:any): DataTables.Settings {
  //   return {
  //     data: _AllBrands2s,
  //     columns: [{
  //       title: 'ID',
  //       data: 'Id'
  //     }, {
  //       title: 'Customer Name',
  //       data: 'CustomerName'
  //     }]
  //   };
  // }

  

}
