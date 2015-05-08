/* Bootstrap contextmenu
 * 
 * @package     bootstrap-contextmenu
 * @version     1.0
 * @author      Jochem Stoel
 * @url         http://jochemstoel.github.io/
 * @license     The MIT License (MIT)
 */

$.fn.contextmenu = function($target, $callback) {

    function getMenuPosition($mouse, $direction, $scrollDir) {
        $win = $(window)[$direction]();
        $scroll = $(window)[$scrollDir]();
        $menu = $($target)[$direction]();
        $position = $mouse + $scroll;
                            
        if ($mouse + $menu > $win && $menu < $mouse) {
            $position -= $menu;
        }
                
        return $position;
    }

    $(this).on("contextmenu", function ($e) {
        if ($e.ctrlKey) return;  

        $($target)
        .data("invokedOn", $($e.target))
        .show()
        .css({
            position: "absolute",
            left: getMenuPosition($e.clientX, 'width', 'scrollLeft'),
            top: getMenuPosition($e.clientY, 'height', 'scrollTop')
        })
        .off('click')
        .on('click', function ($e) {
            $(this).hide();
                   
            var $invokedOn = $(this).data("invokedOn");
            var $selectedMenu = $($e.target);
                            
            $callback.call(this, $invokedOn, $selectedMenu);
        });
                    
        return false;
    });

    $(document).click(function () {
        $($target).hide();
    });
};