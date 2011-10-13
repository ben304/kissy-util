/**
 * play wav sound
 * http://www.phon.ucl.ac.uk/home/mark/audio/play.htm
 * https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox
 * https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
 * @author yiminghe@gmail.com
 */
(function() {

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
            '<bgsound></bgsound>';

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