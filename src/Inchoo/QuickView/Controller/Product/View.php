<?php

namespace Inchoo\QuickView\Controller\Product;

use Magento\Catalog\Controller\Product\View as CatalogView;

/**
 * Class View
 *
 * @package Inchoo\QuickView\Controller\Product
 * @author Tomas Novoselić <tomas@inchoo.net>
 * @copyright Inchoo d.o.o.
 */
class View extends CatalogView
{
    /**
     * Overriden in order to add new layout handle in case product page is loaded in iframe
     *
     * @return \Magento\Framework\Controller\Result\Forward|\Magento\Framework\Controller\Result\Redirect
     */
    public function execute()
    {
        if ($this->getRequest()->getParam("iframe")) {
            $layout = $this->_view->getLayout();
            $layout->getUpdate()->addHandle('quickview_product_view');
        }
        return parent::execute();
    }
}
