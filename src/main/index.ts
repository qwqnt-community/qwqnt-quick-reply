import { config, type IConfig } from '../config/config';
import packageJson from '../../package.json';

qwqnt.main.hooks.whenBrowserWindowCreated.peek(() => {
  IpcInterceptor.onIpcSendEvents('nodeIKernelSessionListener/onSessionInitComplete', (...args) => {
    const userConfig: IConfig = PluginSettings.main.readConfig((packageJson as IQwQNTPlugin).name, config);
    userConfig.currentUid = args[2].payload.uid;
    PluginSettings.main.writeConfig((packageJson as IQwQNTPlugin).name, userConfig);
  });
});