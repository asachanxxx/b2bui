import { NgbdSortableHeader, SortEvent, compare } from '../directives/NgbdSortableHeader.directive';
import { ViewChildren, QueryList, Component, Input } from '@angular/core';

@Component({
    selector: 'ngbd-table-sortable',
    templateUrl: './table-sortable.html'
  })
  export class NgbdTableSortable {
  
    @Input() data: any;
    
    countries;
  
    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  
    onSort({column, direction}: SortEvent) {
  
      // resetting other headers
      this.headers.forEach(header => {
        if (header.sortable !== column) {
          header.direction = '';
        }
      });
  
      // sorting countries
      if (direction === '') {
        this.countries = this.data;
      } else {
        this.countries = [...this.data].sort((a, b) => {
          const res = compare(a[column], b[column]);
          return direction === 'asc' ? res : -res;
        });
      }
    }
}