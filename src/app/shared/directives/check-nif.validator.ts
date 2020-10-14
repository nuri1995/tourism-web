import { FormGroup } from '@angular/forms';

export function CheckNif(controlNationality: string, controlNif: string) {
  return (formGroup: FormGroup) => {
    const controlNation = formGroup.controls[controlNationality];
    const control = formGroup.controls[controlNif];
    const mask = new RegExp(
      '^(([KLMXYZ]|[klmxyz]|[0-9])[0-9]{7}([A-Z]|[a-z]))$'
    );

    if (control.errors && !control.errors.checkNif) {
      return;
    }

    if (controlNation.value === 'ES') {
      if (control.value) {
        const invalid = mask.test(control.value);
        console.log('test');
        invalid
          ? control.setErrors({ checkNif: null })
          : control.setErrors({ checkNif: true });
        console.log(invalid);
      } else {
        return;
      }
    } else {
      return;
    }
  };
}
