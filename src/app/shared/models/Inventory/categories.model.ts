export class Level1
{
    Id :number
    Code :string
    Level1Name :string
    IsApproved:boolean
    CreatedBy:string
    ModifiedBy:string
    CreatedWhen:Date
    ModifiedWhen:Date
}

export class Level2
{
    Id :number
    Level1Id :number
    Code :string
    Level2Name :string
    SpecMasterId :number
    IsApproved:boolean
    CreatedBy:string
    ModifiedBy:string
    CreatedWhen:Date
    ModifiedWhen:Date
}

export class Level3
{
    Id :number
    Code :string
    Level3Name :string
    Level1Id :number
    Level12d :number
    IsApproved:boolean
    CreatedBy:string
    ModifiedBy:string
    CreatedWhen:Date
    ModifiedWhen:Date
}

