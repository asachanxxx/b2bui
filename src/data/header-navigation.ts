import { NavigationLink } from '../app/shared/interfaces/navigation-link';

export const navigation: NavigationLink[] = [
    {label: 'Home', url: './', menu: {
        type: 'menu',
        items: [
            {label: 'Home', url: '/compact'}
        ]
    }},
    {label: 'Inventory', url: './inventory', menu: {
        type: 'menu',
        items: [
            {label: 'Add Products',             url: './inventory/add-products'},
            {label: 'Add Items To Catalog',             url: './inventory/add-items-to-catelog'},
            {label: 'Search In Catalog',             url: './inventory/search-catelog'},
            {label: 'View Own Items',             url: './inventory/view-own-items'},
            {label: 'Specifications',             url: './inventory/specifications'},
            {label: 'Specifications Items',             url: './inventory/specifications-items'},
            {label: 'Brands and Models',             url: './inventory/brandandmodels'},
            {label: 'Categorization',             url: './inventory/categorization'},
            
        ]
    }},
    {label: 'Quotations', url: './quotations', menu: {
        type: 'menu',
        items: [
            {label: 'See Quotation Details',             url: './quotations/see-quotations'},
            {label: 'Quotation Status',             url: './quotations/Quotation-Status'},
        ]
    }},
    {label: 'Sales', url: './sales', menu: {
        type: 'menu',
        items: [
            {label: 'Finalize Quotation',             url: './sales/finalize-quotation'},
            {label: 'Give Best Price',             url: './sales/give-bestprice'},
            {label: 'View All Orders',             url: './sales/view-all-orders'},
            {label: 'Order Tracking',             url: './sales/order-tracking'},
        ]
    }},
    {label: 'Approvals', url: './approvals', menu: {
        type: 'menu',
        items: [
            {label: 'Quotation Approval',             url: './approvals/quotation-approval'},
            {label: 'Order Approval',             url: './approvals/order-approval'}
        ]
    }},
    {label: 'Administration', url: './administration', menu: {
        type: 'menu',
        items: [
            {label: 'Change Password',             url: './administration/change-password'},
            {label: 'Change Profile Details',             url: './administration/change-profile'},
            {label: 'Change Organization Details',             url: './administration/change-organization'}
        ]
    }},
    {label: 'Account', url: './account', menu: {
        type: 'menu',
        items: [
            {label: 'Login',           url: './account/login'},
            {label: 'Dashboard',       url: './account/dashboard'},
            {label: 'Edit Profile',    url: './account/profile'},
            {label: 'Order History',   url: './account/orders'},
            {label: 'Address Book',    url: './account/addresses'},
            {label: 'Change Password', url: './account/password'}
        ]
    }},
    
    


    
    
    
    







    // {label: 'Megamenu', url: './shop', menu: {
    //     type: 'megamenu',
    //     size: 'nl',
    //     columns: [
    //         {size: 6, items: [
    //             {label: 'Power Tools', url: './shop', items: [
    //                 {label: 'Engravers', url: './shop'},
    //                 {label: 'Wrenches', url: './shop'},
    //                 {label: 'Wall Chaser', url: './shop'},
    //                 {label: 'Pneumatic Tools', url: './shop'}
    //             ]},
    //             {label: 'Machine Tools', url: './shop', items: [
    //                 {label: 'Thread Cutting', url: './shop'},
    //                 {label: 'Chip Blowers', url: './shop'},
    //                 {label: 'Sharpening Machines', url: './shop'},
    //                 {label: 'Pipe Cutters', url: './shop'},
    //                 {label: 'Slotting machines', url: './shop'},
    //                 {label: 'Lathes', url: './shop'}
    //             ]}
    //         ]},
    //         {size: 6, items: [
    //             {label: 'Hand Tools', url: './shop', items: [
    //                 {label: 'Screwdrivers', url: './shop'},
    //                 {label: 'Handsaws', url: './shop'},
    //                 {label: 'Knives', url: './shop'},
    //                 {label: 'Axes', url: './shop'},
    //                 {label: 'Multitools', url: './shop'},
    //                 {label: 'Paint Tools', url: './shop'}
    //             ]},
    //             {label: 'Garden Equipment', url: './shop', items: [
    //                 {label: 'Motor Pumps', url: './shop'},
    //                 {label: 'Chainsaws', url: './shop'},
    //                 {label: 'Electric Saws', url: './shop'},
    //                 {label: 'Brush Cutters', url: './shop'}
    //             ]}
    //         ]}
    //     ]
    // }},
    // {label: 'Shop', url: './shop', menu: {
    //     type: 'menu',
    //     items: [
    //         {label: 'Shop Grid', url: './shop', items: [
    //             {label: '3 Columns Sidebar', url: './shop/category-grid-3-columns-sidebar'},
    //             {label: '4 Columns Full',    url: './shop/category-grid-4-columns-full'},
    //             {label: '5 Columns Full',    url: './shop/category-grid-5-columns-full'}
    //         ]},
    //         {label: 'Shop List', url: './shop/category-list'},
    //         {label: 'Shop Right Sidebar', url: './shop/category-right-sidebar'},
    //         {label: 'Product', url: './shop/product', items: [
    //             {label: 'Product', url: './shop/product'},
    //             {label: 'Product Alt', url: './shop/product-columnar'},
    //             {label: 'Product Sidebar', url: './shop/product-sidebar'}
    //         ]},
    //         {label: 'Cart', url: './shop/cart'},
    //         {label: 'Checkout', url: './shop/checkout'},
    //         {label: 'Wishlist', url: './shop/wishlist'},
    //         {label: 'Compare', url: './shop/compare'},
    //         {label: 'Track Order', url: './shop/track-order'},
    //     ]
    // }},
    // {label: 'Account', url: './account', menu: {
    //     type: 'menu',
    //     items: [
    //         {label: 'Login',           url: './account/login'},
    //         {label: 'Dashboard',       url: './account/dashboard'},
    //         {label: 'Edit Profile',    url: './account/profile'},
    //         {label: 'Order History',   url: './account/orders'},
    //         {label: 'Address Book',    url: './account/addresses'},
    //         {label: 'Change Password', url: './account/password'}
    //     ]
    // }},
    // {label: 'Blog', url: './blog', menu: {
    //     type: 'menu',
    //     items: [
    //         {label: 'Blog Classic',         url: './blog/category-classic'},
    //         {label: 'Blog Grid',            url: './blog/category-grid'},
    //         {label: 'Blog List',            url: './blog/category-list'},
    //         {label: 'Blog Left Sidebar',    url: './blog/category-left-sidebar'},
    //         {label: 'Post Page',            url: './blog/post-classic'},
    //         {label: 'Post Without Sidebar', url: './blog/post-full'}
    //     ]
    // }},
    // {label: 'Pages', url: './site', menu: {
    //     type: 'menu',
    //     items: [
    //         {label: 'About Us',             url: './site/about-us'},
    //         {label: 'Contact Us',           url: './site/contact-us'},
    //         {label: 'Contact Us Alt',       url: './site/contact-us-alt'},
    //         {label: '404',                  url: './site/not-found'},
    //         {label: 'Terms And Conditions', url: './site/terms'},
    //         {label: 'FAQ',                  url: './site/faq'},
    //         {label: 'Components',           url: './site/components'},
    //         {label: 'Typography',           url: './site/typography'}
    //     ]
    // }},
   
];
