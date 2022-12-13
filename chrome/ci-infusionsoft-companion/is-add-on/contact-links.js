jQuery(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const param_x = urlParams.get('param_x');
    var contactId = urlParams.get('ID');
    var fullName = jQuery('.page-header-user h2').html();

    var linkElement = '<li class="tab-blur" id="tab_main" nowrap="nowrap"><a class="tab-blur" id="tab_link_main" href="https://api.cleverinvestor.com/dealautomator/utility/?infusion_id=' + contactId + '" target="_blank">DA Utility</a></li>';
    linkElement += '<li class="tab-blur" id="tab_main" nowrap="nowrap"><a class="tab-blur" id="tab_link_main" href="https://api.cleverinvestor.com/infusionsoft/dup_finder.php?contactId=' + contactId + '" target="_blank">Dup Check</a></li>';
    linkElement += '<li class="tab-blur" id="tab_main" nowrap="nowrap"><a class="tab-blur" id="tab_link_main" href="https://api.cleverinvestor.com/registration/ioe/?contactId=' + contactId + '&email=' + fullName + '" target="_blank">Registration</a></li>';

    jQuery('#pagecontent .tabs').first().append(linkElement);
    jQuery('#FormId_select').prepend('<option val="cscf">Customer Service Utilities</option>');

    jQuery('#FormId_select').change(function () {
        var script = jQuery('#grid_div_GridFileBoxContact script').html();
        var start = script.indexOf('id=') + 3;
        var end = script.indexOf('&delete=');
        var userId = script.substr(start, end - start);
        if (jQuery(this).val() == 'Customer Service Utilities') {
            window.open('https://api.cleverinvestor.com/infusionsoft/form/customer-service-communication/?infusion_id=' + contactId + '&uid=' + userId, '_blank');
        }
    });
});