(window.wbads);

window.wbads=window.wbads||{};

window.wbads.adblock={
    loopCheckTime:50,
    loopMaxNumber:10,
    lsCacheKey:'adblockDetected',
    lsCacheTTL:86400*30,
    _var:{
        bait:null,
        loopNumber:0,
        detected:null
    },
    check:function(){
        this._var.loopNumber++;
        var detected=0;
        if(this._var.bait===null){
            this.creatBait()
        }
        if(window.document.body!==null&&(window.document.body.getAttribute('abp')!==null||this._var.bait.offsetParent===null||this._var.bait.offsetHeight===0||this._var.bait.offsetLeft===0||this._var.bait.offsetTop===0||this._var.bait.offsetWidth===0||this._var.bait.clientHeight===0||this._var.bait.clientWidth===0)){
            detected=1}
        if(detected||this._var.loopNumber>=this.loopMaxNumber){
            if(this._var.loopNumber<this.loopMaxNumber){wbads.log('[wbads.adblock.check] Adblock detected before end of loop at turn '+this._var.loopNumber)}
                this._var.detected=detected;this._var.loopNumber=0;wbads.localStorage.setex(this.lsCacheKey,this.lsCacheTTL,detected);
                if(!detected){this.destroyBait()}}
                else{setTimeout(function(){wbads.adblock.check()},this.loopCheckTime)
            }
        },
    creatBait:function(){
        wbads.log('[wbads.adblock.creatBait]()');
        var bait=document.createElement('div');
        bait.setAttribute('class','pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links');
        bait.setAttribute('style','width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;');
        if(window.document.body!==null){this._var.bait=window.document.body.appendChild(bait)
        }
    },
    destroyBait:function(){
        wbads.log('[wbads.adblock.destroyBait]()');
        window.document.body.removeChild(this._var.bait);this._var.bait=null
    },
    detected:function(){
        var detected=0;
        if(this._var.detected!==null){detected=this._var.detected}
        else if(wbads.localStorage.exists(this.lsCacheKey)){detected=wbads.localStorage.get(this.lsCacheKey)}
        wbads.log('[wbads.adblock.detected]() return '+detected);
        return detected
    }
};
