    ///////31
    window.wbads=window.wbads||{};

    window.wbads.log=function(message){if(wbads.debug){var style='color:#ffffff; background:#00561b;padding:1px 5px 1px 5px;border-radius:2px';switch(arguments.length){case 1:window.console.log('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0]);break;case 2:window.console.log('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0],arguments[1]);break;case 3:window.console.log('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0],arguments[1],arguments[2]);break;case 4:window.console.log('%cwbads',style,wbads.timeline.getTimeSinceStart(),arguments[0],arguments[1],arguments[2],arguments[3]);break;default:wbads.log(arguments)}}};

window.wbads=window.wbads||{};
window.wbads.page={getTargeting:function(){var targeting={wbads:['true'],notARefresh:[wbads.notARefresh?'true':'false']};if(typeof wbads.decodeWindowLocationHash().wbads_testRenderingConfig==='string'){targeting.wbads_rendering=['1']}
var kw='';if(typeof adsconf.targeting!=="undefined"){for(kw in adsconf.targeting){if(typeof adsconf.targeting[kw]==="number"){adsconf.targeting[kw]=String(adsconf.targeting[kw])}
if(Array.isArray(adsconf.targeting[kw])){targeting[kw]=adsconf.targeting[kw]}else if(typeof adsconf.targeting[kw]==="string"){targeting[kw]=[adsconf.targeting[kw]]}}}
var targetingKrux=wbads.krux.getTargetingForGPT();for(kw in targetingKrux){targeting[kw]=targetingKrux[kw]}
var cookies=wbads.cookies.getAll();for(var cookie in cookies){if(cookie.match(/^wbads_*/)){targeting[cookie.replace(/wbads_/,'wbads_cookie_')]=[cookies[cookie]]}}
wbads.log('[wbads.page.getTargeting]()',targeting);return targeting},findBest:function(page){var searched=[page+'-'+wbads.device.getType(),page,page.replace(/[a-zA-Z_0-9-]+$/gi,'_default')+'-'+wbads.device.getType(),page.replace(/[a-zA-Z_0-9-]+$/gi,'_default')];for(var i=0;i<searched.length;i++){if(typeof adsconf.pagesSlots[searched[i]]!=="undefined"){return{found:!0,realCurrentPage:searched[i]}}}
if(page.split('/').length>4){return wbads.page.findBest(page.replace(/\/[a-zA-Z_0-9-]+$/gi,''))}
return{found:!1,realCurrentPage:null}},setTargetingForGPT:function(){wbads.log('[wbads.page.setTargetingForGPT]()');window.googletag.cmd.push(function(){var pageTargeting=wbads.page.getTargeting();for(var kw in pageTargeting){window.googletag.pubads().setTargeting(kw,pageTargeting[kw])}})}};
