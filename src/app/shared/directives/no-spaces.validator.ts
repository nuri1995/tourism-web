import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export class NoSpaces {
  public static noSpaces(): ValidatorFn {
    return (control: FormControl) => {
      if (control.value) {
        const invalid = control.value.trim();

        return !invalid ? { spaces: { value: true } } : null;
      }
    };
  }
}
