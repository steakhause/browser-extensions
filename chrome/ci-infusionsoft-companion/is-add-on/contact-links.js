jQuery(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const param_x = urlParams.get('param_x');
    var contactId = urlParams.get('ID');
    var fullName = jQuery('.page-header-user h2').html().replace("<div>", "").replace("</div>", "");

    var linkElement = '<li class="tab-blur" id="tab_main" nowrap="nowrap"><a class="tab-blur" id="tab_link_main" href="https://nexus.cleverinvestor.com/utilities/deal-automator/?infusion_id=' + contactId + '" target="_blank">DA Utility</a></li>';
    linkElement += '<li class="tab-blur" id="tab_main" nowrap="nowrap"><a class="tab-blur" id="tab_link_main" href="https://nexus.cleverinvestor.com/utilities/infusionsoft-duplicate-contact-search/?contactId=' + contactId + '" target="_blank">Dup Check</a></li>';

    jQuery('#pagecontent .tabs').first().append(linkElement);
    jQuery('#FormId_select').prepend('<option val="cscf">Customer Service Utilities</option>');

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
                    goalName = 'EndDateUpdated';
                }
                break;

        }
        if(goalName != ''){
            jQuery.post("https://nexus.cleverinvestor.com/infusionsoft/api_goal.php",
                {
                    key: 'KpKl3l5krK1K$VGH5ZzYw6iT',
                    contactId: contactId,
                    integration: "pn120",
                    eventCode: goalName
                },
                function (data, status) {
                    data = JSON.parse(data);
                    if(data[0].success) {
                        if(data[0].goalId == 371) {
                            jQuery('#ContactForm').submit();
                        } else {
                            goalName = '#' + goalName;
                            jQuery('body').animate({'background-color':'#90bf64 !important'}, 100, function(){jQuery('body').animate({'background-color':'#ffffff !important'}, 'slow', 'linear')});
                            var response = goalName == '#resumeUCProg' ? 'The program has been resumed.' : 'The program has been paused.';
                            jQuery(goalName).closest('tr').after('<tr class="apiAnnouncement"><td>' + response + '</td></tr>');
                            jQuery('.apiAnnouncement').slideUp(3000);
                        }
                    }
                }
            );
        }
    });
});