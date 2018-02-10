/**
 * Created by Huy on 02/08/2018.
 */

(function ($) {
    /* Global variables */
    var desktop = 1200,
        mobile = 768,
        wdWidth = $(window).width();

    /* Main functions */
    var mainJs = {
        toggleSidebar: function () {
            var body = $('body'),
                sidebar = $('.sidebar'),
                sidebarButton = $('.sidebar_close'),
                headerButton = $('.header__button'),
                targetItems = $('.header__button, .sidebar, .sidebar_close');

            if (wdWidth < desktop) {
                if (headerButton.length) {
                    headerButton.on('click', function () {
                        if (sidebar.hasClass('shown')) {
                            sidebar.removeClass('shown');
                            body.removeClass('sidebar_visible');
                        }
                        else {
                            sidebar.addClass('shown');
                            body.addClass('sidebar_visible');
                        }
                    });
                }

                if (sidebarButton.length) {
                    sidebarButton.on('click', function () {
                        sidebar.removeClass('shown');
                        body.removeClass('sidebar_visible');
                    });
                }

                $(document).on('click', function(e) {
                    var target = e.target;
                    if (!$(target).is(targetItems) && !$(target).parents().is(targetItems)) {
                        sidebar.removeClass('shown');
                        body.removeClass('sidebar_visible');
                    }
                });
            }
            else {
                sidebar.removeClass('shown');
                body.removeClass('sidebar_visible');
            }
        },

        tabList: function () {
            var tabItem = $('.tab-item'),
                tabDetail = $('.tab-detail');
            if (tabItem.length) {
                tabItem.each(function () {
                    var tabLink = $(this).find('.tab-link');
                    tabLink.on('click', function (e) {
                        e.preventDefault();
                        tabItem.removeClass('tab-list__item_active');
                        $(this).parent().addClass('tab-list__item_active');

                        var activeItem = $(this).attr('href');
                        setTimeout(function () {
                            tabDetail.removeClass('tab-detail_active');
                            $(activeItem).addClass('tab-detail_active');
                        }, 100);
                    });
                });
            }
        },

        codeContent: function () {
            var infoDetail = $('.info__detail'),
                infoTable = $('.info__table').parent(),
                codeBoxPrepend = $('.code-box__prepend'),
                codeBoxAppend = $('.code-box__append');
            if (wdWidth < mobile) {
                codeBoxPrepend.clone().appendTo(infoDetail);
                codeBoxAppend.clone().appendTo(infoTable);
            }
            else {
                infoDetail.find('.code-box__prepend').remove();
                infoTable.find('.code-box__append').remove();
            }
        }
    };

    /* Window ready functions */
    $(window).ready(function () {
        // Sidebar toggle //
        mainJs.toggleSidebar();

        // Tab list active //
        mainJs.tabList();

        // Code content update //
        mainJs.codeContent();
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

                    // Code content update //
                    mainJs.codeContent();
                }
            }
        }, 100);
    });
})(jQuery);
