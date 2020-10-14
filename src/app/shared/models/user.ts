import { Activity } from './activity';
import { Education } from './education';
import { Language } from './language';

export class User {
  id: number;
  name: string;
  surname: string;
  type: string;
  email: string;
  password: string;
  regActivities: Activity[];
  favActivities: Activity[];
  birthdate: Date;
  phone: number;
  nationality: string;
  nif: string;
  about: string;
  companyName: string;
  companyDescription: string;
  cif: number;
  languages: Language[];
  education: Education[];

  public isTourist(): boolean {
    return this.type === 'Tourist' ? true : false;
  }

  public isCompany(): boolean {
    return this.type === 'Company' ? true : false;
  }

  public isRegisterActivity(id: number): boolean {
    return this.regActivities.find((activity) => activity.id === id)
      ? true
      : false;
  }
  public getActivity(id: number): Activity {
    return this.regActivities.find((activity) => activity.id === id);
  }
  public isFavouriteActivity(id: number): boolean {
    return this.favActivities.find((activity) => activity.id === id)
      ? true
      : false;
  }
  public registerActivity(activity: Activity) {
    this.regActivities.push(activity);
  }
  public favouriteActivity(activity: Activity) {
    this.favActivities.push(activity);
  }
  public cancelActivity(id: number) {
    const regActivities = this.regActivities.filter(
      (activity) => activity.id !== id
    );
    this.regActivities = regActivities;
  }
  public getEducation(id: number): Education {
    return this.education.find((education) => education.id === id);
  }
  public addEducation(education: Education) {
    education.id = this.education.length + 1;
    this.education.push(education);
  }

  public addLanguage(language: Language) {
    language.id = this.languages.length + 1;
    this.languages.push(language);
  }
  public getLanguage(id: number): Language {
    return this.languages.find((language) => language.id === id);
  }
}
