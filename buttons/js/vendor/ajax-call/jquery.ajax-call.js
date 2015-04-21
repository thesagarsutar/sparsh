 /*
  *  Plugin Name : callAjax
  *  Author : Sagar Sutar (sagarsutar.com, thesagarsutar @github, @twitter, @dribbble, @codepen)
  *  Date : 19-OCT-2013 3.31 PM
  *  Documentaion : doc.html
  */

 (function($) {
     $.extend({
         ajaxCall: function(url, input, callbackFunction) {
             var status = {
                 success: 'SUCCESS',
                 failure: 'FAILURE',
                 error: 'ERROR',
                 empty: ''
             }

             var ajaxResult = ajaxResult || '';
             var method = 'POST';

             jQuery.ajax({
                 url: url,
                 type: method,
                 dataType: 'json',
                 data: input,
                 complete: function(xhr, textStatus) {
                     console.log('ajax call completed');
                 },
                 success: function(data, textStatus, xhr) {
                     console.log('ajax call succeed');

                     //if data is JSON
                     if (typeof data == 'object') {
                         ajaxResult = data;
                     } else { //if data is not JSON 

                         switch (data) {
                             case true:
                                 ajaxResult = status.success;
                                 break;
                             case false:
                                 ajaxResult = status.failure;
                                 break;
                             case '':
                                 ajaxResult = status.empty;
                                 break;
                             default:
                                 ajaxResult = 'Returned data is out of plugin Scope';
                         }
                     }
                     callbackFunction(ajaxResult);
                     console.log('returned status : ' + ajaxResult);
                 },
                 error: function(xhr, textStatus, errorThrown) {
                     console.log('ajax call failed : error : ' + errorThrown);
                     callbackFunction(status.error);
                 }
             });
         }
     });
 }(jQuery));
