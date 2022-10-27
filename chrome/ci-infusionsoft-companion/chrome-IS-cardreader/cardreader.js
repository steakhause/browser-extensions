function GetCardType(number) {
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard 
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "MasterCard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "American Express";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";
    return "";
}
jQuery('body').on('click', '#activate', function () {
    jQuery('#card-reader-input').val(null);
    jQuery('#content').css('border', '4px solid green');
    jQuery('#activate').remove();
    jQuery('#cardNumber').val(null);
    jQuery('#cardType').val(null);
    jQuery('#expirationYear').val(null);
    jQuery('#expirationMonth').val(null);
    jQuery('#card-reader-input').focus();
    clearTimeout(timer);
    timer = null;
});

var timer = null;
$('body').on('keydown', '#card-reader-input', function () {
    clearTimeout(timer);
    timer = setTimeout(doneTyping, 700)
});

function doneTyping() {
    console.log("Done Typing!");
    jQuery('input[name="cardNumber"]').focus();
    jQuery('#verificationCode').focus();
}



//document.body.style.border = "4px solid green";
jQuery('#content').css('border', '4px solid green');
jQuery('#creditCardForm').prepend('<textarea autofocus id="card-reader-input" rows="1" cols="1" style="border:none; resize:none; overflow:hidden; color:white;"></textarea>');
jQuery('#card-reader-input').focus();
jQuery('#card-reader-input').focusout(function () {
    jQuery('#content').css('border', '2px solid yellow');
    jQuery('#creditCardForm').prepend('<input class="inf-button btn primary" id="activate" type="button" value="Activate Reader" style="display:block; position:absolute">');
    var fullCardInfo = jQuery(this).val();
    let cardNumber = fullCardInfo.substring(2, fullCardInfo.indexOf('^'));
    jQuery('#cardNumber').val(cardNumber);
    jQuery('#cardNumber').focus();
    let expirationYear = "20" + fullCardInfo.substring(fullCardInfo.indexOf("=") + 1, fullCardInfo.indexOf("=") + 3);
    jQuery('#expirationYear').val(expirationYear);
    let expirationMonth = fullCardInfo.substring(fullCardInfo.indexOf("=") + 3, fullCardInfo.indexOf("=") + 5);
    jQuery('#expirationMonth').val(expirationMonth);
    jQuery('#expirationMonth').focus();
    let cardType = GetCardType(cardNumber);
    jQuery('#cardType').focus();
    jQuery('#cardType').val(cardType);
    jQuery('#useWithInfusionsoftPayments').prop('checked', 'true');
    jQuery('#billCountry').val("United States");
    let nameOnCard = fullCardInfo.split('^');
    let fullName = nameOnCard[1].split('/');
    jQuery('#nameOnCard').val(fullName[1].replace(/\s/g, '') + " " + fullName[0].replace(/\s/g, ''))
    jQuery('#verificationCode').focus();

});