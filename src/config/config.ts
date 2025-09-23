export const config: IConfig = {
  currentUid: '-1',
  data: [
    {
      uid: '-1',
      messages: [],
    },
  ],
};

export interface ISettingConfig {
  uid: string;

  messages: string[];
};

export interface IConfig {
  currentUid: string;
  data: ISettingConfig[];
};