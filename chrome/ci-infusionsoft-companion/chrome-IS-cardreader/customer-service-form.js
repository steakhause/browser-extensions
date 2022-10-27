jQuery(document).ready(function(){
    jQuery('#FormId_select').prepend('<option val="cscf">Customer Service Utilities</option>');

    jQuery('#FormId_select').change(function(){
        if( jQuery(this).val() == 'Customer Service Utilities') {
            jQuery('body').prepend(' <iframe src="https://api.cleverinvestor.com/dealautomator/utility/" height="1080" width="1920" style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; height: 100%; width: 100%; z-index: 51;" title="Iframe Test"></iframe> ');
        }
    });
});