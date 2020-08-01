// ==UserScript==
// @name         dmm2torrent
// @namespace    https://vazue.com/
// @version      1.2.1
// @description
// @author       Man Yiu
// @match        https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=*
// @grant        none
// ==/UserScript==

{
  ("use strict");

  function url2code(url) {
    const errorReturn = {
      matched: false,
    };
    const cidRegex = /(?:cid=.{0,}?)([a-z]{2,}\d{3,})/i;

    if (cidRegex.test(url) === false) {
      return errorReturn;
    }

    const codeEng = /[a-z]{2,}/i.exec(cidRegex.exec(url)[1])[0];
    let codeNum = /\d{3,}/i.exec(cidRegex.exec(url)[1])[0];

    if (codeNum.length === 5 && codeNum.indexOf("00") === 0) {
      codeNum = codeNum.slice(2);
    }

    const code = `${codeEng}-${codeNum}`;

    return {
      matched: true,
      code,
    };
  }

  function code2nyaaUrl(code) {
    const url = `https://sukebei.nyaa.si/?q=${code}`;
    return url;
  }

  function aButton(url) {
    const target = "_blank";
    const text = "Search from Nyaa";

    const stylePosition = "fixed";
    const styleRight = "20px";
    const styleBottom = "20px";
    const stylePadding = "10px";
    const styleBorderRadius = "5px";
    const styleColor = "white";
    const styleBackgroundColor = "red";

    const styleText = `position: ${stylePosition}; right: ${styleRight}; bottom: ${styleBottom}; padding: ${stylePadding}; border-radius: ${styleBorderRadius}; color: ${styleColor}; background-color: ${styleBackgroundColor};`;

    const button = document.createElement("a");
    button.href = url;
    button.target = target;
    button.style = styleText;

    const buttonText = document.createTextNode(text);
    button.appendChild(buttonText);

    return button;
  }

  const code = url2code(document.location.pathname);
  if (code.matched === true) {
    const url = code2nyaaUrl(code.code);
    const button = aButton(url);

    document.body.appendChild(button);
  }
}
