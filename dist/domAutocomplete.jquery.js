/**
 * domAutocomplete - jQuery plugin that allows you to make autocomplete from DOM
 * @version v1.0.0
 * @link https://github.com/oziks/domAutocomplete
 * @license MIT
 */
(function ($){
    $.domAutocomplete = function (el, options) {
        var $this = this;

        // Access to jQuery and DOM versions of element
        $this.$el = $(el);
        $this.el  = el;

        // List autocomplete
        $this.list = $('<ul class="domAutocomplete"></ul>');

        // Add a reverse reference to the DOM object
        $this.$el.data("domAutocomplete", $this);

        $this.init = function () {
            $this.options = $.extend($.domAutocomplete.defaultOptions, options);

            // Override contains selecor for insensitive case
            if ($this.options.insensitive === true) {
                jQuery.expr[':'].contains = function (a, i, m) {
                    // Expression to replace accented characters with regular characters
                    var rExps = [
                        {re: /[\xC0-\xC6]/g, ch: "A"},
                        {re: /[\xE0-\xE6]/g, ch: "a"},
                        {re: /[\xC8-\xCB]/g, ch: "E"},
                        {re: /[\xE8-\xEB]/g, ch: "e"},
                        {re: /[\xCC-\xCF]/g, ch: "I"},
                        {re: /[\xEC-\xEF]/g, ch: "i"},
                        {re: /[\xD2-\xD6]/g, ch: "O"},
                        {re: /[\xF2-\xF6]/g, ch: "o"},
                        {re: /[\xD9-\xDC]/g, ch: "U"},
                        {re: /[\xF9-\xFC]/g, ch: "u"},
                        {re: /[\xC7-\xE7]/g, ch: "c"},
                        {re: /[\xD1]/g, ch: "N"},
                        {re: /[\xF1]/g, ch: "n"}
                    ];

                    var element = $(a).text();
                    var search  = m[3];

                    $.each(rExps, function () {
                         element = element.replace(this.re, this.ch);
                         search  = search.replace(this.re, this.ch);
                    });

                    return element.toUpperCase().indexOf(search.toUpperCase()) >= 0;
                };
            }

            $this.createList();
            $this.bindElement();

            $(document).click(function () {
                $this.list.hide();
            });

            $this.list.click(function (event) {
                event.stopPropagation();
            });
        };

        // Push the list in the dom
        $this.createList = function () {
            $this.$el.after($this.list);
        };

        // Bind keyup event
        $this.bindElement = function () {
            $this.$el.bind('keyup', function () {
                $this.list.children("li").remove();
                var element = $this.searchElement($(this).val());

                if (element.length === 0) {
                    $this.list.hide();
                }
                else {
                    element.each(function (key, element) {
                        $this.list.append($('<li></li>').append($(element).clone()));

                        if (key >= $this.options.limit -1) {
                            $this.list.append($('<li><a>...</a></li>'));

                            return false;
                        }
                    });

                    $this.list.show();
                }
            });
        };

        // Search element
        $this.searchElement = function (value) {
            if (value === '') {
                return [];
            }

            var contains = ':contains("' + value + '")';
            var selector = $this.options.datas.replace(/,/g, contains + ', ') + contains;

            return $(selector);
        };

        // Run initializer
        $this.init();
    };

    // Default options
    $.domAutocomplete.defaultOptions = {
        insensitive: false,
        limit:       10,
        datas:       'a'
    };

    $.fn.domAutocomplete = function (options){
        return this.each(function (){
            (new $.domAutocomplete(this, options));
        });
    };
})(jQuery);
