import { FormGroup } from '@angular/forms';

export function CheckPassword(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.checkPassword) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ checkPassword: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
