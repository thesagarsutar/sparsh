var notificationTimer;

var setSettingPanelHeight = function() {
  var $settingPanel = $('#settings');
  var offset = $('header').height();
  var viewPortHeight = $(window).innerHeight();
  var paddingTopBottom = 0;
  $settingPanel.height((viewPortHeight - 2 * offset - paddingTopBottom));
};

(function() {
  setSettingPanelHeight();
})();

var buttonStaticStyle = {
  outline: 'none',
  cursor: 'pointer',
  fontFamily: 'Open Sans',
  transitionDuration: '200ms',
  getStaticButtonStyle: function() {
    var CSS = "";
    CSS += '\n\toutline : ' + this.outline + ';';
    CSS += '\n\tcursor : ' + this.cursor + ';';
    CSS += '\n\tfont-family : "' + this.getFontFamily() + '";';
    CSS += browserPrefixes.getTransitionDuration(this.transitionDuration);
    return CSS;
  },
  getFontFamily:function(){
    return ( buttonCSS.fontFamily || this.fontFamily);
  }

};

/* Call only for change event of background colors and button type*/
function setButtonStateStyles() {
  var hoverState = buttonStateCSS.getHoverState();
  var activeState = buttonStateCSS.getActiveState();
  var disabledState = buttonStateCSS.getDisabledState();
  $('button.hovered, button.active').css(hoverState.propertyName, hoverState.propertyValue);
  $('button.active').css(activeState.propertyName, activeState.propertyValue);
  $('button:disabled').css({
    'opacity': disabledState.opacity,
    'cursor': disabledState.cursor
  });
};

$button = $('#output button');
var defaultTextShadow = '0 -1px 1px rgb(192, 192, 192)';
var buttonCSS = {
  /*
   * set button type
   */
  buttonType: $('input[name =button-type]:checked').val(),
  topColor: '#008df2',
  bottomColor: '#0075d4',
  borderColor: '#002330',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '5px',
  buttonText: 'Sample Button',
  buttonIcon: '',
  textColor: '#ffffff',
  fontSize: '26px',
  fontStyle: 'normal',
  fontFamily: '',
  fontWeight: '',
  textShadow: defaultTextShadow,
  boxShadow: 'inset 0 0 1px 0 #fff, 0px 0px 3px 0px #26292b, inset 0px -1px 1px 0px #00589f',
  padding: '9px 22px',
  setCSS: function($element) {
    if (this.buttonType === '3D') {
      $element.css({
        'background-color': '',
        'box-shadow': this.boxShadow,
        'backgroundImage': 'linear-gradient(to bottom, ' + this.topColor + ' 1%,' + this.bottomColor + ' 100%)'
      });
    } else if (this.buttonType === 'FLAT') {
      $element.css({
        'background-color': this.topColor,
        'box-shadow': '',
        'backgroundImage': ''
      });
    }
    $element.css({
      'border-color': this.borderColor,
      'border-style': this.borderStyle,
      'border-width': this.borderWidth,
      'border-radius': this.borderRadius,
      'color': this.textColor,
      'font-size': this.fontSize,
      'font-style': this.fontStyle,
      'font-weight': this.fontWeight,
      'text-shadow': this.textShadow,
      'padding': this.padding
    });
    setButtonStateStyles();
  }
};

