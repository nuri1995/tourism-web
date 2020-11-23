import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoSpaces } from 'src/app/shared/directives/no-spaces.validator';
import { Activity } from 'src/app/activities/models/activity';
import { ActivitiesService } from 'src/app/activities/services/activities.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { createActivity, updateActivity } from '../../actions';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  public activity: Activity = new Activity();
  public id: number;

  public name: FormControl;
  public category: FormControl;
  public subcategory: FormControl;
  public description: FormControl;
  public language: FormControl;
  public date: FormControl;
  public price: FormControl;
  public minCapacity: FormControl;
  public maxCapacity: FormControl;
  public state: FormControl;
  public subcategoryDrop: string[];
  public activityForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private activitiesStore: Store<AppState>
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');

    if (this.id) {
      /* this.activitiesService.getActivity(this.id).subscribe((activity) => {
        this.activity = activity;
        this.createSubcategory();
        this.createForm();
      });*/
      this.activitiesStore
        .select('activitiesApp')
        .subscribe((activitiesResponse) => {
          this.activity = activitiesResponse.activities.find(
            (activity) => activity.id === this.id
          );
          this.createSubcategory();
          this.createForm();
        });
    } else {
      this.createForm();
    }
  }

  ngOnInit() {}

  createSubcategory() {
    if (this.activity.category === 'Cultura y patrimonio') {
      this.subcategoryDrop = [
        'Concierto',
        'Espectáculo',
        'Monumento',
        'Museo',
        'Excursión',
        'Festivales',
        'Visita guiada',
      ];
    } else if (this.activity.category === 'Enoturismo') {
      this.subcategoryDrop = [
        'Bodega',
        'Cata de productos',
        'Excursión',
        'Museo del vino',
        'Visita guiada',
      ];
    } else if (this.activity.category === 'Playas') {
      this.subcategoryDrop = [
        'Actividad náutica',
        'Cala',
        'Concierto',
        'Excursión',
        'Taller',
      ];
    }
  }

  createForm() {
    console.log(this.activity);
    this.name = new FormControl(this.activity.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(55),
      NoSpaces.noSpaces(),
    ]);
    this.category = new FormControl(this.activity.category, [
      Validators.required,
    ]);
    this.subcategory = new FormControl(this.activity.subcategory, [
      Validators.required,
    ]);
    this.description = new FormControl(this.activity.description, []);
    this.language = new FormControl(this.activity.language, []);
    this.date = new FormControl(this.activity.date, []);
    this.price = new FormControl(this.activity.price, [
      Validators.required,
      Validators.pattern('^([0-9]+|([0-9]+.[0-9]{2}))$'),
    ]);
    this.minCapacity = new FormControl(this.activity.minCapacity, [
      Validators.required,
      Validators.pattern('^([0-9]*)$'),
    ]);
    this.maxCapacity = new FormControl(this.activity.maxCapacity, [
      Validators.required,
      Validators.pattern('^([0-9]*)$'),
    ]);
    this.state = new FormControl(this.activity.state, [Validators.required]);

    this.activityForm = this.formBuilder.group({
      name: this.name,
      category: this.category,
      subcategory: this.subcategory,
      description: this.description,
      language: this.language,
      date: this.date,
      price: this.price,
      minCapacity: this.minCapacity,
      maxCapacity: this.maxCapacity,
      state: this.state,
    });
    this.activityForm.controls['subcategory'].setValue(
      this.activity.subcategory,
      {
        onlySelf: true,
      }
    );
  }

  changeCategory(e) {
    if (e.target.value === 'Cultura y patrimonio') {
      this.subcategoryDrop = [
        'Concierto',
        'Monumento',
        'Museo',
        'Espectáculo',
        'Excursión',
        'Festivales',
        'Visita guiada',
      ];
    } else if (e.target.value === 'Enoturismo') {
      this.subcategoryDrop = [
        'Bodega',
        'Cata de productos',
        'Excursión',
        'Museo del vino',
        'Visita guiada',
      ];
    } else if (e.target.value === 'Playas') {
      this.subcategoryDrop = [
        'Actividad náutica',
        'Cala',
        'Concierto',
        'Excursión',
        'Taller',
      ];
    }
  }

  public onSave() {
    console.log('submit');
    var _activity: Activity = new Activity();

    _activity.name = this.name.value;
    _activity.category = this.category.value;
    _activity.subcategory = this.subcategory.value;
    _activity.description = this.description.value;
    _activity.language = this.language.value;
    _activity.date = this.date.value;
    _activity.price = this.price.value;
    _activity.minCapacity = this.minCapacity.value;
    _activity.maxCapacity = this.maxCapacity.value;
    _activity.state = this.state.value;

    if (this.id) {
      /*this.activitiesService
        .updateActivities(this.activity)
        .subscribe(() => this.router.navigate(['admin']));*/
      _activity.id = this.id;
      this.activitiesStore.dispatch(updateActivity({ activity: _activity }));
    } else {
      this.activity.peopleRegistered = 0;
      /*this.activitiesService
        .addActivity(this.activity as Activity)
        .subscribe(() => {
          this.router.navigate(['/admin']);
        });*/

      this.activitiesStore.dispatch(createActivity({ activity: _activity }));
    }
    this.router.navigate(['/admin']);
  }
}
