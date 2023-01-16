# LibEAPIRequest

一个 [BetterNCM](https://github.com/MicroCBer/BetterNCM) 的网易云请求库

## 安装说明

你可以前往本仓库的 Release 下载对应的插件包，也可以通过 BetterNCM 的插件商店安装本插件。

## 开发/构建/打包流程

推荐将本仓库克隆到 BetterNCM 插件目录下的 `plugins_dev` 文件夹内，可以获得自动重载的能力。

## API

### 你需要在 `manifest.json` 内添加 `loadAfter:["LibEAPIRequest"]` 以保证你的插件总是在此插件后被加载。

你可以在 `loadedPlugins.LibEAPIRequest` 中找到以下 API

```typescript

interface LNAPINCMPlugin extends NCMPlugin {
	isRequestAvailable(): boolean;
	getRequestFnName(): string;
	eapiRequest(url: string, config: APIs.EAPIRequestConfig);
}

```
