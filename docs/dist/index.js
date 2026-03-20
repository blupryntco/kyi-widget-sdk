import{BLUPRYNT_BASE_URL as e,CSS_PREFIX as t,OVERLAY_Z_INDEX as n,SCOPE_PATHS as r}from"./constants-CpEJCh8p.js";function i(t,n){let i=r[t];if(!i)throw Error(`Invalid scope: ${t}`);let a=new URL(i,e);return a.searchParams.set(`token`,n),a.searchParams.set(`embed`,`true`),a.toString()}function a(e,n){let r=document.createElement(`iframe`);return r.className=`${t}-iframe`,r.src=i(e,n),r.setAttribute(`allow`,`clipboard-write; web-share`),r.setAttribute(`loading`,`eager`),r}function o(e,t,n){let r=r=>{if(!r.origin.includes(`bluprynt.com`)||r.source!==e.contentWindow)return;let i=r.data;switch(i.type){case`kyi:ready`:t.onReady?.();break;case`kyi:complete`:t.onComplete?.();break;case`kyi:error`:t.onError?.(Error(String(i.payload??`Unknown error`)));break;case`kyi:close`:n?.(),t.onClose?.();break}};return window.addEventListener(`message`,r),()=>{window.removeEventListener(`message`,r)}}function s(e,n,r={}){let i=r.parentElement??document.body,s=document.createElement(`div`);s.className=`${t}-inline`;let c=a(e,n);s.appendChild(c);let l=o(c,r);return i.appendChild(s),{iframe:c,destroy:()=>{l(),s.remove()}}}function c(){let e=`${t}-styles`;if(document.getElementById(e))return;let r=document.createElement(`style`);r.id=e,r.textContent=`
    /* Overlay backdrop */
    .${t}-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: ${n};
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .${t}-overlay.${t}-visible {
      opacity: 1;
    }

    /* Modal container */
    .${t}-modal {
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
      z-index: ${n+1};
      overflow: hidden;
      opacity: 0;
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }

    .${t}-modal.${t}-visible {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    /* Drawer container */
    .${t}-drawer {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      max-width: 760px;
      height: 100%;
      background: #fff;
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
      z-index: ${n+1};
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
    }

    .${t}-drawer.${t}-visible {
      transform: translateX(0);
    }

    /* Close button */
    .${t}-close {
      position: absolute;
      top: 12px;
      right: 12px;
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
      z-index: 10;
      transition: background-color 0.15s ease;
      padding: 0;
      flex-shrink: 0;
    }

    .${t}-close:hover {
      background: rgba(0, 0, 0, 0.1);
    }

    .${t}-close:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    .${t}-close svg {
      width: 16px;
      height: 16px;
      stroke: #666;
      flex-shrink: 0;
    }

    .${t}-close:hover svg {
      stroke: #333;
    }

    /* Iframe styles */
    .${t}-iframe {
      width: 100%;
      height: 100%;
      border: none;
    }

    .${t}-inline {
      width: 100%;
      height: 100%;
      min-height: 400px;
    }

    /* Loading state */
    .${t}-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    .${t}-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e5e7eb;
      border-top-color: #0066cc;
      border-radius: 50%;
      animation: ${t}-spin 0.8s linear infinite;
    }

    @keyframes ${t}-spin {
      to {
        transform: rotate(360deg);
      }
    }
  `,document.head.appendChild(r)}function l(e){let n=document.createElement(`button`);return n.className=`${t}-close`,n.setAttribute(`aria-label`,`Close`),n.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `,n.addEventListener(`click`,e),n}function u(e,n,r={}){c();let i=document.createElement(`div`);i.className=`${t}-overlay`;let s=document.createElement(`div`);s.className=`${t}-modal`,s.setAttribute(`role`,`dialog`),s.setAttribute(`aria-modal`,`true`),s.setAttribute(`aria-label`,`Bluprynt KYI Widget`);let u=a(e,n),d=()=>{i.classList.remove(`${t}-visible`),s.classList.remove(`${t}-visible`),setTimeout(()=>{h(),m(),i.remove(),s.remove()},200),r.onClose?.()},f=l(d),p=e=>{e.key===`Escape`&&d()};document.addEventListener(`keydown`,p);let m=()=>document.removeEventListener(`keydown`,p);i.addEventListener(`click`,d),s.addEventListener(`click`,e=>e.stopPropagation());let h=o(u,r,d);return s.appendChild(f),s.appendChild(u),document.body.appendChild(i),document.body.appendChild(s),requestAnimationFrame(()=>{i.classList.add(`${t}-visible`),s.classList.add(`${t}-visible`)}),s.focus(),{iframe:u,destroy:()=>{h(),m(),i.remove(),s.remove()}}}function d(e,n,r={}){c();let i=document.createElement(`div`);i.className=`${t}-overlay`;let s=document.createElement(`div`);s.className=`${t}-drawer`,s.setAttribute(`role`,`dialog`),s.setAttribute(`aria-modal`,`true`),s.setAttribute(`aria-label`,`Bluprynt KYI Widget`);let u=a(e,n),d=()=>{i.classList.remove(`${t}-visible`),s.classList.remove(`${t}-visible`),setTimeout(()=>{h(),m(),i.remove(),s.remove()},300),r.onClose?.()},f=l(d),p=e=>{e.key===`Escape`&&d()};document.addEventListener(`keydown`,p);let m=()=>document.removeEventListener(`keydown`,p);i.addEventListener(`click`,d),s.addEventListener(`click`,e=>e.stopPropagation());let h=o(u,r,d);return s.appendChild(f),s.appendChild(u),document.body.appendChild(i),document.body.appendChild(s),requestAnimationFrame(()=>{i.classList.add(`${t}-visible`),s.classList.add(`${t}-visible`)}),{iframe:u,destroy:()=>{h(),m(),i.remove(),s.remove()}}}function f(e,t,n,r={}){if(!n)throw Error(`Access token is required`);switch(e){case`inline`:return s(t,n,r);case`modal`:return u(t,n,r);case`drawer`:return d(t,n,r);default:throw Error(`Invalid mode: ${e}. Expected 'inline', 'modal', or 'drawer'.`)}}export{f as kyi};
//# sourceMappingURL=index.js.map