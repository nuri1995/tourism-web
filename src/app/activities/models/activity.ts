export class Activity {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  language: string;
  date: Date;
  price: number;
  minCapacity: number;
  maxCapacity: number;
  peopleRegistered: number;
  state: string;

  public isOpen(): boolean {
    return this.state === 'Places available' ? true : false;
  }
  public addPeople(): number {
    return this.peopleRegistered++;
  }
  public cancelPeople(): number {
    return this.peopleRegistered--;
  }
}