var buttonStateCSS = {
  hoverState: {
    propertyName: 'background-color',
    propertyValue: ''
  },
  activeState: {
    propertyName: 'box-shadow',
    propertyValue: ''
  },
  disabledState: {
    opacity: '0.5',
    cursor: 'no-drop'
  },
  getHoverState: function() {
    return this.hoverState;
  },
  setHoverState: function(hoverState) {
    if (buttonCSS.buttonType === 'FLAT') {
      this.hoverState.propertyName = 'background-color';
      this.hoverState.propertyValue = hoverState;
    } else if (buttonCSS.buttonType === '3D') {
      hoverStateBottom = colorLuminance(buttonCSS.bottomColor, -0.15);
      this.hoverState.propertyName = 'backgroundImage';
      this.hoverState.propertyValue = 'linear-gradient(to bottom, ' + hoverState + ' 1%,' + hoverStateBottom + ' 100%)';
    }
  },
  getHoverStateText: function() {
    if (buttonCSS.buttonType === 'FLAT') {
      return '\n\t' + this.hoverState.propertyName + ' : ' + this.hoverState.propertyValue + ';';
    } else {
      var propertyValue = this.hoverState.propertyValue;
      var hashIndex = propertyValue.indexOf('#');
      var hashIndexLast = propertyValue.lastIndexOf('#');
      var colorTop = propertyValue.substring(hashIndex, hashIndex + 7);
      var colorBottom = propertyValue.substring(hashIndexLast, hashIndexLast + 7);
      return browserPrefixes.getGradients(colorTop, colorBottom);
    }

  },
  getActiveState: function() {
    return this.activeState;
  },
  setActiveState: function(activeState) {
    this.activeState.propertyName = 'box-shadow';
    this.activeState.propertyValue = 'inset 0 0 1px 0 #acacac,inset 0 2px 6px 0 ' + activeState;
  },
  getActiveStateText: function() {
    var shadows = this.activeState.propertyValue.split(',');
    var dataToBeReturn = "";
    for (var i = 0; i < shadows.length; i++) {
      var shadowArray = shadows[i].trim().split(" ");
      dataToBeReturn += browserPrefixes.getBoxShadow(shadowArray[1], shadowArray[2], shadowArray[3], shadowArray[4], shadowArray[5], shadowArray[0]);
    };
    var shadows = dataToBeReturn.split('\n\t');
    dataToBeReturn = "";
    for (var j = 1; j <= (shadows.length - 1) / 2; j++) {
      dataToBeReturn += '\n\t' + shadows[j].replace(';', ', ') + shadows[j + 3].split(':')[1];
    };
    return dataToBeReturn;
  },
  getDisabledState: function() {
    return this.disabledState;
  },
  setDisabledState: function(disabledState) {
    this.disabledState = disabledState;
  },
  getDisabledStateText: function() {
    return '\n\t' + 'opacity : ' + this.disabledState.opacity + ';' + '\n\t' + 'cursor : ' + this.disabledState.cursor + ';';
  }
};

