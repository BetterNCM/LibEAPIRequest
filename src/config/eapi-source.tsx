import { tryFindEapiRequestFuncName } from "../api";
import { useConfig } from "../react-api";
import { TextConfigComponent } from "./config-components";

export const LyricSourceSettings: React.FC = () => {
	const ncmPackageVersion = React.useMemo(
		() => APP_CONF.packageVersion as string,
		[],
	);
	const [eapiRequestFuncName, setEapiRequestFuncName] = useConfig(
		"eapiRequestFuncName",
		"",
	);
	const eapiRequestFuncBody = React.useMemo(() => {
		if (eapiRequestFuncName !== "") {
			const func = betterncm.ncm.findApiFunction(eapiRequestFuncName);
			if (func === null) {
				return "";
			} else {
				if ("originalFunc" in func[0]) {
					return (func[0].originalFunc as Function).toString();
				} else {
					return func.toString();
				}
			}
		} else {
			return "";
		}
	}, [eapiRequestFuncName]);
	return (
		<>
			<h2>网易云请求函数来源设置</h2>
			<div style={{ margin: "6px 0" }}>
				如果依赖此插件的其他插件无法正确使用，有可能是无法获取网易云请求函数，或者找到的函数并不是网易云请求函数，请确认此处的函数名称是对应你所使用的网易云版本的请求函数。
			</div>
			<div style={{ margin: "6px 0" }}>
				具体可以前往插件 Github 仓库查询或在 BetterNCM 讨论群内询问作者
				SteveXMH。
			</div>
			<div style={{ margin: "6px 0" }}>
				当前网易云 core.js 版本：{ncmPackageVersion}
			</div>
			<TextConfigComponent
				label="网易云请求函数名称"
				settingKey="eapiRequestFuncName"
				defaultValue={eapiRequestFuncName}
			/>
			<div
				style={{ margin: "6px 0" }}
				// c={eapiRequestFuncBody === "" ? "yellow" : "green"}
			>
				{eapiRequestFuncBody === ""
					? "无法找到该函数，歌词将无法工作"
					: "已找到函数，请自行确定是否是网易云请求函数："}
			</div>
			{eapiRequestFuncBody.length > 0 ? (
				<code style={{ margin: "8px 0" }}>{eapiRequestFuncBody}</code>
			) : (
				<></>
			)}
			<div style={{ margin: "8px 0" }}>
				<button
					onClick={() => {
						const funcName = tryFindEapiRequestFuncName();
						setEapiRequestFuncName(funcName || "");
					}}
				>
					尝试搜索请求函数（方式一）
				</button>
				<button
					onClick={() => {
						const funcName = tryFindEapiRequestFuncName(true);
						setEapiRequestFuncName(funcName || "");
					}}
				>
					尝试搜索请求函数（方式二）
				</button>
			</div>
		</>
	);
};
