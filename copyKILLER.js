// ==UserScript==
// @name         学习通复制粘贴
// @namespace    火龙果纸箱
// @version      1.0
// @description  解除超星学习通的复制粘贴限制
// @match        *://*.chaoxing.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const removeCopyLimits = () => {
    // 移除body上的onselectstart属性，允许选择文本
    document.body.removeAttribute("onselectstart");
    // 设置user-select样式为unset，允许用户选择文本
    document.documentElement.style.userSelect = "unset";

    // 检查是否存在百度富文本编辑器UEditor实例
    if (typeof UE !== "undefined" && UE.instants && typeof UE.instants === "object") {
      for (const instance of Object.values(UE.instants)) {
        try {
          // 允许UEditor粘贴图片
          if (instance.options) {
            instance.options.disablePasteImage = false;
          }
          // 移除UEditor的beforepaste事件监听器，解除粘贴限制
          if (instance.removeListener) {
            instance.removeListener("beforepaste", editorPaste);
          }
        } catch (error) {
          console.error("[Chaoxing Copy Helper] Failed to remove copy limits from UEditor instance", error);
        }
      }
    }
    console.info("[Chaoxing Copy Helper] Removed copy limits.");
  };

  // 延时执行，确保页面加载完成
  setTimeout(() => {
    try {
      removeCopyLimits();
    } catch (error) {
      console.error("[Chaoxing Copy Helper] Failed to remove copy limits.", error);
    }
  }, 1000); // 1秒后执行
})();