jQuery(document).ready(function($) {
  $(window).resize(function(event) {
    /* Act on the event */
    setSettingPanelHeight();
  });
  var $outPutButton = $('#output-button button');
  $('.hovered').off('hover mousedown mouseup click');

  /*initialize all CSS*/
  buttonCSS.setCSS($button);
  buttonStateCSS.setActiveState(colorLuminance(buttonCSS.topColor, -0.6));
  buttonStateCSS.setHoverState(colorLuminance(buttonCSS.topColor, -0.15));

  $('input[name=slider-font-size]').change(function() {
    var newFontSize = $(this).val() + 'px';
    var paddingHR = Math.ceil($(this).val() / 1.2) + 'px';
    var paddingVR = Math.ceil($(this).val() / 3) + 'px';
    var newPadding = paddingVR + ' ' + paddingHR;
    // console.log('new font size : ' + newFontSize);
    // console.log('new padding : ' + newPadding);
    buttonCSS.padding = newPadding;
    buttonCSS.fontSize = newFontSize;
    buttonCSS.setCSS($button);
  });

  $('input[name=button-text]').keyup(function() {
    var newButtonText = $(this).val();
    //console.log('new button text : ' + newButtonText);
    buttonCSS.buttonText = newButtonText;
    $button.children('.text').text(newButtonText);
  });

  $('input[name=slider-border-radius]').change(function() {
    var newBorderRadius = $(this).val() + 'px';
    // console.log('new border radius : ' + newBorderRadius);
    buttonCSS.borderRadius = newBorderRadius;
    buttonCSS.setCSS($button);
  });

  $('input[name=slider-border-width]').change(function() {
    var newBorderWidth = $(this).val() + 'px';
    // console.log('new border width : ' + newBorderWidth);
    buttonCSS.borderWidth = newBorderWidth;
    // buttonCSS.borderColor = $('#picker-border').css('border-color');
    buttonCSS.setCSS($button);
  });

  var $fontCheckBox = $('#checkbox-font');
  if (!$fontCheckBox.is(':checked')) {
    $fontCheckBox.parent().next().hide();
  }

  $fontCheckBox.change(function(event) {
    if ($fontCheckBox.is(':checked')) {
      $fontCheckBox.parent().next().fadeIn(200);
    } else {
      $fontCheckBox.parent().next().fadeOut(200);
      $button.css('font-family', '');
      buttonCSS.fontFamily = '';
    }
  });

  $('input[name=font-style]').change(function() {
    var fontStyle = Number($(this).val());
    // console.log('font-style : ' + fontStyle);
    buttonCSS.fontStyle = '';
    buttonCSS.fontWeight = '';

    switch (fontStyle) {
      case 1:
        buttonCSS.fontStyle = 'normal';
        break;
      case 2:
        buttonCSS.fontWeight = 'bold';
        break;
      case 3:
        buttonCSS.fontStyle = 'italic';
        break;
    }

    buttonCSS.setCSS($button);
  });

  $('input[name=button-type]').change(function() {
    buttonCSS.buttonType = $(this).val();
    //console.log('Button type : ' + buttonCSS.buttonType);
    var $grd1 = $('#grd-1'),
      $grd2 = $('#grd-2');
    switch (buttonCSS.buttonType) {
      case '3D':
        var textGRD1 = "Top Gradient";
        var textGRD2 = "Bottom Gradient";
        $grd1.children('label').text(textGRD1);
        $grd2.fadeIn().children('label').text(textGRD2);
        break;
      case 'FLAT':
        var textGRD1 = "Button Background";
        $grd2.fadeOut();
        $grd1.children('label').text(textGRD1);
        break;
    }

    buttonStateCSS.setActiveState(colorLuminance(buttonCSS.topColor, -0.6));
    buttonStateCSS.setHoverState(colorLuminance(buttonCSS.topColor, -0.15));
    buttonCSS.setCSS($button);
  });
  $('input[name=button-type]').change();

  $('input[name=checkbox-text-shadow]').change(function() {
    var isChecked = $(this).is(':checked');

    if (isChecked) {
      buttonCSS.textShadow = defaultTextShadow;
      //console.log('added text-shadow');
    } else {
      buttonCSS.textShadow = '';
      //console.log('removed text-shadow');
    }
    buttonCSS.setCSS($button);
  });

  $('#picker-text').colpick({
    layout: 'hex',
    submit: 0,
    colorScheme: 'dark',
    color: buttonCSS.textColor.substring(1, buttonCSS.textColor.length),
    onChange: function(hsb, hex, rgb, fromSetColor) {
      if (!fromSetColor) {
        var hexColor = '#' + hex;
        $('#picker-text').val(hexColor).css('border-color', hexColor);
        buttonCSS.textColor = hexColor;
        buttonCSS.setCSS($button);
      }
    }
  });

  $('#picker-bg-1').colpick({
    layout: 'hex',
    submit: 0,
    colorScheme: 'dark',
    color: buttonCSS.topColor.substring(1, buttonCSS.topColor.length),
    onChange: function(hsb, hex, rgb, fromSetColor) {
      if (!fromSetColor) {
        var hexColor = '#' + hex;
        buttonCSS.topColor = hexColor;
        var pb2 = $('#picker-bg-2');
        var borderColor = pb2.val();
        buttonCSS.bottomColor = borderColor;
        buttonStateCSS.setActiveState(colorLuminance(buttonCSS.topColor, -0.6));
        buttonStateCSS.setHoverState(colorLuminance(buttonCSS.topColor, -0.15));
        $('#picker-bg-1').val(hexColor).css('border-color', hexColor);
        buttonCSS.setCSS($button);
      }
    }
  });

  $('#picker-bg-2').colpick({
    layout: 'hex',
    submit: 0,
    colorScheme: 'dark',
    color: buttonCSS.bottomColor.substring(1, buttonCSS.bottomColor.length),
    onChange: function(hsb, hex, rgb, fromSetColor) {
      if (!fromSetColor) {
        var hexColor = '#' + hex;
        buttonCSS.bottomColor = hexColor;
        buttonCSS.topColor = $('#picker-bg-1').val();
        buttonCSS.boxShadow = 'inset 0 0 1px 0 #fff, 0 0 3px 0 ' + colorLuminance(rgb2hex($('body').css('background-color')), -0.4) + ', inset 0 -1px 1px 0 ' + colorLuminance(buttonCSS.bottomColor, -0.25);
        buttonCSS.setCSS($button);
        $('#picker-bg-2').val(hexColor).css('border-color', buttonCSS.bottomColor);
        //console.log('box-shadow : ' + boxShadow);
        buttonStateCSS.setActiveState(colorLuminance(buttonCSS.topColor, -0.6));
        buttonStateCSS.setHoverState(colorLuminance(buttonCSS.topColor, -0.15));
        buttonCSS.setCSS($button);
      }
    }
  });

  $('#picker-border').colpick({
    layout: 'hex',
    submit: 0,
    colorScheme: 'dark',
    color: buttonCSS.borderColor.substring(1, buttonCSS.borderColor.length),
    onChange: function(hsb, hex, rgb, fromSetColor) {
      if (!fromSetColor) {
        var hexColor = '#' + hex;
        $('#picker-border').val(hexColor).css('border-color', hexColor);
        buttonCSS.borderColor = hexColor;
        buttonCSS.setCSS($button);
      }
    }
  });

  $('#picker-body-color').colpick({
    layout: 'hex',
    submit: 0,
    colorScheme: 'dark',
    color: '404447',
    onChange: function(hsb, hex, rgb, fromSetColor) {
      if (!fromSetColor) {
        var hexColor = '#' + hex;
        $('body').css('background', hexColor);
      }
    }
  });

  var $buttonIcon = $('#selected-icon');
  var $iconHolder = $('#icon-holder');

  $buttonIcon.click(function(event) {
    var position = $buttonIcon.offset();
    $iconHolder.css({
      'top': (position.top + $buttonIcon.height() + 1) + 'px',
      'left': (position.left - $iconHolder.width() / 2 + $buttonIcon.width() / 2) + 'px'
    });
    openPopup($iconHolder, 'transparent');
  });

  $('.popup-bg, .modal-close').click(function(event) {
    closePopup();
  });

  $(document).keydown(function(event) {
    if (event.which == 27) {
      closePopup();
    }
  });

  function closePopup() {
    $('.opened').fadeOut('fast', function() {

    }).removeClass('scale');
  };

  function openPopup(popupName, popupBgColor) {
    popupName.fadeIn().addClass('opened scale');
    $('.popup-bg').css({
      'background': popupBgColor
    }).fadeIn().addClass('opened');
  };

  $('#icon-holder td').click(function(event) {
    var $seletedIcon = '<span class="icon ' + $(this).children('span').attr('class') + '"><span>';
    buttonCSS.buttonIcon = $(this).children('span').attr('class');
    $buttonIcon.html($seletedIcon);
    if ($button.children('.icon').length > 0) {
      $button.children('.icon').remove();
    }
    $button.prepend($seletedIcon);
    $('.remove-icon').fadeIn();
  });

  $('.remove-icon').click(function(event) {
    buttonCSS.buttonIcon = '';
    $('.icon').remove();
    $(this).fadeOut('fast', function() {

    });
  });

  $outPutButton.hover(function() {
    var hoverState = buttonStateCSS.getHoverState();
    $(this).css(hoverState.propertyName, hoverState.propertyValue);
  }, function() {
    buttonCSS.setCSS($outPutButton);
  });

  $outPutButton.mousedown(function(event) {
    var activeState = buttonStateCSS.getActiveState();
    $(this).css(activeState.propertyName, activeState.propertyValue);
  });

  $outPutButton.mouseup(function(event) {
    var activeState = buttonStateCSS.getActiveState();
    $(this).css(activeState.propertyName, "");
    if (buttonCSS.buttonType === '3D') {
      $(this).css('boxShadow', buttonCSS.boxShadow);
    }
  });

  /*--------- output program ------------*/

  /*----------------------------------------------*/
  /*                Download Code                 */
  /*----------------------------------------------*/

  function getButtonStyleForOutput()  {
    var googleWebFontURL = '/*link to google web font api*/\n' + getGoogleWebFontURL() + '\n\n';
    var buttonCSS = 'button {' + buttonStaticStyle.getStaticButtonStyle() + getCustomCSSFromPage() + '\n}';
    var hoverCSS = '\nbutton:hover {' + buttonStateCSS.getHoverStateText() + '\n}';
    var activeCSS = '\nbutton:active {' + buttonStateCSS.getActiveStateText() + '\n}';
    var disabledCSS = '\nbutton:disabled {' + buttonStateCSS.getDisabledStateText() + '\n}';
    // var customCSS = "\nbutton {" + getCustomCSSFromPage() + '\n}';
    //browserPrefixes.getGradients('#ccc', '#ddd') +  browserPrefixes.getBoxShadow('1px', '1px', '1px', '1px', '#ccc') + browserPrefixes.getBorderRadius('3px');
    var CSS = googleWebFontURL + buttonCSS + hoverCSS + activeCSS + disabledCSS; 
    // + customCSS;
    return CSS.replace(/\t+/g, "   ");
  }

  $("#download-code").click(function(event)   {
    $('[name=bodyBackgroundColor]').val($('body').css('background-color'));
    $('[name=markup]').val(copyMarkup($outPutButton));
    $('[name=style]').val(getButtonStyleForOutput());
    $('[name=generate-file]').submit();
    event.preventDefault();
  });


  /*----------------------------------------------*/
  /*                Copy Code                     */
  /*----------------------------------------------*/
  $('#copy-code').click(function(event) {
    event.preventDefault();
    $modal = $('.modal');
    $('input[name=html]').val(copyMarkup($outPutButton));
    $('#ouput-css').val(getButtonStyleForOutput());
    //$('input[name=google-web-font]').val(getGoogleWebFontURL());
    openPopup($modal, 'rgba(0,0,0,0.6)');
  });

  function getGoogleWebFontURL() {
    return '@import url(http://fonts.googleapis.com/css?family=' + window.encodeURIComponent(buttonStaticStyle.getFontFamily()) + ');';
  }

  function copyMarkup($element) {
    return $element.clone(false, false).removeAttr('style').get(0).outerHTML.replace(/\s+/g, " ");
  }

  function getCustomCSSFromPage() {
    var border = '\n\t' + 'border : ' + buttonCSS.borderWidth + ' ' + buttonCSS.borderColor + ' ' + buttonCSS.borderStyle + ';';
    var borderRadius = browserPrefixes.getBorderRadius(buttonCSS.borderRadius);
    var color = '\n\t' + 'color : ' + buttonCSS.textColor + ';';
    var fontSize = '\n\t' + 'font-size : ' + buttonCSS.fontSize + ';';
    var fontStyle = '\n\t' + 'font-style : ' + buttonCSS.fontStyle + ';';
    var textShadow = '';
    if (buttonCSS.textShadow != '') {
      textShadow = '\n\t' + 'text-shadow : ' + buttonCSS.textShadow + ';';
    }
    var padding = '\n\t' + 'padding : ' + buttonCSS.padding + ';';

    var boxShadow = '';
    if (buttonCSS.buttonType === '3D') {
      var shadows = buttonCSS.boxShadow.split(',');
      for (var i = 0; i < shadows.length; i++) {
        var shadowArray = shadows[i].trim().split(" ");
        if (i == 1) { //no inset for shadow at this index
          boxShadow += browserPrefixes.getBoxShadow(shadowArray[0], shadowArray[1], shadowArray[2], shadowArray[3], shadowArray[4], '');
        } else {
          boxShadow += browserPrefixes.getBoxShadow(shadowArray[1], shadowArray[2], shadowArray[3], shadowArray[4], shadowArray[5], shadowArray[0]);
        }

      };
      var shadows = boxShadow.split('\n\t');
      boxShadow = "";
      for (var j = 1; j <= (shadows.length - 1) / 3; j++) {
        boxShadow += '\n\t' + shadows[j].replace(';', ', ') + shadows[j + 3].split(':')[1].replace(';', ', ') + shadows[j + 6].split(':')[1];
      };
    }

    var background = "";
    if (buttonCSS.buttonType === '3D') {
      background = browserPrefixes.getGradients(buttonCSS.topColor, buttonCSS.bottomColor);
    } else {
      background = '\n\t' + 'background-color : ' + buttonCSS.topColor + ';';
    }


    return (border + borderRadius + color + fontSize + fontStyle + textShadow + padding + boxShadow + background);
  };

  var $selectFont = $('#select-font');
  $.getJSON('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBNnlypLKG0oIqx7htODaa2rB5aB6SMPOA', function(json, textStatus) {
    console.log('fonts', json);
    setGoogleFonts(json);
  });
  var $elementAjaxLoader = $('#ajax-indicator'); 

  function setGoogleFonts(fonts) {
    for (var i = 0; i < fonts.items.length; i++) {
      var fontFamily = fonts.items[i].family;
      $selectFont.append($('<option></option>').attr({
        "value": fontFamily
      }).text(fontFamily));
    };
  };

  $selectFont.change(function(event) {
    var font = $selectFont.val();

    WebFont.load({
      google: {
        families: [font]
      },

      fontloading: function(familyName, fvd) {
        $elementAjaxLoader.text('loading');
        showNotification($elementAjaxLoader, "Loading font ...");
      },

      fontactive: function(familyName, fvd) {
        setNotificationMessage($elementAjaxLoader, "Font Loaded");
        notificationTimer =  window.setTimeout(function(){
          hideNotification($elementAjaxLoader);
        }, 2000);
        $button.css('font-family', font.toString());
        buttonCSS.fontFamily = font;
      },

      fontinactive: function(familyName, fvd) {
        setNotificationMessage($elementAjaxLoader, "Unable to load font : " + font);
        notificationTimer =  window.setTimeout(function(){
          hideNotification($elementAjaxLoader);
        }, 2000);

        // set default font if unable to download font
        $button.css('font-family', buttonStaticStyle.fontFamily.toString());
        buttonCSS.fontFamily = '';
      }
    });

  });

  $('.popup-close').click(function(event) {
    $('#feedback').hide();
  });
});

