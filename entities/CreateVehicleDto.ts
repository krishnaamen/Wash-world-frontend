
export class CreateVehicleDto {
  licencePlateNumber: string;
  model: string;
  color: string;
  year: string;
  washplan: any;
  

  constructor(
    licencePlateNumber: string,
    model: string,
    color: string,
    year: string,
    washplan: any,
    
  ) {
    this.licencePlateNumber = licencePlateNumber;
    this.model = model;
    this.color = color;
    this.year = year;
    this.washplan = washplan;
    
  }
}
