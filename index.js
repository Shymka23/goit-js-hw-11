import{a as c,S as u,i}from"./assets/vendor-frHSA4Lh.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const d="50309673-ea2b029f8f1cb6745c8643ce8",f="https://pixabay.com/api/";async function p(t){const o={key:d,q:t.trim(),image_type:"photo",orientation:"horizontal",safesearch:!0};return(await c.get(f,{params:o})).data}let m=new u(".gallery a",{captionsData:"alt",captionDelay:250});function y(t){const o=document.querySelector(".gallery"),n=t.map(s=>`
      <li class="gallery-item">
        <a href="${s.largeImageURL}">
          <img
            src="${s.webformatURL}"
            alt="${s.tags}"
            class="gallery-image"
          />
          <div class="image-info">
            <p><b>Likes:</b>👍 ${s.likes}</p>
            <p><b>Views:</b>👀 ${s.views}</p>
            <p><b>Comments:</b>💬 ${s.comments}</p>
            <p><b>Downloads:</b>⬇️ ${s.downloads}</p>
          </div>
        </a>
      </li>
    `).join("");o.insertAdjacentHTML("beforeend",n),m.refresh()}function g(){const t=document.querySelector(".gallery");t.innerHTML=""}function h(){const t=document.querySelector(".loader");t.style.display="block"}function b(){const t=document.querySelector(".loader");t.style.display="none"}const l=document.querySelector(".form");l.addEventListener("submit",L);async function L(t){t.preventDefault();const o=t.target.elements["search-text"].value.trim();if(!o){i.warning({title:"Warning",message:"Please enter a search term",position:"topRight"});return}h(),g();try{const n=await p(o);if(n.hits.length===0){i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(n.hits)}catch(n){i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(n)}finally{b(),l.reset()}}
//# sourceMappingURL=index.js.map
