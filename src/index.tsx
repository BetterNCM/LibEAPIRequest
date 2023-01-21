/// <reference types="./global" />

interface LNAPINCMPlugin extends NCMPlugin {
	isRequestAvailable(): boolean;
	getRequestFnName(): string;
	eapiRequest<T>(url: string, config: APIs.EAPIRequestConfig): Promise<T>;
}

let hideTimer: number = 0;
plugin.onLoad(function () {
	const self: LNAPINCMPlugin = this.mainPlugin;
	self.isRequestAvailable = () => checkEapiRequestFuncName() !== "";
	self.getRequestFnName = () => checkEapiRequestFuncName();
	self.eapiRequest = APIs.eapiRequest.bind(APIs);

	try {
		checkEapiRequestFuncName(); // 触发一次检查请求函数名字
	} catch {}

	if (DEBUG) {
		try {
			const debounceReload = betterncm.utils.debounce(betterncm.reload, 1000);

			const shouldReloadPaths = ["/manifest.json", "/index.js"];

			const currentOriginalFiles = {};

			for (const file of shouldReloadPaths) {
				currentOriginalFiles[file] = betterncm_native.fs.readFileText(
					plugin.pluginPath + file,
				);
			}

			const normalizedPluginPath = Utils.normalizePath(plugin.pluginPath);
			for (const file of betterncm_native.fs.readDir(plugin.pluginPath)) {
				const relPath = Utils.normalizePath(file).replace(
					normalizedPluginPath,
					"",
				);
				currentOriginalFiles[relPath] = betterncm_native.fs.readFileText(file);
			}

			function checkFileOrReload(relPath: string) {
				const fileData = betterncm_native.fs.readFileText(
					plugin.pluginPath + relPath,
				);
				if (currentOriginalFiles[relPath] !== fileData) {
					currentOriginalFiles[relPath] = fileData;
					if (shouldReloadPaths.includes(relPath)) {
						warn(
							"检测到",
							relPath,
							"更新 (",
							currentOriginalFiles[relPath]?.length,
							"->",
							fileData.length,
							")正在重载",
						);
						debounceReload();
					}
				}
			}

			const checkFileOrReloadFunc = {};

			betterncm_native?.fs?.watchDirectory(
				plugin.pluginPath,
				(dirPath, filename) => {
					const normalizedDirPath = Utils.normalizePath(dirPath);
					const fullPath = Utils.normalizePath(`${dirPath}/${filename}`);
					const relPath = fullPath.replace(normalizedDirPath, "");
					checkFileOrReloadFunc[relPath] ||= betterncm.utils.debounce(
						() => checkFileOrReload(relPath),
						1000,
					);
					checkFileOrReloadFunc[relPath]();
				},
			);
		} catch {}
	}
});

plugin.onConfig(() => {
	const root = document.createElement("div");

	root.style.height = "100%";

	ReactDOM.render(<LyricSourceSettings />, root);

	return root;
});

import * as APIs from "./api";
import * as Utils from "./utils";
import { checkEapiRequestFuncName } from "./api";
import { log, warn } from "./logger";
import { NCMPlugin } from "plugin";
import { LyricSourceSettings } from "./config/eapi-source";
if (DEBUG) {
	for (const key in APIs) {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		(window as any)[key] = APIs[key];
	}
	for (const key in Utils) {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		(window as any)[key] = APIs[key];
	}
}
