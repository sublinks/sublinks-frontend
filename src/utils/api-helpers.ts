import { SaveUserSettings } from 'sublinks-js-client';

import SublinksApi from './api-client/client';
import logger from './logger';

export const handleSaveUserSettings = async (userSettings: SaveUserSettings) => {
  try {
    await SublinksApi.Instance().Client().saveUserSettings(userSettings);
  } catch (e) {
    logger.error(`Failed to save user settings ${userSettings}`, e);
  }
};

export const uploadImage = async (imageFile: File) => {
  try {
    const { url } = await SublinksApi.Instance().Client().uploadImage({
      image: imageFile
    });
    return url;
  } catch (e) {
    logger.error('Unable to upload image', imageFile, e);
  }

  return undefined;
};
