import { buildFeature, FeatureType } from 'adminjs';

export const disableAllActions = (): FeatureType => {
  return buildFeature({
    actions: {
      edit: { isAccessible: false },
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
      new: { isAccessible: false },
    },
  });
};
