import { IConfig, ISettingConfig, config } from '../../config/config';
import { log } from './log';

export default (): [IConfig, ISettingConfig, number] => {
  const pluginSlug = __self.meta.namespace;

  let userConfig = PluginSettings.renderer.readConfig(pluginSlug, config);
  let currentConfig: ISettingConfig | null = null;
  let currentConfigIndex: number = -1;
  const uid = userConfig.currentUid;
  for(let i = 0; i < userConfig.data.length; i++){
    if(userConfig.data[i].uid === uid){
      currentConfig = userConfig.data[i];
      currentConfigIndex = i;
      break;
    }
  }
  if(currentConfig === null){
    let newUserConfig = config.data[0];
    newUserConfig.uid = uid;
    userConfig.data.push(newUserConfig);
    PluginSettings.renderer.writeConfig(pluginSlug, userConfig);
    currentConfig = newUserConfig;
    currentConfigIndex = userConfig.data.length - 1;
  }

  log('获取当前账号配置完成');
  return [ userConfig, currentConfig, currentConfigIndex ];
};