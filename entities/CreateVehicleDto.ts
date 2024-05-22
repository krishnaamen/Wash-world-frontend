
export class CreateVehicleDto {
  licencePlateNumber: string;
  model: string;
  color: string;
  year: string;
  washplan: number;
  

  constructor(
    licencePlateNumber: string,
    model: string,
    color: string,
    year: string,
    washplan: number
    
  ) {
    this.licencePlateNumber = licencePlateNumber;
    this.model = model;
    this.color = color;
    this.year = year;
    this.washplan = washplan;
    
  }
}
