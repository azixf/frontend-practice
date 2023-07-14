import { ElMessageBox } from "element-plus";
let link = "";
let length = 0;
let timer = null;

export default function checkUpdate(isProd, interval = 5 * 1000) {
  if (isProd) {
    timer = setInterval(fetchHtml, interval);
  }

  function fetchHtml() {
    fetch(`/?_=${Date.now()}`)
      .then(res => res.text())
      .then(html => {
        const flag = judgeIsNeedUpdate(html);
        if (flag) {
          showUpdateDialog();
          clearInterval(timer);
          timer = null;
        }
      });
  }
}

function judgeIsNeedUpdate(text) {
  const scriptReg = /<script.*?>/gi;
  const scriptLength = text.match(scriptReg).length;
  if (length && length !== scriptLength) return true;
  length = scriptLength;
  const reg = /<script\s?type="module"\s?crossorigin\s?src=["'](.*)?[".]>/gi;
  const result = reg.exec(text);
  if (link && link !== result[1]) return true;
  link = result[1];
  return false;
}

function showUpdateDialog() {
  ElMessageBox.alert("当前网站有更新，请刷新页面体验新功能~", "更新提示", {
    showClose: false,
    confirmButtonText: "立即刷新",
    callback: () => {
      window.location.reload();
    },
  });
}
