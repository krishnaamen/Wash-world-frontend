
export class CreateVehicleDto {
  licencePlateNumber: string;
  model: string;
  color: string;
  year: string;



  constructor(
    licencePlateNumber: string,
    model: string,
    color: string,
    year: string,

  ) {
    this.licencePlateNumber = licencePlateNumber;
    this.model = model;
    this.color = color;
    this.year = year;

  }
}
