define([
    'jquery',
    'Magento_Ui/js/modal/modal',
    'mage/loader',
    'Magento_Customer/js/customer-data'
], function ($, modal, loader, customerData) {
    'use strict';

    return function(config, node) {

        var product_id = jQuery(node).data('id');
        var product_url = jQuery(node).data('url');

        var options = {
            type: 'popup',
            responsive: true,
            innerScroll: false,
            title: $.mage.__('Quick View'),
            buttons: [{
                text: $.mage.__('Close'),
                class: 'close-modal',
                click: function () {
                    this.closeModal();
                }
            }]
        };

        var popup = modal(options, $('#quickViewContainer' + product_id));

        $("#quickViewButton" + product_id).on("click", function () {
            openQuickViewModal();
        });

        var openQuickViewModal = function () {
            var modalContainer = $("#quickViewContainer" + product_id);
            modalContainer.html(createIframe());

            var iframe_selector = "#iFrame" + product_id;

            $(iframe_selector).on("load", function () {
                modalContainer.addClass("product-quickview");
                modalContainer.modal('openModal');
                observeAddToCart(iframe_selector);
            });
        };

        var observeAddToCart = function (iframe_selector) {
            var doc = $(iframe_selector)[0].contentWindow.document;

            $(doc).on('submit', "#product_addtocart_form", function (e) {
                e.preventDefault();

                $('[data-block="minicart"]').trigger('contentLoading');
                $('body').trigger('processStart');
                $(".close-modal").trigger("click");

                $.ajax({
                    data: $(this).serialize(),
                    type: $(this).attr('method'),
                    url: $(this).attr('action'),
                    success: function(response) {
                        
$('[data-block="minicart"]').find('[data-role="dropdownDialog"]').dropdownDialog("open");
                    },
                    complete: function(request, status) {
                        $('body').trigger('processStop');
                    }
                });

            });
        };

        var createIframe = function () {
            return $('<iframe />', {
                id: 'iFrame' + product_id,
                src: product_url + "?iframe=1"
            });
        }
    };
});
