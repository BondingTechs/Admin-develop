import { config } from "/@/cool";
import { createLink } from "../utils";

// 字體图标库加载
if (config.app.iconfont) {
	config.app.iconfont.forEach((e: string) => {
		createLink(e);
	});
}

// 默認
createLink("//at.alicdn.com/t/font_3254019_60a2xxj8uus.css");
