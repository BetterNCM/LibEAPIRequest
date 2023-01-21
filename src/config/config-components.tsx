import { useConfig } from "../react-api";

export const TextConfigComponent: React.FC<
	React.HTMLProps<HTMLInputElement> & {
		settingKey: string;
		defaultValue: string;
	}
> = (props) => {
	const [settingValue, setSettingValue] = useConfig(
		props.settingKey,
		props.defaultValue,
	);
	const { onChange, settingKey, defaultValue, ...otherProps } = props;
	return (
		<input
			type="text"
			style={{ margin: "8px 0" }}
			value={settingValue}
			onChange={(evt) => setSettingValue(evt.currentTarget.value)}
			{...otherProps}
		/>
	);
};
