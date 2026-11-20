/*!
 * SilvaGo: motion layer for hsilva.app
 *
 * One drop-in file. No libraries, no build step, no new images or video.
 *   1. Save it as  public/motion.js
 *   2. In src/app/layout.tsx add, as the first child of <html>:
 *        <head><script src="/motion.js" /></head>
 *      It must stay a plain synchronous script so the hero can animate from the first paint.
 *      If your lint flags it (rule @next/next/no-sync-scripts), add an eslint-disable-next-line
 *      comment for that rule on the line above the script tag.
 *
 * What it does
 *   - Hero: nav drops in, the headline rises out of a soft blur, "de graça." is wiped in,
 *     then the Casa → Hospital card draws its route and stamps "0 Kz".
 *   - Below the hero: stats, steps (joined by a route line), photos, chips, services,
 *     reasons and the contact card reveal as they enter the screen.
 *   - Two scroll-linked moments, in CSS only: the main photo drifts, the Huambo photo settles.
 *   - Hover: nav underline grows, cards lift. Buttons give a small press.
 *
 * Safety
 *   - It only adds data-* attributes, CSS custom properties and one <style> tag. It never
 *     changes text or adds elements, so React hydration is not touched.
 *   - Visitors with "reduce motion" get the original page: the script exits at once.
 *   - If anything throws, everything is rolled back and the original page shows.
 *   - Delete the <script> line and the site is exactly as before.
 */
