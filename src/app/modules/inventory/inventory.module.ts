import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';


// modules
import { BlocksModule } from '../blocks/blocks.module';
import { SharedModule } from '../../shared/shared.module';
import { WidgetsModule } from '../widgets/widgets.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { SpecificationsComponent } from './specifications/specifications.component';
import { AdditemstocatelogComponent } from './additemstocatelog/additemstocatelog.component';
import { CatelogsearchComponent } from './catelogsearch/catelogsearch.component';
import { ViewallitemsComponent } from './viewallitems/viewallitems.component';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { DataTablesModule } from 'angular-datatables';
import { BrandandmodelComponent } from './brandandmodel/brandandmodel.component';
import { CategorizationComponent } from './categorization/categorization.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SpecitemsComponent } from './specitems/specitems.component';


@NgModule({
    declarations: [
        SpecificationsComponent,
        AdditemstocatelogComponent,
        CatelogsearchComponent,
        ViewallitemsComponent,
        AddproductsComponent,
        BrandandmodelComponent,
        CategorizationComponent,
        SpecitemsComponent,


    ],
    imports: [
        // modules (angular)
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // modules (third-party)
        CarouselModule,
        // modules
        BlocksModule,
        SharedModule,
        InventoryRoutingModule,
        WidgetsModule,
        DataTablesModule,
        NgbModule
        
      
    ]
})
export class InventoryModule { }
