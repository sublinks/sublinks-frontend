import { SaveUserSettings } from 'sublinks-js-client';

import SublinksApi from './api-client/client';
import logger from './logger';

export const handleSaveUserSettings = async ( userSettings: SaveUserSettings) => {

   try {
      const updatedUserSettings = await SublinksApi.Instance().Client().saveUserSettings(userSettings);
   } catch (e) {
      logger.error(`Failed to save user settings ${userSettings}`, e);
   }
};
