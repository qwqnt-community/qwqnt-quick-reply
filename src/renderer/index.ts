import { createKeybindingsHandler } from 'tinykeys';
import observeElement from './utils/observeElement';
import { log } from './utils/log';
import getCurrentUserConfig from './utils/getCurrentUserConfig';
import insertEditor from './utils/insertEditor';
import parseReplies from './utils/parseReplies';

const pluginSlug = (__self.meta.packageJson as IQwQNTPlugin).name;

const barIconClick = () => {
  let [ _, currentConfig ] = getCurrentUserConfig();

  if(document.getElementsByClassName('quickReply-reply-list').length == 0){
    const replyList = document.createElement('div');
    replyList.classList.add('quickReply-reply-list');
    currentConfig.messages.forEach((msg) => {
      const btn = document.createElement('button');
      btn.classList.add('quickReply-reply-list-button');
      btn.innerText = msg;
      btn.onclick = (e) => {
        insertEditor((e.target! as HTMLButtonElement).innerText);
        document.getElementsByClassName('quickReply-bar')[0].removeChild(replyList);
      };
      replyList.appendChild(btn);
    });
    document.getElementsByClassName('quickReply-bar')[0].appendChild(replyList);
    log('创建快捷回复语列表完成');
  }
  else document.getElementsByClassName('quickReply-bar')[0].removeChild(document.getElementsByClassName('quickReply-reply-list')[0]);
};

const onMessageLoad = async () => {
  const iconSvg = await (await fetch(qwqnt.framework.protocol.pathToStorageUrl(`${__self.meta.path}/assets/barIcon.svg`))).text();
  const qTooltips = document.createElement('div');
  const qTooltipsContent = document.createElement('div');
  const icon = document.createElement('i');
  const barIcon = document.createElement('div');

  barIcon.classList.add('quickReply-bar');
  barIcon.appendChild(qTooltips);

  qTooltips.classList.add('quickReply-q-tooltips');
  qTooltips.addEventListener('click', barIconClick);
  qTooltips.appendChild(icon);
  qTooltips.appendChild(qTooltipsContent);

  qTooltipsContent.classList.add('quickReply-q-tooltips__content');
  qTooltipsContent.innerText = '快捷回复';

  icon.classList.add('quickReply-q-icon');
  icon.innerHTML = iconSvg;

  document.querySelector('.chat-func-bar')!.lastElementChild!.appendChild(barIcon);
  log('创建工具栏图标完成');
};

const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = qwqnt.framework.protocol.pathToStorageUrl(`${__self.meta.path}/style/global.css`);
document.head.appendChild(style);
log('加载样式文件完成');

document.body.addEventListener('mousedown', (e) => {
  if(!(e.target! as HTMLElement).closest('.quickReply-bar') && document.querySelector('.quickReply-bar')!.querySelector('.quickReply-reply-list')){
    document.querySelector('.quickReply-bar')!.removeChild(document.querySelector('.quickReply-reply-list')!);
  }
});

const keyHandler = createKeybindingsHandler({
  'Alt+A': () => {
    const selected = window.getSelection()?.toString();
    if(selected){
      let [ userConfig, currentConfig, currentConfigIndex ] = getCurrentUserConfig();
      currentConfig.messages.push(selected);
      userConfig.data[currentConfigIndex] = currentConfig;
      PluginSettings.renderer.writeConfig(pluginSlug, userConfig);
    }
  },
  'Alt+([1-9])': event => {
    const index = Number(event.key);
    let [ _, currentConfig ] = getCurrentUserConfig();
    if(index <= currentConfig.messages.length) insertEditor(currentConfig.messages[index - 1]);
  },
});

document.body.addEventListener('keydown', keyHandler);

observeElement('.chat-func-bar', async () => {
  if(document.getElementsByClassName('quickReply-bar').length == 0) await onMessageLoad();
}, true);

RendererEvents.onSettingsWindowCreated(async () => {
  const view = await PluginSettings.renderer.registerPluginSettings(__self.meta.packageJson as IQwQNTPlugin);

  let [ _, currentConfig ] = getCurrentUserConfig();
  view.innerHTML = await (await fetch(qwqnt.framework.protocol.pathToStorageUrl(`${__self.meta.path}/pages/settings.html`))).text();

  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = (__self.meta.packageJson as IQwQNTPlugin).version;

  currentConfig.messages.forEach((message) => {
    (view.querySelector('#setReplies') as HTMLTextAreaElement).value += `[[${message}]]\n`;
  });

  (view.querySelector('#setReplies') as HTMLTextAreaElement).addEventListener('change', async () => {
    const [userConfig, currentConfig, currentConfigIndex] = getCurrentUserConfig();
    await parseReplies((view.querySelector('#setReplies') as HTMLTextAreaElement).value, userConfig, currentConfig, currentConfigIndex);
  });

  (view.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    PluginSettings.renderer.openExternal('https://github.com/QwQ-002/QwQNT-QuickReply');
  });
});