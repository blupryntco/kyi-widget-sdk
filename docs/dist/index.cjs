"use strict";const e=require(`./constants-Qvo7SoVs.cjs`);function t(t,n){let r=e.SCOPE_PATHS[t];if(!r)throw Error(`Invalid scope: ${t}`);let i=new URL(r,e.BLUPRYNT_BASE_URL);return i.searchParams.set(`token`,n),i.searchParams.set(`embed`,`true`),i.toString()}function n(n,r){let i=document.createElement(`iframe`);return i.className=`${e.CSS_PREFIX}-iframe`,i.src=t(n,r),i.setAttribute(`allow`,`clipboard-write; web-share`),i.setAttribute(`loading`,`eager`),i}function r(e,t,n){let r=r=>{if(!r.origin.includes(`bluprynt.com`)||r.source!==e.contentWindow)return;let i=r.data;switch(i.type){case`kyi:ready`:t.onReady?.();break;case`kyi:error`:t.onError?.(Error(String(i.payload??`Unknown error`)));break;case`kyi:close`:n?.(),t.onClose?.();break}};return window.addEventListener(`message`,r),()=>{window.removeEventListener(`message`,r)}}function i(){let t=`${e.CSS_PREFIX}-styles`;if(document.getElementById(t))return;let n=document.createElement(`style`);n.id=t,n.textContent=`
    /* Overlay backdrop */
    .${e.CSS_PREFIX}-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: ${e.OVERLAY_Z_INDEX};
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .${e.CSS_PREFIX}-overlay.${e.CSS_PREFIX}-visible {
      opacity: 1;
    }

    /* Modal container */
    .${e.CSS_PREFIX}-modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: 90%;
      max-width: 600px;
      height: 80%;
      max-height: 700px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      z-index: ${e.OVERLAY_Z_INDEX+1};
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
    }

    .${e.CSS_PREFIX}-modal.${e.CSS_PREFIX}-visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    /* Drawer container */
    .${e.CSS_PREFIX}-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 760px;
      height: 100%;
      background: #fff;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
      z-index: ${e.OVERLAY_Z_INDEX+1};
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
    }

    .${e.CSS_PREFIX}-drawer.${e.CSS_PREFIX}-visible {
      transform: translateX(0);
    }

    /* Close button header */
    .${e.CSS_PREFIX}-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px;
      flex-shrink: 0;
    }

    /* Close button */
    .${e.CSS_PREFIX}-close {
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
      border: none;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.15s ease;
      padding: 0;
      flex-shrink: 0;
    }

    .${e.CSS_PREFIX}-close:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    .${e.CSS_PREFIX}-close:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    .${e.CSS_PREFIX}-close svg {
      width: 16px;
      height: 16px;
      stroke: #666;
      flex-shrink: 0;
    }

    .${e.CSS_PREFIX}-close:hover svg {
      stroke: #333;
    }

    /* Iframe styles */
    .${e.CSS_PREFIX}-iframe {
      width: 100%;
      flex: 1;
      min-height: 0;
      border: none;
    }



    /* Loading state */
    .${e.CSS_PREFIX}-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .${e.CSS_PREFIX}-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e5e7eb;
      border-top-color: #0066cc;
      border-radius: 50%;
      animation: ${e.CSS_PREFIX}-spin 0.8s linear infinite;
    }

    @keyframes ${e.CSS_PREFIX}-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,document.head.appendChild(n)}function a(t){let n=document.createElement(`button`);return n.className=`${e.CSS_PREFIX}-close`,n.setAttribute(`aria-label`,`Close`),n.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `,n.addEventListener(`click`,t),n}function o(t,o,s={}){i();let c=document.createElement(`div`);c.className=`${e.CSS_PREFIX}-overlay`;let l=document.createElement(`div`);l.className=`${e.CSS_PREFIX}-modal`,l.setAttribute(`role`,`dialog`),l.setAttribute(`aria-modal`,`true`),l.setAttribute(`aria-label`,`Bluprynt KYI Widget`);let u=n(t,o),d=()=>{c.classList.remove(`${e.CSS_PREFIX}-visible`),l.classList.remove(`${e.CSS_PREFIX}-visible`),setTimeout(()=>{g(),h(),c.remove(),l.remove()},200),s.onClose?.()},f=document.createElement(`div`);f.className=`${e.CSS_PREFIX}-header`;let p=a(d);f.appendChild(p);let m=e=>{e.key===`Escape`&&d()};document.addEventListener(`keydown`,m);let h=()=>document.removeEventListener(`keydown`,m);c.addEventListener(`click`,d),l.addEventListener(`click`,e=>e.stopPropagation());let g=r(u,s,d);return l.appendChild(f),l.appendChild(u),document.body.appendChild(c),document.body.appendChild(l),requestAnimationFrame(()=>{c.classList.add(`${e.CSS_PREFIX}-visible`),l.classList.add(`${e.CSS_PREFIX}-visible`)}),l.focus(),{iframe:u,destroy:()=>{g(),h(),c.remove(),l.remove()}}}function s(t,o,s={}){i();let c=document.createElement(`div`);c.className=`${e.CSS_PREFIX}-overlay`;let l=document.createElement(`div`);l.className=`${e.CSS_PREFIX}-drawer`,l.setAttribute(`role`,`dialog`),l.setAttribute(`aria-modal`,`true`),l.setAttribute(`aria-label`,`Bluprynt KYI Widget`);let u=n(t,o),d=()=>{c.classList.remove(`${e.CSS_PREFIX}-visible`),l.classList.remove(`${e.CSS_PREFIX}-visible`),setTimeout(()=>{g(),h(),c.remove(),l.remove()},300),s.onClose?.()},f=document.createElement(`div`);f.className=`${e.CSS_PREFIX}-header`;let p=a(d);f.appendChild(p);let m=e=>{e.key===`Escape`&&d()};document.addEventListener(`keydown`,m);let h=()=>document.removeEventListener(`keydown`,m);c.addEventListener(`click`,d),l.addEventListener(`click`,e=>e.stopPropagation());let g=r(u,s,d);return l.appendChild(f),l.appendChild(u),document.body.appendChild(c),document.body.appendChild(l),requestAnimationFrame(()=>{c.classList.add(`${e.CSS_PREFIX}-visible`),l.classList.add(`${e.CSS_PREFIX}-visible`)}),{iframe:u,destroy:()=>{g(),h(),c.remove(),l.remove()}}}function c(e,t,n,r={}){if(!n)throw Error(`Access token is required`);switch(e){case`modal`:return o(t,n,r);case`drawer`:return s(t,n,r);default:throw Error(`Invalid mode: ${e}. Expected 'modal' or 'drawer'.`)}}exports.kyi=c;
//# sourceMappingURL=index.cjs.map