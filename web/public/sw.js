if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const p=e=>a(e,c),r={module:{uri:c},exports:t,require:p};s[c]=Promise.all(n.map((e=>r[e]||p(e)))).then((e=>(i(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2f756afc424ce722a980afadc74e1a80"},{url:"/_next/static/XXGc8SZQth-2VG7f18T9n/_buildManifest.js",revision:"36f180a84ac22dffc5a52d67f5ede512"},{url:"/_next/static/XXGc8SZQth-2VG7f18T9n/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/294.e72d2554be082393.js",revision:"e72d2554be082393"},{url:"/_next/static/chunks/422-a6a2f1731f648866.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/4bd1b696-f6fd08fc1a97e668.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/568-78066bf158b35cef.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/684-9592a23000b5dba1.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/874-bc2f5ced80f5a389.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/_not-found/page-16539b7c8ca802b8.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/error/page-a0a54781de948df8.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/layout-de291af703d1905c.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/login/page-360ef9e2fe0c9872.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/page-09e7cb36c9bac836.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/private/page-fc8dd762e2057e1f.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/settings/page-7f93d2c93eacb756.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/topics/%5Btopic_id%5D/page-e980c98d7d569dba.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/topics/page-8b77eed9b94a346b.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/works/%5Bwork_id%5D/%5Bbook_id%5D/%5Breference_id%5D/page-f2564c9d394f2533.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/works/%5Bwork_id%5D/%5Bbook_id%5D/page-3ea4a18054adc9fd.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/works/%5Bwork_id%5D/page-55251b094c9c8ebd.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/app/works/page-e52980e4bc970c10.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/framework-859199dea06580b0.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/main-183efa06f3c97976.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/main-app-8b64459dd5bb9ef0.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/pages/_app-da15c11dea942c36.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/pages/_error-cc3f077a18ea1793.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-72c90f86d6d1a8b3.js",revision:"XXGc8SZQth-2VG7f18T9n"},{url:"/_next/static/css/89fe816d01c3db80.css",revision:"89fe816d01c3db80"},{url:"/apple-icon-180.png",revision:"93e39599bd2663b6f78ddd39bbfb1d59"},{url:"/apple-splash-1125-2436.jpg",revision:"cd0efe6d022bd89fd639be0e0818bb3d"},{url:"/apple-splash-1136-640.jpg",revision:"694fcd71c7e927b22813edefd6be7579"},{url:"/apple-splash-1170-2532.jpg",revision:"bc15abb66b4998150dcded92521e15df"},{url:"/apple-splash-1179-2556.jpg",revision:"f2f84b95fc077e31d5edb55c680cf535"},{url:"/apple-splash-1206-2622.jpg",revision:"0b7afebf6219c9784fcd24072cad5de1"},{url:"/apple-splash-1242-2208.jpg",revision:"37df915d9b6cafb61e4fecd975f9d0de"},{url:"/apple-splash-1242-2688.jpg",revision:"4500b715c08d03d4c26fec7dca648a35"},{url:"/apple-splash-1284-2778.jpg",revision:"ccc948fbba205e10b7e3e9ad81c80cc2"},{url:"/apple-splash-1290-2796.jpg",revision:"f43d41361a09b3908ebc6c120303b842"},{url:"/apple-splash-1320-2868.jpg",revision:"d506d4dc025dc8586e25acf1e039da3b"},{url:"/apple-splash-1334-750.jpg",revision:"1f420590155def471ff48d026fe2b295"},{url:"/apple-splash-1488-2266.jpg",revision:"1a6e3249d5b77e6e25588d45194075fb"},{url:"/apple-splash-1536-2048.jpg",revision:"5e200b897543ccc69380ee3965a1b6e4"},{url:"/apple-splash-1620-2160.jpg",revision:"2117442e6a22b0f82dccfe4bd700d644"},{url:"/apple-splash-1640-2360.jpg",revision:"326b86bec12d928aadd89d57d44e813a"},{url:"/apple-splash-1668-2224.jpg",revision:"830dcc76c7567e88eb897cd7ebadb122"},{url:"/apple-splash-1668-2388.jpg",revision:"ab1f5fc11cb851ad6bb6976d2ad916e1"},{url:"/apple-splash-1792-828.jpg",revision:"1971a0e096f387998de6edcd57a09d72"},{url:"/apple-splash-2048-1536.jpg",revision:"9ad29f48e85575845a8c1606af0175ab"},{url:"/apple-splash-2048-2732.jpg",revision:"aebdc385c595df0017c322358a4f057a"},{url:"/apple-splash-2160-1620.jpg",revision:"483a83719e48db64f716bfeb5a433bb9"},{url:"/apple-splash-2208-1242.jpg",revision:"bd98c1da4193762c852be4b09eede040"},{url:"/apple-splash-2224-1668.jpg",revision:"db2b0a79e408e42cee71d6c1518c1b59"},{url:"/apple-splash-2266-1488.jpg",revision:"deb1705572692fb20f362acfb4211d6c"},{url:"/apple-splash-2360-1640.jpg",revision:"7fbbb0ae8f302cceb99a5600ac87617b"},{url:"/apple-splash-2388-1668.jpg",revision:"a30309610a119b4fa04d5b468f3584a9"},{url:"/apple-splash-2436-1125.jpg",revision:"4e298fbeae9595641e90f76430c1f317"},{url:"/apple-splash-2532-1170.jpg",revision:"9088a8031cb10b950087ac0784f225b5"},{url:"/apple-splash-2556-1179.jpg",revision:"8bf40ea3b297ea5dd520b3fc895381d3"},{url:"/apple-splash-2622-1206.jpg",revision:"de831ca6c4b477b6e9a00a2ad9d03be5"},{url:"/apple-splash-2688-1242.jpg",revision:"3a32a449d02ce99eb596112f0d51a47c"},{url:"/apple-splash-2732-2048.jpg",revision:"c610abfafaf725a8d714a57c4a3c1e92"},{url:"/apple-splash-2778-1284.jpg",revision:"25db3202760f3f233ac54c63af1a5b16"},{url:"/apple-splash-2796-1290.jpg",revision:"8ac8cf9e7468413cef75198564e07164"},{url:"/apple-splash-2868-1320.jpg",revision:"603b1f9a8f0535bd73115608b6216df4"},{url:"/apple-splash-640-1136.jpg",revision:"2ff36cedbe050b41fd175aaa9818783d"},{url:"/apple-splash-750-1334.jpg",revision:"8379c8a551f1d9f809bc6e51b00461b8"},{url:"/apple-splash-828-1792.jpg",revision:"c1d0bc6fd6afa2feb76402595f412d84"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/icon.svg",revision:"46bc4b1160f39121893592b79aa36957"},{url:"/manifest-icon-192.maskable.png",revision:"3b163a426d762870355f0e53dca352f4"},{url:"/manifest-icon-512.maskable.png",revision:"535340783dc1409d19102ff75f9fa5cd"},{url:"/manifest.json",revision:"06e533597b26ba52885712b060d1a1bb"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
