import { IS_WORKER } from "./utils";

const noop = () => {};

export const dbg = (obj) => {
	if (DEBUG) {
		if (IS_WORKER) {
			console.debug("[AMLL-Worker]", obj);
		} else {
			console.debug(obj);
		}
	}
	return obj;
};

export const debug = DEBUG
	? IS_WORKER
		? (...args) => console.debug("[AMLL-Worker]", ...args)
		: console.debug
	: noop;

export const log = DEBUG
	? IS_WORKER
		? (...args) => console.log("[AMLL-Worker]", ...args)
		: console.log
	: noop;

export const warn = IS_WORKER
	? (...args) => console.warn("[AMLL-Worker]", ...args)
	: console.warn;

export const error = IS_WORKER
	? (...args) => console.error("[AMLL-Worker]", ...args)
	: console.error;
