import { proxy } from "./proxy";

export default {
	// 根地址
	host: proxy["/prod"].target,

	// 請求地址
	baseUrl: "/api"
};
