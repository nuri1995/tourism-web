import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Activity } from '../models/activity';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const registerUsers = [
      {
        id: 1,
        name: 'Test',
        surname: 'Tset',
        type: 'Tourist',
        email: 'testT@test.com',
        password: '12345678',
        regActivities: [],
        favActivities: [],
        birthdate: '2020-10-21',
        phone: null,
        nationality: '',
        NIF: null,
        about: '',
        companyName: '',
        companyDescription: '',
        CIF: null,
        education: [
          {
            id: 1,
            type: 'Universidad',
            level: 'Postgrado',
            name: 'Psicología',
            university: 'UOC',
            endDate: '2020-09-23',
          },
        ],
        languages: [
          {
            id: 1,
            level: 'A1',
            language: 'Inglés',
            endDate: '2020-09-23',
          },
        ],
      },
      {
        id: 2,
        name: 'Test2',
        surname: '',
        type: 'Company',
        email: 'testC@test.com',
        password: '12345678',
        regActivities: [],
        favActivities: [],
        birthdate: '',
        phone: null,
        nationality: '',
        NIF: null,
        about: '',
        companyName: '',
        companyDescription: '',
        CIF: null,
        education: [
          {
            id: 1,
            type: 'Universidad',
            level: 'Postgrado',
            name: 'Psicología',
            university: 'UOC',
            endDate: '2020-09-23',
          },
        ],
        languages: [
          {
            id: 1,
            level: 'A1',
            language: 'Inglés',
            endDate: '2020-09-23',
          },
        ],
      },
    ];

    const activities = [
      {
        id: 1,
        name: 'Yoga',
        category: 'Playas',
        subcategory: 'Taller',
        description: 'Come to relax the body',
        language: 'Español',
        date: '2020-12-03',
        price: 5,
        minCapacity: 3,
        maxCapacity: 20,
        peopleRegistered: 2,
        state: 'Places available',
      },
      {
        id: 2,
        name: 'Museo Picasso',
        category: 'Cultura y patrimonio',
        subcategory: 'Museo',
        description: 'Visita guiada',
        language: 'Español',
        date: '2020-12-12',
        price: 12,
        minCapacity: 12,
        maxCapacity: 24,
        peopleRegistered: 14,
        state: 'Places available',
      },
    ];

    return { registerUsers, activities };
  }
  /*
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  }
  */
  genId<T extends User | Activity>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 1;
  }
}
