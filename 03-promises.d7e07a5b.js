!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},n.parcelRequired7c6=i);var r=i("6JpON"),u=document.querySelector(".form");function a(e,n){var t=Math.random()>.3;return new Promise((function(o,i){t?o({position:e,delay:n}):i({position:e,delay:n})}))}u.addEventListener("submit",(function(n){n.preventDefault();for(var t=Number(u.elements.delay.value),o=Number(u.elements.step.value),i=Number(u.elements.amount.value),l=1;l<=i;l+=1)a(l,t).then((function(n){var t=n.position,o=n.delay;setTimeout((function(){e(r).Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms"))}),o)})).catch((function(n){var t=n.position,o=n.delay;setTimeout((function(){e(r).Notify.failure("❌ Rejected promise ".concat(t," in ").concat(o,"ms"))}),o)})),t+=o}))}();
//# sourceMappingURL=03-promises.d7e07a5b.js.map
