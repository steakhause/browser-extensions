jQuery(document).ready(function () {
    var l = jQuery('#existing-search-name a').attr('href');
    var p = l.indexOf('ID=',l) + 3;
    var contactId = l.substring(p, l.length);

    var linkElement = '<input type="button" value="Update IOE Sheet" class="inf-button" onclick="window.open(\'https://api.cleverinvestor.com/infusionsoft/api_goal.php?contactId=' + contactId + '&integration=IOE&eventCode=Nov2022Sheet\', \'IOE Sheet\', \'toolbars=0,width=300,height=300,left=200,top=200,scrollbars=1,resizable=1\')">';

    jQuery('#Refund_Payment').parent().append(linkElement);
});