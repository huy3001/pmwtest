/**
 * Created by Huy on 02/08/2018.
 */

(function ($) {
    /* Global variables */
    var desktop = 1200,
        wdWidth = $(window).width();

    /* Main functions */
    var mainJs = {
        toggleSidebar: function () {
            var sidebar = $('.sidebar'),
                headerButton = $('.header__button');

            if (wdWidth < desktop) {
                if (headerButton.length) {
                    headerButton.on('click', function () {
                        if (sidebar.hasCalss('shown')) {
                            sidebar.removeClass('shown');
                        }
                        else {
                            sidebar.addClass('shown');
                        }
                    });
                }
            }
            else {
                sidebar.removeClass('shown');
            }
        }
    };

    /* Window ready functions */
    $(window).ready(function () {

    });

    /* Window resize functions */
    var resize = 0;
    $(window).resize(function() {
        var _self = $(this);
        resize++;
        setTimeout(function() {
            resize--;
            if (resize === 0) {
                // Done resize ...
                if (_self.width() !== wdWidth) {
                    wdWidth = _self.width();
                    // Done resize width ...
                    // Sidebar toggle //
                    mainJs.toggleSidebar();
                }
            }
        }, 100);
    });
})(jQuery);
