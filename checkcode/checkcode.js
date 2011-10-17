/**
 * play wav sound
 * http://www.phon.ucl.ac.uk/home/mark/audio/play.htm
 * https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox
 * https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
 * http://kathymarks.com/archives/2005/09/embedding_windows_media_and_quicktime_video_on_a_web_page.html
 * @author yiminghe@gmail.com
 */
(function() {

    function isWin(){
        return navigator.userAgent.indexOf("Windows")!=-1;
    }
    var S = KISSY,
        doc = document,
        DOM = S.DOM,
        player,
        // ie9 can not play wav !
        playerHtml = ("Audio" in window && (new Audio()).canPlayType('audio/x-wav;')) ?
            // chrome/fx/opera/safari
            '<audio preload="auto" autoplay="autoplay"></audio>' :
            // ie
            // can only be put under body ??
            (S.UA.ie?'<bgsound></bgsound>':
            // old firefox , use wnidows media player in windows and quicktime in others
            '<embed '+(isWin()?'type="application/x-mplayer2"':'')+' autostart="true" hidden="true"></embed>');

    // ie6 need this ??
    function refreshPlayer() {
        DOM.prepend(player, doc.body || doc.documentElement);
    }

    function _player() {
        refreshPlayer();
        return player;
    }

    function getPlayer() {
        if (player) {
            getPlayer = _player;
            return getPlayer();
        }
        player = DOM.create(playerHtml);
        refreshPlayer();
        return player;
    }

    S.CheckCodePlayer = function(url) {
        getPlayer().src = url;
    };

})();