

/**
 * Main JS file for unnamed index behaviours
 */

/* jQuery document */

(function ($) {

    "use strict";


    $(document).ready(function(){

        /**
        * use facade function to produce the 'minutes to read'
        * content on each excerpt **/

        showHowManyMinutes();


        /** facade **/

        // Get the content from the theme,
        // // calculate time to read,
        // // // add time content to the theme

        function showHowManyMinutes () {

          // Get excerpt containers

          var excerpts = document.getElementsByClassName("post-excerpt-container");

          // ensure excerpts

          if ( excerpts.length == 0 ) return

          for (var i = 0; i < excerpts.length; i++) {

            // Get hidden content

            // // Makes use of the {{content}} exposed to handlebars
            // // // dumped in a div and hudden because we don't want to hack Ghost

            var hiddenContent = excerpts[i].getElementsByClassName("hidden")[0];

            // ensure hidden content

            if ( hiddenContent == undefined  ) return

            // produce time to read string

            var timeString = produceTimeString( stripHTML( hiddenContent.innerHTML ));

            // Add time to read to the action div content

            var action = excerpts[i].getElementsByClassName("action")[0];
            action.innerHTML += ' · ' + timeString;

            // remove hidden content

            excerpts[i].removeChild( hiddenContent );

          };

          return

        }

        /** services **/

        function stripHTML (html) {
          var tmp = document.createElement("DIV");
          tmp.innerHTML = html;
          return tmp.textContent || tmp.innerText || "";
        }

        function countWords (words) {
          var s = words;
          s = s.replace(/(^\s*)|(\s*$)/gi,"");
          s = s.replace(/[ ]{2,}/gi," ");
          s = s.replace(/\n /,"\n");
          return s.split(" ").length;
        }

        function countTime (count) {
          // average adult reads 250 words per minute
          // src: http://en.wikipedia.org/wiki/Words_per_minute
          return count / 250
        }

        function produceTimeString (words) {
          return Math.ceil(countTime(countWords(words))) + " min to read"
        }


    });

}(jQuery));

