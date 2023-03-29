/* eslint-disable */
function smoothstep (min, max, x) {
  if ( x <= min ) return min;
  if ( x >= max ) return max;

  x = ( x - min ) / ( max - min );

  return x * x * ( 3 - 2 * x );
}
function clamp (min, max, x) {
  if ( x <= min ) return min;
  if ( x >= max ) return max;
  return x;
}
function isInViewport(obj) {
  if (isElement(obj))
    return isInViewportDom(obj);
  else
    return isInViewportGL(obj);
}
function isInViewportGL(rect, scroll) {
  let x, y, w, h;
  x = rect.x;
  y = rect.y + (scroll ? - scroll : 0);

  w = rect.w;
  h = rect.h;

  let ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let hw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return ((y < hw && y + h > 0) && (x < ww && x + w > 0));
}
function isInViewportDom($el, offset) {
  let rect = $el.getBoundingClientRect();
  let x, y, w, h;
  x = rect.left;
  y = rect.top + (offset !== undefined ? offset : 0);

  w = rect.width;
  h = rect.height;

  let ww = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  let hw = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return ((y < hw && y + h > 0) && (x < ww && x + w > 0));
}
function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch (e) {
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj === "object") &&
      (obj.nodeType === 1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument === "object");
  }
}
function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;

  while (element) {
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    element = element.offsetParent;
  }

  return { x: xPosition, y: yPosition };
}
function round(number, r) {
  var r = r ? Math.pow(10, r) : 1e3;
  return Math.round(number * r) / r;
}
function lerp(from, to, t) {
  return (1 - t) * from + t * to;
}
function map (x, a, b, c, d) { 
  return (x - a) * (d - c) / (b - a) + c
}
var ease = {
  bounce: function (t) {
    var p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
  },
  out: function (t) {
    return 1 - (--t) * t * t * t
  },
  inQuint: function (t) {
    return t*t*t*t*t*t*t*t*t*t*t*t*t
  },
  out2: function (t) {
    return t*(2-t)
  }
};
function getStyleNumber(el, property){
  return Number(getComputedStyle(el)[property].replace('px', ''));
}
function getEmbedURL(url) {
  if (url.search && url.search(/\/\/www.youtube.com|\/\/youtube.com|\/\/www.youtu.be|\/\/youtu.be/) !== -1) {
    var id;
    if (url.search(/\/\//) !== -1) {
      if (url.search('youtu.be') !== -1) {
        id = url.replace(/.*youtu.be\//, '');
      } else {
        const u = new URL(url);
        id = u.searchParams.get('v');
      }
    }
    return `https://www.youtube.com/embed/${id}?modestbranding=1&showinfo=0&rel=0`;
  }
  if (url.search && url.search(/\/\/www.vimeo.com|\/\/vimeo.com/) !== -1) {
    id = url.replace(/.*vimeo.com\//, '');
    return `https://player.vimeo.com/video/${id}`;
  }
  return url;
}
function getVideoId(url) {
  if (url.search && url.search(/\/\/www.youtube.com|\/\/youtube.com|\/\/www.youtu.be|\/\/youtu.be/) !== -1) {
    var id;
    if (url.search(/\/\//) !== -1) {
      if (url.search('youtu.be') !== -1) {
        id = url.replace(/.*youtu.be\//, '');
      } else {
        const u = new URL(url);
        id = u.searchParams.get('v');
      }
    }
    return id;
  }
  if (url.search && url.search(/\/\/www.vimeo.com|\/\/vimeo.com/) !== -1) {
    id = url.replace(/.*vimeo.com\//, '');
    return id;
  }
}
function lineBreak(text, max, $container, noAlone, breakLetters, point) {
  $container.innerHTML = text.split(/\s/).map(w => { return '<span class="word">' + w + '</span>' }).join('');
  var len = 0;
  Array.from($container.querySelectorAll('.word')).forEach(function (w) { len += getWidth(w) });
  $container.setAttribute('data-len', len);
  if (len > max) {
    $container.innerHTML = '';
    var $l = document.createElement('span');
    $l.classList.add('line');
    $container.appendChild($l);
    var $currentLine = $l;
    text.split(/\s/).forEach((w, i) => {
      var $w = document.createElement('span');
      $w.classList.add('word');
      $w.innerHTML = i == 0 ? w : (' ' + w);

      $currentLine.appendChild($w);


      if((point && w.includes('.'))){ // || w.includes('?')
        ////console.log(w)
        var $nwl = document.createElement('span');
        $nwl.classList.add('line');

        $nwl.appendChild($w);
        //$currentLine = $nwl;
        $container.appendChild($nwl);

      }else if (getWidth($currentLine) > max) {
        $w.remove();

        let $br = document.createElement('br')
        
        var $nwl = document.createElement('span');

        $nwl.classList.add('line');

        var $w = document.createElement('span');
        $w.classList.add('word');

        if((point && w.includes('?'))){
          $w.classList.add('line')
        }
        //console.log($w)

        $w.innerHTML = i == 0 ? w : (' ' + w);

        $nwl.appendChild($w);
        $currentLine = $nwl;
        $container.appendChild($nwl);
      }
    });
    var $alone = Array.from($container.querySelectorAll('.line')).find($l => { return $l.children.length == 1 });
    if (noAlone && $alone) {
      var $last = $alone.previousElementSibling.querySelector('.word:last-child');
      var t = $last.innerHTML.replace(/^\s/, '');
      $last.remove();

      var $w = document.createElement('span');
      $w.classList.add('word');
      $w.innerHTML = t;
      $alone.prepend($w);
    }
  }else{
    $container.innerHTML = '';
    var $l = document.createElement('span');
    $l.classList.add('line');
    $container.append($l);
    $l.innerHTML = text;
  }
  Array.from($container.querySelectorAll('.line')).forEach(function (l) { 
    if(l.innerText === '' || l.innerText === ' ')
      l.remove();
    else
      l.innerHTML = '<span class="text">' + l.innerHTML + '</span>';
  });
  if(breakLetters) {
    Array.from($container.querySelectorAll('.text')).forEach(function (text) { 
      const letters = text.innerText.split('').map(letter => `<span class="letter${letter === ' ' ? ' space' : ''}">${letter}</span>`).join('')
      text.innerHTML = letters;
    });
  }
  function getWidth($el){
    if($el.classList.contains('word')){
      let wordW = $el.getBoundingClientRect().width;
      const content = $el.innerText;
      if($el.nextElementSibling && content.length > 0){
        wordW += (wordW / content.length) * 1.2
      }
      return wordW;
    }else{
      let w = 0;
      Array.from($el.querySelectorAll('.word')).forEach(word => {
        w += getWidth(word);
      });
      return w;
    }
  }
}
function isSet($el, key) {
  const attr = $el.getAttribute(key);
  return (
    attr !== undefined &&
    attr !== null &&
    attr !== false &&
    attr !== 'undefined' &&
    attr !== 'null' &&
    attr !== 'false'
  );
}
function isVideoNative(url){
  return url.search && (url.search(/\/\/www.youtube.com|\/\/youtube.com|\/\/www.youtu.be|\/\/youtu.be/) === -1 || (url.search(/\/\/www.vimeo.com|\/\/vimeo.com/) !== -1)) && /\.mp4\?*/.test(url);
}
function testBrowser(browser) {
  var result;

  switch (browser) {
    case 'safari':
      result = (typeof window.safari !== 'undefined' && window.safari.pushNotification);
      break;
    case 'safari mobile':
      result = /iPhone/i.test(navigator.userAgent) && /Safari/i.test(navigator.userAgent);
      break;
    case 'samsung':
      result = /SamsungBrowser/.test(navigator.userAgent);
      break;
    case 'chrome':
      result = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !/SamsungBrowser/.test(navigator.userAgent);
      break;
    case 'chrome mobile':
      result = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) && !/SamsungBrowser/.test(navigator.userAgent) && window.chrome && !window.chrome.webstore;
      break;
    case 'firefox mobile':
      result = !/Chrome/.test(navigator.userAgent) && /Mozilla/.test(navigator.userAgent) && /Firefox/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent);
      break;
    case 'firefox':
      result = !/Chrome/.test(navigator.userAgent) && /Mozilla/.test(navigator.userAgent) && /Firefox/.test(navigator.userAgent);
      break;
    case 'ie':
      result = /MSIE/.test(window.navigator.userAgent) || /NET/.test(window.navigator.userAgent);
      break;
    case 'edge':
      result = /Edge/.test(window.navigator.userAgent);
      break;
    case 'ms':
      result = /Edge/.test(window.navigator.userAgent) || /MSIE/.test(window.navigator.userAgent) || /NET/.test(window.navigator.userAgent);
      break;
    default:
      result = false;
      break
  }
  return result;
}
function getBrowser() {
  if(testBrowser('chrome'))
      return 'chrome';
  if(testBrowser('safari'))
      return 'safari';
  if(testBrowser('safari mobile'))
      return 'safari-mobile';
  if(testBrowser('firefox'))
      return 'firefox';
  if(testBrowser('ie'))
      return 'ie';
  if(testBrowser('edge'))
      return 'edge';
}
function waitForFont(fontName, cb) {
  const isReady = document.fonts.check(`1em ${fontName}`);
  if(isReady) {
    cb();
  }else {
    document.fonts.ready.then(() => {
      cb();
    });
  }
}
function loadImage(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}
function loadImages(images, callback, max) {
  let done = false;
  if(max) images = images.filter((img, i) => i <= max)
  function loadedL() {
    return images.filter(image => image.complete).length;
  }
  if(loadedL() === images.length) {
    done = true;
    callback();
  }
  else{
    images.forEach(image => {
      image.addEventListener('load', () => {
        if(!done && loadedL() === images.length) {
          done = true;
          callback();
        }
      });
    })
  }
  setTimeout(() => {
    if(!done) {
      done = true;
      callback();
    }
  }, 10000);
}

export default {
  isInViewport: isInViewport,
  isInViewportGL: isInViewportGL,
  isInViewportDom: isInViewportDom,
  lineBreak: lineBreak,
  isElement: isElement,
  getEmbedURL: getEmbedURL,
  getVideoId: getVideoId,
  isVideoNative: isVideoNative,
  getPosition: getPosition,
  testBrowser: testBrowser,
  getBrowser: getBrowser,
  ease: ease,
  round: round,
  lerp: lerp,
  map: map,
  loadImages: loadImages,
  loadImage: loadImage,
  waitForFont: waitForFont,
  getStyleNumber: getStyleNumber,
  isSet: isSet,
  smoothstep: smoothstep,
  clamp: clamp
}