/**
 * play wav sound
 * http://www.phon.ucl.ac.uk/home/mark/audio/play.htm
 * https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox
 * https://developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
 * @author yiminghe@gmail.com
 */
(function() {
    var S = KISSY,
        holder,
        // ie9 can not play wav !
        _buildHtml = ("Audio" in window && (new Audio()).canPlayType('audio/x-wav;')) ?
            function(src) {
                return '<audio preload="auto" autoplay>' +
                    '<source src="' + src + '" type="audio/x-wav">' +
                    '</audio>'; //chrome/fx/opera/safari
            } :
            function(src) {
                return '<embed src="' + src + '" autostart="true" hidden="true"></embed>'; //ie
            };

    S.CheckCodePlayer = function(url) {
        holder = holder || new S.Node("<div style='position: absolute;left:-9999px;top:-9999px;'>" +
            "</div>").appendTo(document.body);
        holder.html(_buildHtml(url))
    };

})();