function addHex(hex1, hex2) {
  if (hex1.search('rgb') != -1) {
    hex1 = rgb2hex(hex1);
  } else if (hex1.indexOf('#') != -1) {
    hex1 = hex1.substring(1, hex1.length);
  }
  if (hex2.search('rgb') != -1) {
    hex2 = rgb2hex(hex2);
  } else if (hex2.indexOf('#') != -1) {
    hex2 = hex2.substring(1, hex2.length);
  }
  var hexStr = (parseInt(hex1, 16) + parseInt(hex2, 16)).toString(16);
  while (hexStr.length < 6) {
    hexStr = '0' + hexStr;
  } // Zero pad.
  return '#' + hexStr;
};

function subHex(hex1, hex2) {
  if (hex1.search('rgb') != -1) {
    hex1 = rgb2hex(hex1);
  } else if (hex1.indexOf('#') != -1) {
    hex1 = hex1.substring(1, hex1.length);
  }
  if (hex2.search('rgb') != -1) {
    hex2 = rgb2hex(hex2);
  } else if (hex2.indexOf('#') != -1) {
    hex2 = hex2.substring(1, hex2.length);
  }
  var hexStr = (parseInt(hex1, 16) - parseInt(hex2, 16)).toString(16);
  while (hexStr.length < 6) {
    hexStr = '0' + hexStr;
  } // Zero pad.
  return '#' + hexStr;
};

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
};

