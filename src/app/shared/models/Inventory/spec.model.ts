export class SpecMaster {
  "Id": number
  "SpecName": string
  "IpAddress": string
  "CreatedBy": string
  "ModifiedBy": string
  "CreatedWhen": Date
  "ModifiedWhen": Date
}

export class SpecItem
{
    Id:number
    SpecItemName:string
    SpecItemDisplayName:string
    DataType:string
    IsApproved:boolean
    IpAddress: string
    CreatedBy: string
    ModifiedBy: string
    CreatedWhen: Date
    ModifiedWhen: Date 
}

export class SpecDetail
{
    Id:number
    SpecMasterId:number
    SpecItemId:number
    DataType:string
    DefaultValue:string
    IsApproved:boolean
    IpAddress: string
    CreatedBy: string
    ModifiedBy: string
    CreatedWhen: Date
    ModifiedWhen: Date 
}