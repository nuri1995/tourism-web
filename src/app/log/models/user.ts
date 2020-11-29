import { Activity } from '../../activities/models/activity';
import { Education } from '../../profile/models/education';
import { Language } from '../../profile/models/language';

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

  constructor() {
    this.name = '';
    this.surname = '';
    this.type = '';
    this.email = '';
    this.password = '';
    this.regActivities = [];
    this.favActivities = [];
    this.birthdate = null;
    this.phone = null;
    this.nationality = '';
    this.nif = '';
    this.about = '';
    this.companyName = '';
    this.companyDescription = '';
    this.cif = null;
    this.languages = [];
    this.education = [];
  }

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

  public isFavouriteActivity(id: number): boolean {
    return this.favActivities.find((activity) => activity.id === id)
      ? true
      : false;
  }
  public getActivity(id: number): Activity {
    return this.regActivities.find((activity) => activity.id === id);
  }
  public registerActivity(activity: Activity) {
    this.regActivities = Object.assign([], this.regActivities);
    this.regActivities.push(activity);
  }
  public favouriteActivity(activity: Activity) {
    this.favActivities = Object.assign([], this.favActivities);
    this.favActivities.push(activity);
  }
  public deleteFavourite(id: number) {
    this.favActivities = Object.assign([], this.favActivities);
    const favActivities = this.favActivities.filter(
      (activity) => activity.id !== id
    );
    this.favActivities = favActivities;
  }
  public cancelActivity(id: number) {
    this.regActivities = Object.assign([], this.regActivities);
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
    this.education = Object.assign([], this.education);
    this.education.push(education);
  }
  public deleteEducation(id: number) {
    this.education = Object.assign([], this.education);
    const education = this.education.filter((education) => education.id !== id);
    this.education = education;
  }

  public addLanguage(language: Language) {
    language.id = this.languages.length + 1;
    this.languages = Object.assign([], this.languages);
    this.languages.push(language);
  }
  public getLanguage(id: number): Language {
    return this.languages.find((language) => language.id === id);
  }
  public deleteLanguage(id: number) {
    this.languages = Object.assign([], this.languages);
    const language = this.languages.filter((language) => language.id !== id);
    this.languages = language;
  }
}