(function () {
  'use strict';

  var d = document;
  var root = d.documentElement;
  if (!root || root.hasAttribute('data-mo')) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ------------------------------------------------------------------ CSS
     "@@" is replaced by `html[data-mo] ` so every rule is scoped to this layer.
     Animations only declare their FROM state and use fill-mode "backwards":
     the element's own styles are always the resting state, so nothing can get stuck hidden. */
  var CSS = `
html[data-mo]{--mo-ease:cubic-bezier(.16,1,.3,1);--mo-spring:cubic-bezier(.34,1.56,.64,1);--mo-io:cubic-bezier(.65,0,.35,1);--mo-blur:8px;--mo-amber:245,181,68}
html[data-mo][data-mo-lite]{--mo-blur:0px}
@media (max-width:767px){html[data-mo]{--mo-blur:0px}}

@keyframes moRise{from{opacity:0;transform:translate3d(0,var(--mo-y,22px),0)}}
@keyframes moRiseB{from{opacity:0;transform:translate3d(0,var(--mo-y,22px),0);filter:blur(var(--mo-b,0px))}}
@keyframes moDown{from{opacity:0;transform:translate3d(0,-14px,0)}}
@keyframes moCard{from{opacity:0;transform:translate3d(0,34px,0) scale(.965)}}
@keyframes moPop{from{opacity:0;transform:scale(.7)}}
@keyframes moSpin{from{opacity:0;transform:rotate(-120deg) scale(.5)}}
@keyframes moWipe{from{clip-path:inset(0 100% 0 0)}}
@keyframes moMaskUp{from{clip-path:inset(100% 0 0 0)}}
@keyframes moSlide{from{opacity:0;transform:translate3d(30px,30px,0) scale(.92)}}
@keyframes moZoom{from{transform:scale(1.12)}}
@keyframes moGrow{from{opacity:0;transform:scale(.55)}}
@keyframes moDraw{from{transform:scaleX(0)}}
@keyframes moDot{from{transform:translateX(0)}to{transform:translateX(calc(var(--mo-x2,124px) - var(--mo-x1,22px)))}}
@keyframes moPing{from{box-shadow:0 0 12px rgba(var(--mo-amber),.8),0 0 0 0 rgba(var(--mo-amber),.7)}to{box-shadow:0 0 12px rgba(var(--mo-amber),.8),0 0 0 16px rgba(var(--mo-amber),0)}}
@keyframes moStamp{from{opacity:0;transform:scale(1.28);filter:blur(var(--mo-b,0px))}}
@keyframes moGlow{0%,100%{text-shadow:0 0 0 rgba(var(--mo-amber),0)}35%{text-shadow:0 0 30px rgba(var(--mo-amber),.55)}}
@keyframes moNudge{50%{transform:translateX(5px)}}
@keyframes moTint{from{color:rgb(var(--mo-amber))}}
@keyframes moRing{from{box-shadow:0 0 0 0 rgba(var(--mo-amber),.6)}60%,to{box-shadow:0 0 0 18px rgba(var(--mo-amber),0)}}
@keyframes moScrub{from{transform:scale(1.16)}to{transform:scale(1)}}
@keyframes moPar{from{transform:translate3d(0,-4%,0) scale(1.09)}to{transform:translate3d(0,4%,0) scale(1.09)}}

/* The site already reveals .reveal blocks; for the blocks this layer drives, it takes over. */
@@.reveal[data-mo-host]{opacity:1;transform:none;transition:none}

/* ============ HERO: plays from the first paint, pure CSS ============ */
@@header{animation:moDown .8s var(--mo-ease) backwards}
@@#hero>div>div:first-child :is(img,video){animation:moZoom 1.9s var(--mo-ease) backwards}
@@#hero .z-10>div:first-child>:nth-child(1){--mo-y:16px;--mo-b:var(--mo-blur);animation:moRiseB .9s var(--mo-ease) .12s backwards}
@@#hero h1{--mo-y:30px;--mo-b:var(--mo-blur);animation:moRiseB 1.15s var(--mo-ease) .26s backwards}
@@#hero h1 .italic{animation:moWipe 1s var(--mo-io) 1.02s backwards}
@@#hero .z-10>div:first-child>p{animation:moRise .95s var(--mo-ease) .62s backwards}
@@#hero .z-10>div:first-child>div:last-child>*{animation:moRise .85s var(--mo-ease) backwards}
@@#hero .z-10>div:first-child>div:last-child>:nth-child(1){animation:moRise .85s var(--mo-ease) .84s backwards,moRing 1.7s ease-out 1.9s backwards}
@@#hero .z-10>div:first-child>div:last-child>:nth-child(2){animation-delay:.96s}

/* ---- Signature: Casa → Hospital → 0 Kz (starts when the card is on screen) ---- */
@@#hero .z-10>div:last-child>div{position:relative}
@@#hero .z-10>div:last-child[data-mo-host="hero"]:not([data-mo-in]){opacity:0}
@@#hero .z-10>div:last-child[data-mo-in]{animation:moCard 1s var(--mo-ease) .45s backwards}
@@#hero .z-10>div:last-child[data-mo-in]>p:nth-child(1){--mo-y:10px;animation:moRise .7s var(--mo-ease) 1s backwards}
@@#hero .z-10>div:last-child[data-mo-in]>div{--mo-y:14px;animation:moRise .8s var(--mo-ease) 1.1s backwards}
@@#hero .z-10>div:last-child>div::before,
@@#hero .z-10>div:last-child>div::after{content:"";position:absolute;pointer-events:none;opacity:0}
@@#hero .z-10>div:last-child>div::after{left:var(--mo-x1,22px);top:calc(100% + 7px);width:calc(var(--mo-x2,124px) - var(--mo-x1,22px));height:2px;border-radius:2px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.62) 0 6px,transparent 6px 11px)}
@@#hero .z-10>div:last-child>div::before{left:calc(var(--mo-x1,22px) - 4px);top:calc(100% + 4px);width:8px;height:8px;border-radius:50%;background:rgb(var(--mo-amber));box-shadow:0 0 12px rgba(var(--mo-amber),.8)}
@@#hero .z-10>div:last-child[data-mo-in]>div::after{opacity:1;animation:moWipe .95s var(--mo-io) 1.5s backwards}
@@#hero .z-10>div:last-child[data-mo-in]>div::before{opacity:1;animation:moDot .95s var(--mo-io) 1.5s both,moPing .9s ease-out 2.45s backwards}
@@#hero .z-10>div:last-child[data-mo-in]>div>span:nth-child(2){animation:moNudge .8s var(--mo-ease) 1.5s}
@@#hero .z-10>div:last-child[data-mo-in]>div>span:nth-child(3){animation:moTint 1.1s ease-out 2.4s}
@@#hero .z-10>div:last-child[data-mo-in]>p:nth-child(3){--mo-b:var(--mo-blur);transform-origin:0 60%;animation:moStamp .7s cubic-bezier(.2,.9,.25,1.12) 2.15s backwards,moGlow 1.7s ease-out 2.75s backwards}
@@#hero .z-10>div:last-child[data-mo-in]>p:nth-child(4){--mo-y:8px;animation:moRise .7s var(--mo-ease) 2.6s backwards}

/* ============ BELOW THE HERO: reveal on entering the screen ============ */
@@[data-mo-host]>:nth-child(1){--mo-i:0}
@@[data-mo-host]>:nth-child(2){--mo-i:1}
@@[data-mo-host]>:nth-child(3){--mo-i:2}
@@[data-mo-host]>:nth-child(4){--mo-i:3}
@@[data-mo-host]>:nth-child(5){--mo-i:4}
@@[data-mo-host]>:nth-child(6){--mo-i:5}

/* children rise one after another */
@@[data-mo-k]:not([data-mo-in])>*{opacity:0}
@@[data-mo-k][data-mo-in]>*{animation:moRise .85s var(--mo-ease) calc(var(--mo-d,0ms) + var(--mo-o,0ms) + var(--mo-i,0)*90ms) backwards}
@@[data-mo-host="head"] h2{--mo-y:26px;--mo-b:var(--mo-blur)}
@@[data-mo-host="head"][data-mo-in] h2{animation-name:moRiseB}

/* surfaces (cards, media) rise as one piece */
@@.reveal[data-mo-s]:not([data-mo-in]){opacity:0}
@@[data-mo-s][data-mo-in]{animation:moCard 1s var(--mo-ease) var(--mo-d,0ms) backwards}
@@[data-mo-host="rise"][data-mo-in]{--mo-y:20px;animation:moRise .85s var(--mo-ease) backwards}

/* Como funciona: numbered circles pop, a dashed route joins them */
@@[data-mo-host="step"]{position:relative;--mo-o:220ms}
@@[data-mo-host="step"]>span{position:relative}
@@[data-mo-host="step"][data-mo-in]>span{animation:moPop .6s var(--mo-spring) calc(var(--mo-d,0ms) + 240ms) backwards}
@@[data-mo-host="step"]>span::after{content:"";position:absolute;left:calc(100% + 12px);top:calc(50% - 1px);width:var(--mo-link,0px);height:2px;border-radius:2px;background:repeating-linear-gradient(90deg,rgb(var(--mo-amber)) 0 6px,transparent 6px 12px);opacity:0}
@@[data-mo-host="step"][data-mo-in]>span::after{opacity:1;animation:moWipe .9s var(--mo-io) calc(900ms + var(--mo-n,0)*520ms) backwards}

/* Quem tem direito: photo unmasks upward, second photo slides in, chips pop */
@@[data-mo-host="photos"]:not([data-mo-in])>div{opacity:0}
@@[data-mo-host="photos"][data-mo-in]>div:first-child{animation:moMaskUp 1.15s var(--mo-ease) backwards}
@@[data-mo-host="photos"][data-mo-in]>div:last-child{animation:moSlide .95s var(--mo-ease) .5s backwards}
@@[data-mo-host="pop"]:not([data-mo-in])>*{opacity:0}
@@[data-mo-host="pop"][data-mo-in]>*{animation:moPop .6s var(--mo-spring) calc(var(--mo-i,0)*80ms) backwards}
@@[data-mo-host="pop"][data-mo-in]>*>span{animation:moPop .5s var(--mo-spring) calc(260ms + var(--mo-i,0)*80ms) backwards}
@@[data-mo-host="list"]:not([data-mo-in])>p,
@@[data-mo-host="list"]:not([data-mo-in]) .grid>*{opacity:0}
@@[data-mo-host="list"][data-mo-in]>p{animation:moRise .8s var(--mo-ease) backwards}
@@[data-mo-host="list"] .grid>:nth-child(1){--mo-g:0}
@@[data-mo-host="list"] .grid>:nth-child(2){--mo-g:1}
@@[data-mo-host="list"] .grid>:nth-child(3){--mo-g:2}
@@[data-mo-host="list"] .grid>:nth-child(4){--mo-g:3}
@@[data-mo-host="list"] .grid>:nth-child(5){--mo-g:4}
@@[data-mo-host="list"] .grid>:nth-child(6){--mo-g:5}
@@[data-mo-host="list"][data-mo-in] .grid>*{--mo-y:14px;animation:moRise .7s var(--mo-ease) calc(240ms + var(--mo-g,0)*90ms) backwards}
@@[data-mo-host="list"][data-mo-in] .grid>*>span:first-child{animation:moSpin .75s var(--mo-spring) calc(380ms + var(--mo-g,0)*90ms) backwards}

/* Huambo photo: the frame rises as one piece, the caption follows (host > frame > img, shade, caption) */
@@[data-mo-host="media"][data-mo-in]>div>div:last-child{--mo-y:18px;animation:moRise .9s var(--mo-ease) .5s backwards}

/* Serviços and Porquê */
@@[data-mo-host="svc"]{--mo-o:260ms}
@@[data-mo-host="col"]{position:relative;border-top-color:transparent;--mo-o:260ms}
@@[data-mo-host="col"]::before{content:"";position:absolute;left:0;right:0;top:calc(var(--mo-rw,2px)*-1);height:var(--mo-rw,2px);background:var(--mo-rule,#0e1f1d);transform:scaleX(0);transform-origin:left}
@@[data-mo-host="col"][data-mo-in]::before{transform:none;animation:moDraw .95s var(--mo-ease) var(--mo-d,0ms) backwards}

/* Contacto (host > card > decor circle, content): card rises, the big circle grows in,
   the lines follow one by one, the call button rings twice */
@@[data-mo-host="contact"]>div>div>:nth-child(1){--mo-j:0}
@@[data-mo-host="contact"]>div>div>:nth-child(2){--mo-j:1}
@@[data-mo-host="contact"]>div>div>:nth-child(3){--mo-j:2}
@@[data-mo-host="contact"]>div>div>:nth-child(4){--mo-j:3}
@@[data-mo-host="contact"]>div>div>:nth-child(5){--mo-j:4}
@@[data-mo-host="contact"][data-mo-in]>div>span{animation:moGrow 1.6s var(--mo-ease) .1s backwards}
@@[data-mo-host="contact"][data-mo-in]>div>div>*{--mo-y:20px;animation:moRise .85s var(--mo-ease) calc(320ms + var(--mo-j,0)*100ms) backwards}
@@[data-mo-host="contact"][data-mo-in]>div>div>h2{--mo-y:26px;--mo-b:var(--mo-blur);animation-name:moRiseB}
@@[data-mo-host="contact"][data-mo-in] a[href^="tel"]{animation:moRing 1.8s ease-out 1.6s 2 backwards}

/* ============ SCROLL-LINKED (CSS only, where supported) ============ */
/* The photo frames are overflow:hidden, which makes them scroll containers, so a plain view() on
   the <img> would watch the frame (which never scrolls) and stay frozen. The timeline is therefore
   declared on the frame itself (its scroller is the page) and the <img> follows it by name. */
@supports (animation-timeline:view()){
  @@[data-mo-host="photos"]>div:first-child{view-timeline:--mo-p block}
  @@[data-mo-host="photos"]>div:first-child img{animation:moPar linear both;animation-timeline:--mo-p;animation-range:cover 0% cover 100%}
  @@[data-mo-host="media"]>div{view-timeline:--mo-m block}
  @@[data-mo-host="media"] img{animation:moScrub linear both;animation-timeline:--mo-m;animation-range:entry 0% cover 55%}
  @@[data-mo-lite] [data-mo-host="photos"]>div:first-child img{animation:none}
}
@supports not (animation-timeline:view()){
  @@[data-mo-host="photos"][data-mo-in]>div:first-child img,
  @@[data-mo-host="media"][data-mo-in] img{animation:moZoom 1.6s var(--mo-ease) backwards}
}

/* ============ HOVER and PRESS ============ */
@@header nav a{position:relative}
@@header nav a::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;border-radius:2px;background:rgb(var(--mo-amber));transform:scaleX(0);transform-origin:left;transition:transform .35s var(--mo-ease)}
@@header nav a:hover::after,
@@header nav a:focus-visible::after{transform:scaleX(1)}
@@a.rounded-full:active{scale:.97}
@media (hover:hover){
  @@[data-mo-host="step"][data-mo-in],
  @@[data-mo-host="svc"][data-mo-in]{transition:translate .35s var(--mo-ease),box-shadow .35s ease}
  @@[data-mo-host="step"][data-mo-in]:hover{translate:0 -4px;box-shadow:0 22px 40px -24px rgba(6,38,36,.38)}
  @@[data-mo-host="svc"][data-mo-in]:hover{translate:0 -5px;box-shadow:0 24px 44px -26px rgba(0,0,0,.5)}
}

@media print{
  @@[data-mo-host],@@[data-mo-host] *,@@#hero .z-10>div:last-child{animation:none!important}
  @@[data-mo-k]>*,@@.reveal[data-mo-s],@@[data-mo-host="photos"]>div,@@[data-mo-host="pop"]>*,
  @@[data-mo-host="list"]>p,@@[data-mo-host="list"] .grid>*,@@#hero .z-10>div:last-child{opacity:1!important}
  @@[data-mo-host="col"]::before{transform:none!important;animation:none!important}
}
`.replace(/@@/g, 'html[data-mo] ');

  /* ------------------------------------------------------------------ plan
     Which existing .reveal blocks get which treatment. Selector → one type per block, in
     document order. A block that is not listed here is treated as "stack" (children rise). */
  var PLAN = [
    ['main > section:nth-child(2) .reveal', ['stack']],                          // stats band
    ['#como-funciona .reveal', ['head', 'step', 'step', 'step']],
    ['#quem-tem-direito .reveal', ['photos', 'head', 'pop', 'list', 'rise']],
    ['main > section:nth-child(5) .reveal', ['media']],                          // Huambo photo
    ['#servicos .reveal', ['head', 'svc', 'svc']],
    ['#porque .reveal', ['head', 'col', 'col', 'col']],
    ['#contacto .reveal', ['contact']]
  ];
  var KIDS = { stack: 1, head: 1, step: 1, svc: 1, col: 1 };   // children rise one by one
  var SURF = { step: 1, svc: 1, media: 1, contact: 1, rise: 1 }; // the block itself rises
  var GAP = { step: 130, svc: 150, col: 150 };                  // ms between blocks on the same row

  root.setAttribute('data-mo', '');
  var style = d.createElement('style');
  style.id = 'mo-css';
  style.textContent = CSS;
  (d.head || root).appendChild(style);

  var lite = (navigator.deviceMemory && navigator.deviceMemory <= 2) ||
             (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  if (lite) root.setAttribute('data-mo-lite', '');

  function rollback() {
    root.removeAttribute('data-mo');
    root.removeAttribute('data-mo-lite');
    if (style.parentNode) style.parentNode.removeChild(style);
  }

  function start() {
    var hosts = [];
    var card = d.querySelector('#hero .z-10 > div:last-child');
    var row = card && card.children[1];

    function mark(el, type) {
      if (!el || el.hasAttribute('data-mo-host')) return;
      if (type === 'col') {                       // keep the original hairline, redraw it on reveal
        var cs = window.getComputedStyle(el);
        el.style.setProperty('--mo-rule', cs.borderTopColor);
        el.style.setProperty('--mo-rw', cs.borderTopWidth);
      }
      el.setAttribute('data-mo-host', type);
      if (KIDS[type]) el.setAttribute('data-mo-k', '');
      if (SURF[type]) el.setAttribute('data-mo-s', '');
      hosts.push(el);
    }

    mark(card, 'hero');
    PLAN.forEach(function (entry) {
      var types = entry[1];
      Array.prototype.forEach.call(d.querySelectorAll(entry[0]), function (el, i) {
        mark(el, types[i] || 'stack');
      });
    });
    Array.prototype.forEach.call(d.querySelectorAll('.reveal'), function (el) { mark(el, 'stack'); });

    /* stagger blocks that sit on the same row (cards side by side) */
    function stagger() {
      Object.keys(GAP).forEach(function (type) {
        var rowTop = null, n = 0;
        hosts.forEach(function (h) {
          if (h.getAttribute('data-mo-host') !== type) return;
          var top = h.offsetTop;
          if (rowTop === null || Math.abs(top - rowTop) > 8) { rowTop = top; n = 0; }
          if (!h.hasAttribute('data-mo-in')) {
            h.style.setProperty('--mo-n', n);
            h.style.setProperty('--mo-d', (n * GAP[type]) + 'ms');
          }
          n += 1;
        });
      });
    }

    /* measure what CSS cannot know: where the route starts/ends, how long the step links are */
    function measure() {
      if (row && row.children.length > 2) {
        var a = row.children[0], b = row.children[2];
        row.style.setProperty('--mo-x1', Math.round(a.offsetLeft + a.offsetWidth / 2) + 'px');
        row.style.setProperty('--mo-x2', Math.round(b.offsetLeft + b.offsetWidth / 2) + 'px');
      }
      var steps = hosts.filter(function (h) { return h.getAttribute('data-mo-host') === 'step'; });
      steps.forEach(function (s, i) {
        var c = s.children[0], next = steps[i + 1], link = 0;
        if (c && next && next.children[0] && Math.abs(s.offsetTop - next.offsetTop) < 8) {
          link = (next.offsetLeft + next.children[0].offsetLeft) -
                 (s.offsetLeft + c.offsetLeft + c.offsetWidth) - 24;
        }
        if (c) c.style.setProperty('--mo-link', Math.max(0, Math.round(link)) + 'px');
      });
    }

    stagger();
    measure();

    function reveal(el) { el.setAttribute('data-mo-in', ''); }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          reveal(e.target);
          io.unobserve(e.target);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
      hosts.forEach(function (h) { io.observe(h); });
    } else {
      hosts.forEach(reveal);
    }

    /* safety net: anything already on screen after a moment is shown, whatever happened */
    setTimeout(function () {
      hosts.forEach(function (h) {
        if (h.hasAttribute('data-mo-in')) return;
        var r = h.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) reveal(h);
      });
    }, 2500);

    var t;
    window.addEventListener('resize', function () {
      clearTimeout(t);
      t = setTimeout(function () { stagger(); measure(); }, 160);
    });
    window.addEventListener('load', measure);
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(measure);
  }

  function run() {
    try { start(); } catch (err) { rollback(); }
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', run);
  else run();
})();
