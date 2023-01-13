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
            window.open('https://api.cleverinvestor.com/infusionsoft/form/customer-service-communication/?contactId=' + contactId + '&uid=' + userId, '_blank');
        }
    });

    /**
    * Ultimate Coaching
    * End Date Adjustment
    * Pause & Resume Program
    * Active & Graduated Badges
    */


    var currEndDate = '';

    jQuery('#tab_data_custom_Custom_Fields_1').on('mouseover mousemove scroll', function () {
        /*Load Pause & Resume buttons.*/
        if (!jQuery('#pauseUCProg').length) {
            jQuery('#Contact0_CoachingEndDate_data').parent().css({ 'border': '1px solid #5e5e5e', 'vertical-align': 'middle' }).append('<td style="vertical-align:middle; padding-right: 6px"><button id="pauseUCProg" class="cleverAjaxTrigger" type="button" style="min-width: max-content;">Pause Program</button></td><td style="vertical-align:middle; padding-right: 6px"><button id="resumeUCProg" class="cleverAjaxTrigger" type="button" style="min-width: max-content;">Resume Program</button></td>');
            currEndDate = jQuery('#Contact0_CoachingEndDate_date').val();
        }
    });

    
    jQuery('body').on('click', '#Contact0_CoachingEndDate_img', function(){
        currEndDate = jQuery('#Contact0_CoachingEndDate_date').val();
        console.log("calImgClick = " + currEndDate);
    });

    jQuery('body').on('click change', '.cleverAjaxTrigger, #Contact0_CoachingEndDate_date', function (e) {
        const urlParams = new URLSearchParams(window.location.search);
        const param_x = urlParams.get('param_x');
        var contactId = urlParams.get('ID');
        var id = jQuery(this).attr('id');
        var goalName = '';
        switch (id) {
            case 'pauseUCProg':
            case 'resumeUCProg':
                goalName = id;
                break;
            case 'Contact0_CoachingEndDate_date':
                newEndDate = jQuery('#Contact0_CoachingEndDate_date').val();
                if(e.type == 'change' && jQuery(this).val().length == 10  && currEndDate != newEndDate) {
                    console.log(newEndDate + "!=" + currEndDate);
                    goalName = 'EndDateUpdated';
                }
                break;

        }
        console.log("goalName = " + goalName);
        if(goalName != ''){
            jQuery.post("https://api.cleverinvestor.com/infusionsoft/api_goal.php",
                {
                    key: 'KpKl3l5krK1K$VGH5ZzYw6iT',
                    contactId: contactId,
                    integration: "pn120",
                    eventCode: goalName
                },
                function (data, status) {
                    console.log("Data: " + data + "\nStatus: " + status);
                    if(data[0].goalId == 371) {
                        //jQuery('#ContactForm').submit();
                        console.log("I would like to submit");
                    }
                }
            );
        }
    });
});