function colorLuminance(hex, lum) {

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  var rgb = "#",
    c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
};

/**
  * ajax notification
  *
  */
  function showNotification($element, message) {
    window.clearTimeout(notificationTimer);
    setNotificationMessage($element, message).css({
      'visibility':'visible'
    })
  };

  function hideNotification($element) {
    $element.css({
      'visibility':'hidden'
    })
  };

  function setNotificationMessage($element, message) {
    return $element.text(message);
  }


/*---------------------------------*/
/*          FEEDBACK               */
/*---------------------------------*/
$('[name=usefulness-score]').change(function(){
  $('.score').text($(this).val());
});

$('.feedback-form-header').click(function(event) {
  $feedbackForm = $('.feedback-form-wrapper');
  $feedbackForm.hasClass('active-popup') ? $feedbackForm.removeClass('active-popup') : $feedbackForm.addClass('active-popup');
  $arrow = $('.arrow');
  $arrow.hasClass('icon-angle-up') ? $arrow.removeClass('icon-angle-up').addClass('icon-angle-down') : $arrow.removeClass('icon-angle-down').addClass('icon-angle-up');
});

$('#feedback-submit').click(function(event) {
    var $form = $('#feedback-form');
    $.ajax({
      type:'POST',
      url:'sendFeedback.php',
      data:$('#feedback-form').serialize(),
      success:function(returnedData) {
        if (returnedData == 'true') {
          $form.html("Thanks for your feedback :)");
        } else if (returnedData == 'false') {
          $form.html("Can't send your feedback :(");
        }
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log('ajax call failed : error : ' + errorThrown);
      }
    });
  event.preventDefault(event);
});