import { IConfig, ISettingConfig } from '../../config/config';

export default async (rawReplies: string, userConfig: IConfig, currentConfig: ISettingConfig, currentConfigIndex: number) => {
  const replies = Array.from(rawReplies.matchAll(/(?<=\[\[)(.*?)(?=\]\])/gs), m => m[0]);

  currentConfig.messages = replies;
  userConfig.data[currentConfigIndex] = currentConfig;
  PluginSettings.renderer.writeConfig((__self.meta.packageJson as IQwQNTPlugin).name, userConfig);
};