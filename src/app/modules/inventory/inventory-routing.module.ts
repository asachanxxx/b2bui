import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { AdditemstocatelogComponent } from './additemstocatelog/additemstocatelog.component';
import { ViewallitemsComponent } from './viewallitems/viewallitems.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { CatelogsearchComponent } from './catelogsearch/catelogsearch.component';
import { BrandandmodelComponent } from './brandandmodel/brandandmodel.component';
import { CategorizationComponent } from './categorization/categorization.component';
import { SpecitemsComponent } from './specitems/specitems.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'category-grid-3-columns-sidebar'
    },
    {
        path: 'add-products',
        component: AddproductsComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    },
    {
        path: 'add-items-to-catelog',
        component: AdditemstocatelogComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    },
    {
        path: 'search-catelog',
        component: CatelogsearchComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    },
    {
        path: 'view-own-items',
        component: ViewallitemsComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    },
    {
        path: 'specifications',
        component: SpecificationsComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    },
    {
        path: 'brandandmodels',
        component: BrandandmodelComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    }, 
    {
        path: 'categorization',
        component: CategorizationComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    },
    {
        path: 'specifications-items',
        component: SpecitemsComponent,
        data: {
            columns: 3,
            viewMode: 'grid',
            sidebarPosition: 'start'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InventoryRoutingModule { }
