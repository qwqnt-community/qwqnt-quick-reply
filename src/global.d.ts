/// <reference types="vite/client" />

declare namespace RendererEvents {
  const onLogin: (callback: (uid?: string) => void) => void;
  const onSettingsWindowCreated: (callback: () => void) => void;
}

interface IQwQNTPlugin {
  name: string;
  version: string;
  qwqnt?: {
    name?: string;
    icon?: string;
    inject?: {
      main?: string;
      renderer?: string;
      preload?: string;
    };
  };
}

declare namespace PluginSettings {
  interface ICommon {
    readConfig: <T>(id: string, defaultConfig?: T) => T;
    writeConfig: <T>(id: string, newConfig: T) => boolean;
    openPath: (path: string) => void;
    openExternal: (url: string) => void;
  }
  interface IRenderer extends ICommon {
    registerPluginSettings: (packageJson: IQwQNTPlugin) => Promise<HTMLDivElement>;
  }

  const main: ICommon;
  const preload: ICommon;
  const renderer: IRenderer;
}

type Unsubscribe = () => void
type EventName = string | string[]
type IpcCallback = (...args: any[]) => void

interface IpcInterceptorType {
  onIpcReceive(callback: IpcCallback): Unsubscribe;
  onIpcSend(callback: IpcCallback): Unsubscribe;
  offIpcReceive(callback: IpcCallback): void;
  offIpcSend(callback: IpcCallback): void;
  onIpcReceiveEvents(eventName: EventName, callback: IpcCallback): Unsubscribe;
  onIpcSendEvents(eventName: EventName, callback: IpcCallback): Unsubscribe;
  offIpcReceiveEvents(eventName: EventName, callback: IpcCallback): void;
  offIpcSendEvents(eventName: EventName, callback: IpcCallback): void;
}

declare const IpcInterceptor: IpcInterceptorType