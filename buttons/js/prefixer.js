String.prototype.replaceAt = function(index, string) {
  var leftString = this.substr(0, index);
  leftString += string;
  var rightString = this.substr(index + 1, this.length);
  return leftString + rightString;
}

var browserPrefixes = {
  borderRadius: ['webkit', 'moz'],
  boxShadow: ['webkit', 'moz'],
  transition: ['webkit', 'moz'],
  gradient: {
    /*  Old browsers */
    oldBrowser: '?; /*  Old browsers */',

    /* FF3.6+ */
    mozGrad: '-moz-linear-gradient(top, ? 1%, ? 100%); /* FF3.6+ */',

    /* Chrome,Safari4+ */
    webkitGradOld: '-webkit-gradient(linear, left top, left bottom, color-stop(1%, ?), color-stop(100%, ?)); /* Chrome,Safari4+ */',

    /* Chrome10+,Safari5.1+ */
    webkitGradNew: '-webkit-linear-gradient(top, ? 1%, ? 100%); /* Chrome10+,Safari5.1+ */',

    /* Opera 11.10+ */
    operaGrad: '-o-linear-gradient(top, ? 1%, ? 100%); /* Opera 11.10+ */',

    /* IE10+ */
    msGradNew: '-ms-linear-gradient(top, ? 1%, ? 100%); /* IE10+ */',

    /* W3C */
    gradient: 'linear-gradient(to bottom, ? 1%, ? 100%); /* W3C */',

    /* IE6-9 */
    msGradOld: "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='?', endColorstr='?',GradientType=0 ); /* IE6-9 */"
  },
  getBorderRadius: function(radius) {
    var crossBrowserBorderRadius = "";
    for (var i = 0, length = this.borderRadius.length; i < length; ++i) {
      crossBrowserBorderRadius += '\n\t-' + this.borderRadius[i] + '-' + 'border-radius : ' + radius + ';';
    }
    crossBrowserBorderRadius += '\n\t' + 'border-radius : ' + radius + ';';
    return crossBrowserBorderRadius;
  },
  getBoxShadow: function(x, y, blur, spread, color, inset) {
    var crossBrowserBoxShadow = "";
    for (var i = 0, length = this.boxShadow.length; i < length; ++i) {
      crossBrowserBoxShadow += '\n\t-' + this.borderRadius[i] + '-' + 'box-shadow : ' + x + ' ' + y + ' ' + blur + ' ' + spread + ' ' + color + ' ' + inset + ';';
    }
    crossBrowserBoxShadow += '\n\t' + 'box-shadow : ' + x + ' ' + y + ' ' + blur + ' ' + spread + ' ' + color + ' ' + inset + ';';
    return crossBrowserBoxShadow;
  },
  getGradients: function(colorTop, colorBottom) {
    var crossBrowserGradients = "";
    for (var attr in this.gradient) {
      var grad = this.gradient[attr];

      var topColorIndex = grad.indexOf("?");
      if (topColorIndex != -1) {
        grad = grad.replaceAt(topColorIndex, colorTop);
      }

      var BottomColorIndex = grad.lastIndexOf("?");
      if (BottomColorIndex != -1) {
        grad = grad.replaceAt(BottomColorIndex, colorBottom);
      }

      crossBrowserGradients += '\n\t' + 'background : ' + grad;
    }
    return crossBrowserGradients;
  },
  getTransitionDuration: function(duration) {
    var crossBrowserDuration = "";
    for (var i = 0, length = this.transition.length; i < length; ++i) {
      crossBrowserDuration += '\n\t-' + this.transition[i] + '-' + 'transition-duration : ' + duration + ';';
    }
    crossBrowserDuration += '\n\t' + 'transition-duration : ' + duration + ';';
    return crossBrowserDuration;
  },
}
