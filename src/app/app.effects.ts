import { ActivitiesEffects } from './activities/effects/activities.effects';
import { LoginEffects } from './log/effects/login.effects';
import { ProfileEffects } from './profile/effects/profile.effects';

export const EffectsArray: any[] = [
  LoginEffects,
  ActivitiesEffects,
  ProfileEffects,
];
