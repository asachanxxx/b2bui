export class ProductSaveVM {
    public Product: ProductVM;
    public SpecItems: Array<SpecItemsVM>;
    public SupplierWarrenty: SupplierBundleVM;
}
export class ProductVM {
    public Id: number;
    public ProductCode: string;
    public BrandId: number;
    public ModelId: number;
    public ShortName: string;
    public DisplayName: string;
    public PartNumber: string;
    public Series: string;
    public Name: string;
    public ItemNo: string;
    public UNSPSC: string;
    public Level1Id: number;
    public Level2Id: number;
    public Level3Id: number;
    public PriceValidityPeriod: number;
    public SupplierPrice: number;
    public ProductPrice: number;
    public DefaultImagePath: string;
    public AddedByASeller: boolean;
    public AddedSellerID: string;
}
export class SpecItemsVM {
    public SpecItemId: number;
    public SpecItemName: string;
    public SpecItemDisplayName: string;
    public DataType: string;
    public Value: string;
}

export class SupplierBundleVM {
    public SupplierId: number;
    public Price: number;
    public WarrentyID: number;
    public Duration: number;
}