///////28
window.wbads.libraries.rendering={
    file:'----------default / replace me-----------',
    required:!0,
    enabled:!0,
    loaded:!1,
    alreadyRun:!1,
    load:function(){wbads.log('[wbads.libraries.rendering.load]()');
    wbads.timeline.logEvent('[wbads.libraries.rendering.load]()');
    if(typeof wbads.decodeWindowLocationHash().wbads_testRenderingConfig==="string")
    {
        this.file=wbads.decodeWindowLocationHash().wbads_testRenderingConfig;
        wbads.log('[wbads.libraries.rendering.load] file from hash: '+this.file)
    }else
    {
        wbads.libraries.rendering.loaded=!0;
        wbads.log('[wbads.libraries.rendering.load] => ignored');
    return
}

var s=document.createElement("script");
s.async=!0;
s.src=this.file;
s.setAttribute('importance','high');
var g=document.getElementsByTagName("head")[0];
s.onload=function(){
    wbads.log('[wbads.libraries.rendering.load] rendering lib loaded');
    wbads.timeline.logEvent('[wbads.libraries.rendering.load] rendering lib loaded');
    wbads.libraries.rendering.loaded=!0;
    wbads.libraries.gpt.call()};
    g.parentNode.insertBefore(s,g)
},
initEvents:function(){
    wbads.addEventListener('positionRenderEnded',
    function(e){if(!e.isEmpty){
        var position=e.slot.getTargetingMap()['position'][0];
        var elementId=wbads.position.get(position,'elementId');
        var iframeContainer=document.querySelector('#'+elementId+' iframe');
        var positionTargeting=wbads.position.get(position,'targeting');
        var positionIsInSafeframe=!1;
        if(positionTargeting.hasOwnProperty('hb_safeframe')){
            positionIsInSafeframe=(positionTargeting.hb_safeframe[0]==='yes')}
            wbads.log(position,positionTargeting,positionIsInSafeframe,wbads.position.get(position,"allTargeting"));
            if(e.isBackfill||positionIsInSafeframe){
                if(typeof wbads.libraries.rendering.display==='function'){
                    var allTargeting=wbads.position.get(position,"allTargeting");
                    if(wbads.libraries.prebid.isAdvertiserId(e.advertiserId)&&allTargeting.hasOwnProperty('hb_size')&&Array.isArray(allTargeting.hb_size)){wbads.log('render1 '+allTargeting.hb_size[0]);
                    wbads.libraries.rendering.display(0,null,null,allTargeting.hb_size[0],iframeContainer.id)}
                    else{wbads.log('render2 '+e.size[0]+'x'+e.size[1]);
                    wbads.libraries.rendering.display(0,null,null,e.size[0]+'x'+e.size[1],iframeContainer.id)}}}}
                    else{wbads.log("nothing to render")}})},};