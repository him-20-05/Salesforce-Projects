Webruntime.define('lwc/borrowerTrackRecord', ['lwc', 'lightning/configProvider'], function (lwc, configProvider) { 'use strict';

  function stylesheet(hostSelector, shadowSelector, nativeShadow) {
    return "input" + shadowSelector + " {border: 0;outline: 0;border-bottom: 2px solid black;margin-bottom: 10px;}\n.container" + shadowSelector + "{margin:auto;border:1px solid #070707;padding: 20px 20px 20px 20px;background:#ffffff;font-weight: 700;}\n.nav" + shadowSelector + "{padding: 20px 20px 20px 20px;color: #ffff;font-weight: bold;font-size: 15px;font-style: bold;border: 1px solid #070707;background: #548bb6;}\n.li" + shadowSelector + "{list-style:none;}\n.label" + shadowSelector + "{display:inline-block;width:250px;padding: 10px;}\n.inputfild" + shadowSelector + " {border: 0;outline: 0;border-bottom: 2px solid black;float: right;}\nli" + shadowSelector + "{list-style:none;}\n.radio" + shadowSelector + "{display:inline-block;width:200px;padding: 10px;}\n.slds-button" + shadowSelector + "{margin: 1%;}\n";
  }
  var _implicitStylesheets = [stylesheet];

  var _tmpl = void 0;

  const proto = {
    add(className) {
      if (typeof className === 'string') {
        this[className] = true;
      } else {
        Object.assign(this, className);
      }
      return this;
    },
    invert() {
      Object.keys(this).forEach(key => {
        this[key] = !this[key];
      });
      return this;
    },
    toString() {
      return Object.keys(this).filter(key => this[key]).join(' ');
    }
  };
  function classSet(config) {
    if (typeof config === 'string') {
      const key = config;
      config = {};
      config[key] = true;
    }
    return Object.assign(Object.create(proto), config);
  }

  function getStepIndex(steps, stepValue) {
    if (steps.length === 0) {
      return -1;
    }
    let ret = -1;
    if (stepValue) {
      // iterate over the steps and find the index of the first element with a matching value
      const stepsLength = steps.length;
      for (let i = 0; i < stepsLength; i += 1) {
        if (steps[i].value === stepValue) {
          ret = i;
          break;
        }
      }
    }
    return ret;
  }
  function getCurrentStepIndex(steps, currentStepValue) {
    const index = getStepIndex(steps, currentStepValue);
    if (index >= 0) {
      return index;
    }
    return 0;
  }
  function computeProgressValue(steps, activeStepIndex) {
    const stepLength = steps.length;
    if (stepLength === 1) {
      return 0;
    }
    return Math.floor(100 / (stepLength - 1) * activeStepIndex);
  }

  function tmpl($api, $cmp, $slotset, $ctx) {
    const {
      d: api_dynamic,
      h: api_element
    } = $api;
    return [api_element("div", {
      className: $cmp.computedClass,
      attrs: {
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        "aria-valuenow": $cmp.percentValue,
        "aria-busy": $cmp.ariaBusy,
        "role": "progressbar"
      },
      key: 2
    }, [api_element("span", {
      classMap: {
        "slds-progress-bar__value": true
      },
      style: $cmp.computedStyle,
      key: 1
    }, [api_element("span", {
      classMap: {
        "slds-assistive-text": true
      },
      key: 0
    }, [api_dynamic($cmp.assistiveText)])])])];
  }

  var _tmpl$1 = lwc.registerTemplate(tmpl);
  tmpl.stylesheets = [];
  tmpl.stylesheetTokens = {
    hostAttribute: "lightning-progressBar_progressBar-host",
    shadowAttribute: "lightning-progressBar_progressBar"
  };

  var labelProgress = 'Progress';

  function assert(condition, message) {
    {
      if (!condition) {
        throw new Error(message);
      }
    }
  }

  var salesforceLocale = 'en-US';

  /**
   * Utility function to generate an unique guid.
   * used on state objects to provide a performance aid when iterating
   * through the items and marking them for render
   * @returns {String} an unique string ID
   */
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  function classListMutation(classList, config) {
    Object.keys(config).forEach(key => {
      if (typeof key === 'string' && key.length) {
        if (config[key]) {
          classList.add(key);
        } else {
          classList.remove(key);
        }
      }
    });
  }

  /**
  A string normalization utility for attributes.
  @param {String} value - The value to normalize.
  @param {Object} config - The optional configuration object.
  @param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
  @param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
  @return {String} - The normalized value.
  **/
  function normalizeString(value, config = {}) {
    const {
      fallbackValue = '',
      validValues,
      toLowerCase = true
    } = config;
    let normalized = typeof value === 'string' && value.trim() || '';
    normalized = toLowerCase ? normalized.toLowerCase() : normalized;
    if (validValues && validValues.indexOf(normalized) === -1) {
      normalized = fallbackValue;
    }
    return normalized;
  }

  /**
  A boolean normalization utility for attributes.
  @param {Any} value - The value to normalize.
  @return {Boolean} - The normalized value.
  **/
  function normalizeBoolean(value) {
    return typeof value === 'string' || !!value;
  }

  /**
  A aria attribute normalization utility.
  @param {Any} value - A single aria value or an array of aria values
  @return {String} - A space separated list of aria values
  **/
  function normalizeAriaAttribute(value) {
    let arias = Array.isArray(value) ? value : [value];
    arias = arias.map(ariaValue => {
      if (typeof ariaValue === 'string') {
        return ariaValue.replace(/\s+/g, ' ').trim();
      }
      return '';
    }).filter(ariaValue => !!ariaValue);
    return arias.length > 0 ? arias.join(' ') : null;
  }

  const isIE11 = isIE11Test(navigator);
  const isChrome = isChromeTest(navigator);
  const isSafari = isSafariTest(navigator);

  // The following functions are for tests only
  function isIE11Test(navigator) {
    // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
    return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
  }
  function isChromeTest(navigator) {
    // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }
  function isSafariTest(navigator) {
    // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  /**
   * Set an attribute on an element, if it's a normal element
   * it will use setAttribute, if it's an LWC component
   * it will use the public property
   *
   * @param {HTMLElement} element The element to act on
   * @param {String} attribute the attribute to set
   * @param {Any} value the value to set
   */
  function smartSetAttribute(element, attribute, value) {
    if (element.tagName.match(/^LIGHTNING/i)) {
      attribute = attribute.replace(/-\w/g, m => m[1].toUpperCase());
      element[attribute] = value ? value : null;
    } else if (value) {
      element.setAttribute(attribute, value);
    } else {
      element.removeAttribute(attribute);
    }
  }

  /**
   * @param {HTMLElement} element Element to act on
   * @param {Object} values values and attributes to set, if the value is
   *                        falsy it the attribute will be removed
   */
  function synchronizeAttrs(element, values) {
    if (!element) {
      return;
    }
    const attributes = Object.keys(values);
    attributes.forEach(attribute => {
      smartSetAttribute(element, attribute, values[attribute]);
    });
  }
  const DEFAULT_ZINDEX_BASELINE = 9000;
  /**
   * Returns the zIndex baseline from slds zIndex variable --lwc-zIndexModal.
   * @returns {Number} zIndex baseline
   */
  function getZIndexBaseline() {
    const value = (window.getComputedStyle(document.documentElement) || document.documentElement.style).getPropertyValue('--lwc-zIndexModal');
    const base = parseInt(value, 10);
    return isNaN(base) ? DEFAULT_ZINDEX_BASELINE : base;
  }

  // This is a library built from Globalization's repo

  /**
   * Define address format patterns.
   */
  var AddressFormatPattern = Object.freeze({
    /**
     *
     * N: Name (The formatting of names for this field is outside of the scope of the address elements.)
     * O: Organization
     * A: Address Lines (2 or 3 lines address)
     * D: District (Sub-locality): smaller than a city, and could be a neighborhood, suburb or dependent locality.
     * C: City (Locality)
     * S: State (Administrative Area)
     * K: Country
     * Z: ZIP Code / Postal Code
     * X: Sorting code, for example, CEDEX as used in France
     * n: newline
     */
    A: Symbol('Address Lines'),
    C: Symbol('City'),
    S: Symbol('State'),
    K: Symbol('Country'),
    Z: Symbol('Zip Code'),
    n: Symbol('New Line'),
    fromPlaceHolder: function fromPlaceHolder(placeHolder) {
      switch (placeHolder) {
        case 'A':
          return AddressFormatPattern.A;
        case 'C':
          return AddressFormatPattern.C;
        case 'S':
          return AddressFormatPattern.S;
        case 'K':
          return AddressFormatPattern.K;
        case 'Z':
          return AddressFormatPattern.Z;
        case 'n':
          return AddressFormatPattern.n;
      }
      return null;
    },
    getPlaceHolder: function getPlaceHolder(pattern) {
      switch (pattern) {
        case AddressFormatPattern.A:
          return 'A';
        case AddressFormatPattern.C:
          return 'C';
        case AddressFormatPattern.S:
          return 'S';
        case AddressFormatPattern.K:
          return 'K';
        case AddressFormatPattern.Z:
          return 'Z';
        case AddressFormatPattern.n:
          return 'n';
      }
      return null;
    },
    getData: function getData(pattern, data) {
      if (data) {
        switch (pattern) {
          case AddressFormatPattern.A:
            return data.address;
          case AddressFormatPattern.C:
            return data.city;
          case AddressFormatPattern.S:
            return data.state;
          case AddressFormatPattern.K:
            return data.country;
          case AddressFormatPattern.Z:
            return data.zipCode;
          case AddressFormatPattern.n:
            return data.newLine;
        }
      }
      return null;
    }
  });
  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  };
  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  /**
   * Address token types enum
   *
   * @private
   */
  var AddressTokenTypes = Object.freeze({
    DATA: Symbol('data'),
    STRING: Symbol('string'),
    NEWLINE: Symbol('newline'),
    GROUP: Symbol('group')
  });

  /**
   * AddressToken class
   *
   * @private
   */

  var AddressToken = function () {
    /**
     *
     * @param {AddressTokenTypes} type
     * @param {string} string
     * @param {*} pattern
     */
    function AddressToken(type, string, pattern) {
      classCallCheck(this, AddressToken);
      this.type = type;
      this.string = string;
      this.pattern = pattern;
    }

    /**
     * Construct a string type token
     *
     * @param {string} string String
     * @return {AddressToken} Address Token
     */

    createClass(AddressToken, null, [{
      key: 'string',
      value: function string(_string) {
        return new AddressToken(AddressTokenTypes.STRING, _string);
      }
      /**
       * Construct a data type token
       *
       * @param {pattern} pattern Address Format Pattern
       * @return {AddressToken} Address Token
       */
    }, {
      key: 'data',
      value: function data(pattern) {
        return new AddressToken(AddressTokenTypes.DATA, undefined, pattern);
      }
      /**
       * Construct a new line type token
       *
       * @return {AddressToken} Address Token
       */
    }, {
      key: 'newLine',
      value: function newLine() {
        return new AddressToken(AddressTokenTypes.NEWLINE);
      }
    }]);
    return AddressToken;
  }();

  // This is a library built from Globalization's repo

  // Define all available fields.

  /**
   S: Salutation
   F: First Name(givenName)
   M: Middle Name
   L: Last Name(familyName)
   X: Suffix
   I: Informal Name
   */

  var fieldConstants = {
    SALUTATION: Symbol('Salutation'),
    FIRST: Symbol('First Name'),
    MIDDLE: Symbol('Middle Name'),
    LAST: Symbol('Last Name'),
    SUFFIX: Symbol('Suffix'),
    INFORMAL: Symbol('Informal Name')
  };
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  var Format = function Format(parts) {
    _classCallCheck(this, Format);
    this.parts = Object.freeze(parts);
    Object.freeze(this);
  };

  /**
   * Represents a field within the format
   */

  var FieldFormatPart = function FieldFormatPart(field) {
    _classCallCheck(this, FieldFormatPart);
    this.field = field;
    this.type = 'field';
    Object.freeze(this);
  };

  /**
   * Represents text to be output directly
   */

  var TextFormatPart = function TextFormatPart(text) {
    _classCallCheck(this, TextFormatPart);
    this.type = 'text';
    this.text = text;
    Object.freeze(this);
  };
  var fieldFormatParts = Object.freeze({
    SALUTATION: new FieldFormatPart(fieldConstants.SALUTATION),
    FIRST: new FieldFormatPart(fieldConstants.FIRST),
    MIDDLE: new FieldFormatPart(fieldConstants.MIDDLE),
    LAST: new FieldFormatPart(fieldConstants.LAST),
    SUFFIX: new FieldFormatPart(fieldConstants.SUFFIX),
    INFORMAL: new FieldFormatPart(fieldConstants.INFORMAL)
  });
  var FormatParser = function () {
    function FormatParser() {
      _classCallCheck(this, FormatParser);
    }
    _createClass(FormatParser, [{
      key: 'parse',
      /**
       * Parses the format
       * @param {string} fmt the format to be parsed
       * @returns {Format}
       */
      value: function parse(fmt) {
        var nodes = [];
        var textBuffer = '';

        // parse the format string
        for (var i = 0; i < fmt.length; i = i + 1) {
          if (fmt[i] === '%') {
            i = i + 1; // move to the next character after %

            // end the last text buffer
            if (textBuffer.length > 0) {
              nodes.push(Object.freeze(new TextFormatPart(textBuffer)));
              textBuffer = '';
            }
            if (i >= fmt.length) {
              throw new Error('Unexpected end of format. Symbol at ' + (i - 1) + ' should be followed by a valid field code');
            }
            var code = fmt[i];
            switch (code) {
              case 'S':
                nodes.push(fieldFormatParts.SALUTATION);
                break;
              case 'F':
                nodes.push(fieldFormatParts.FIRST);
                break;
              case 'M':
                nodes.push(fieldFormatParts.MIDDLE);
                break;
              case 'L':
                nodes.push(fieldFormatParts.LAST);
                break;
              case 'X':
                nodes.push(fieldFormatParts.SUFFIX);
                break;
              case 'I':
                nodes.push(fieldFormatParts.INFORMAL);
                break;
            }
          } else {
            // if it wasn't a symbol, then just output the value directly
            textBuffer += fmt[i];
          }
        }
        if (textBuffer.length > 0) {
          nodes.push(new TextFormatPart(textBuffer));
        }
        return new Format(nodes);
      }
    }]);
    return FormatParser;
  }();
  var formatParser = new FormatParser();

  var numberFormat = '#,##0.###';

  var percentFormat = '#,##0%';

  var currencyFormat = '¤#,##0.00;(¤#,##0.00)';

  var currency = 'USD';

  // For possible parameters, see the Intl.NumberFormat spec:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat#Parameters
  const POSSIBLE_OPTS = {
    style: true,
    currency: true,
    currencyDisplay: true,
    useGrouping: true,
    minimumIntegerDigits: true,
    minimumFractionDigits: true,
    maximumFractionDigits: true,
    minimumSignificantDigits: true,
    maximumSignificantDigits: true
  };
  const STYLE = {
    DECIMAL: 'decimal',
    CURRENCY: 'currency',
    PERCENT: 'percent'
  };
  const CURRENCY_DISPLAY = {
    CODE: 'code',
    // USD
    SYMBOL: 'symbol',
    // $
    NAME: 'name' // US Dollars
  };

  const SAFE_NUM_LENGTH = 15;
  const numberFormatInstancesCache = {};
  function getStringOfChar(char, amount) {
    return new Array(amount + 1).join(char);
  }
  function getGroupingCount(skeleton) {
    const match = skeleton.match(/,[#0]*\./);
    return match ? match[0].length - 2 : 0;
  }
  function getOptionsUniqueKey(options) {
    return Object.keys(options).sort().reduce((prev, optionName) => {
      if (POSSIBLE_OPTS[optionName]) {
        return prev + optionName + options[optionName] + '';
      }
      return prev;
    }, '');
  }
  function toNumber(value, defaultValue) {
    const number = parseInt(value, 10);
    if (isNaN(number)) {
      return defaultValue;
    }
    return number;
  }
  function getFractionPart(options) {
    const minimumDigits = toNumber(options.minimumFractionDigits, 0);
    const maximumDigits = Math.max(toNumber(options.maximumFractionDigits, 0), minimumDigits);
    return '.' + new Array(minimumDigits + 1).join('0') + new Array(maximumDigits - minimumDigits + 1).join('#');
  }
  function updateFractionPart(skeleton, options) {
    const fractionPart = getFractionPart(options);
    return addFractionsToPattern(skeleton, fractionPart);
  }
  function addFractionsToPattern(pattern, fractionPart) {
    if (!fractionPart) {
      return pattern;
    }

    // if pattern has two formats (one for positive and one for negative numbers), add fractions to both patterns
    if (pattern.indexOf(';') > 0) {
      const [positivePattern, negativePattern] = pattern.split(';');
      return `${addFractionsToPattern(positivePattern, fractionPart)};${addFractionsToPattern(negativePattern, fractionPart)}`;
    }

    // If the pattern already has a fraction part, replace it with the fractions calculated from the options
    if (pattern.indexOf('.') > 0) {
      return pattern.replace(/\.(0|#)*/, fractionPart);
    }

    // If the pattern doesn't have a fraction part, we need to add it to the pattern
    // We need to add the fraction part after the last digit (represented by '0' or '#')
    const position = Math.max(pattern.lastIndexOf('0'), pattern.lastIndexOf('#')) + 1;
    return [pattern.slice(0, position), fractionPart, pattern.slice(position)].join('');
  }
  function updateCurrencySymbol(skeleton, currencyCode, options) {
    const symbol = String.fromCharCode(164);
    if (options.currencyDisplay === CURRENCY_DISPLAY.NAME) {
      // append the currency code at the end.
      return skeleton.replace(symbol, '') + currencyCode;
    }
    return skeleton.replace(symbol, currencyCode);
  }
  function updateIntegerPart(skeleton, options) {
    const minimumIntegerDigits = options.minimumIntegerDigits;
    const groupingCount = getGroupingCount(skeleton);
    if (!minimumIntegerDigits) {
      return skeleton;
    }
    if (minimumIntegerDigits <= groupingCount) {
      return skeleton.replace(/,[#0]*\./, ',' + getStringOfChar('#', groupingCount - minimumIntegerDigits) + getStringOfChar('0', minimumIntegerDigits) + '.');
    }
    return skeleton.replace(/[#0]*\./, getStringOfChar('0', minimumIntegerDigits - groupingCount) + ',' + getStringOfChar('0', groupingCount) + '.');
  }
  function getBestMatchCurrencySymbol(code, currencyDisplay) {
    if (!('Intl' in window)) {
      return code; // fail gracefully.
    }

    const opts = {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 0
    };
    if (currencyDisplay) {
      opts.currencyDisplay = currencyDisplay;
    }
    const nf = getFromCache(opts);
    return nf.format(2).replace(/2/g, '');
  }
  function getCurrency(options) {
    const currencyDisplay = options.currencyDisplay || CURRENCY_DISPLAY.SYMBOL;
    if (currencyDisplay === CURRENCY_DISPLAY.SYMBOL || currencyDisplay === CURRENCY_DISPLAY.NAME) {
      return getBestMatchCurrencySymbol(options.currency, currencyDisplay);
    }
    return options.currency;
  }
  function getFromCache(options) {
    const optionsUniqueKey = getOptionsUniqueKey(options);
    let numberFormatInstance = numberFormatInstancesCache[optionsUniqueKey];
    if (numberFormatInstance) {
      return numberFormatInstance;
    }
    numberFormatInstance = new Intl.NumberFormat(salesforceLocale, options);
    numberFormatInstancesCache[optionsUniqueKey] = numberFormatInstance;
    return numberFormatInstance;
  }
  function exceedsSafeLength(value) {
    const numberAsString = value.toString().replace('.', '');
    return numberAsString.length >= SAFE_NUM_LENGTH;
  }
  function normalizedMinimumFractionDigits(options) {
    const fractionSkeleton = getFallbackFractionSkeleton(options.style);
    const fractionDigits = fractionSkeleton.replace(/[^0]/g, '');
    return fractionDigits.length;
  }
  function normalizedMaximumFractionDigits(options) {
    const fractionSkeleton = getFallbackFractionSkeleton(options.style);
    const fractionDigits = fractionSkeleton.replace(/[^0#]/g, '');
    return Math.max(options.minimumFractionDigits, fractionDigits.length);
  }
  function getFallbackFractionSkeleton(style) {
    let styleFormat = numberFormat;
    if (style === STYLE.CURRENCY) {
      styleFormat = currencyFormat;
    } else if (style === STYLE.PERCENT) {
      styleFormat = percentFormat;
    }
    const format = styleFormat.split(';')[0];
    return format.split('.')[1] || '';
  }
  function normalizeOptions(options) {
    const normalizedOpts = Object.assign({}, options);
    normalizedOpts.currency = normalizedOpts.currency || currency;
    if (normalizedOpts.minimumFractionDigits === undefined) {
      normalizedOpts.minimumFractionDigits = normalizedMinimumFractionDigits(normalizedOpts);
    }
    if (normalizedOpts.maximumFractionDigits === undefined || normalizedOpts.maximumFractionDigits < normalizedOpts.minimumFractionDigits) {
      normalizedOpts.maximumFractionDigits = normalizedMaximumFractionDigits(normalizedOpts);
    }
    return normalizedOpts;
  }

  function NumberOptions(options) {
    this.options = options || {};
  }
  NumberOptions.prototype.isCurrency = function () {
    return this.options.style === 'currency';
  };
  NumberOptions.prototype.isPercent = function () {
    return this.options.style === 'percent';
  };
  NumberOptions.prototype.isDefaultCurrency = function () {
    return !this.options.currency || currency === this.options.currency;
  };
  NumberOptions.prototype.getDefaultSkeleton = function () {
    return this.isCurrency() ? currencyFormat : this.isPercent() ? percentFormat : numberFormat;
  };
  NumberOptions.prototype.getSkeleton = function () {
    const options = this.options;
    const defaultSkeleton = this.getDefaultSkeleton();
    let skeleton = updateFractionPart(defaultSkeleton, options);
    skeleton = updateIntegerPart(skeleton, options);
    if (!this.isDefaultCurrency()) {
      skeleton = updateCurrencySymbol(skeleton, getCurrency(options), options);
    }
    return skeleton;
  };

  // This is a library for all calls to the aura localizationService.

  // This is called from the numberFormat library when the value exceeds the safe length.
  function getNumberFormat(format) {
    return configProvider.getLocalizationService().getNumberFormat(format);
  }

  function numberFormatFallback(options) {
    const skeleton = new NumberOptions(options).getSkeleton();
    return {
      format: value => {
        return getNumberFormat(skeleton).format(value);
      }
    };
  }

  function numberFormat$1(options) {
    const normalizedOpts = Object.assign({}, normalizeOptions(options));
    if (!('Intl' in window)) {
      return numberFormatFallback(normalizedOpts);
    }
    return {
      format: value => {
        if (value && exceedsSafeLength(value)) {
          return numberFormatFallback(normalizedOpts).format(value);
        }
        const numberFormatInstance = getFromCache(normalizedOpts);
        return numberFormatInstance.format(value);
      }
    };
  }

  const isTimeZonesSupported = function () {
    try {
      // IE11 only supports the UTC time zone and throws when given anything else
      // eslint-disable-next-line new-cap
      Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles'
      });
    } catch (err) {
      return false;
    }
    return true;
  }();

  // Temporary workaround until we get real label support. New label entries must
  // also be added to the static `labels` prop inside the class.
  // https://git.soma.salesforce.com/raptor/raptor/issues/196
  const i18n = {
    progress: labelProgress
  };
  const DEFAULT_SIZE = 'medium';
  const DEFAULT_VARIANT = 'base';

  /**
   * Displays a horizontal progress bar from left to right to indicate the progress of an operation.
   */
  class LightningProgressBar extends lwc.LightningElement {
    constructor(...args) {
      super(...args);
      this.privateVariant = DEFAULT_VARIANT;
      this.privateSize = DEFAULT_SIZE;
      this.value = 0;
    }
    /**
     * The percentage value of the progress bar.
     * @type {number}
     * @default 0
     */
    /**
     * The variant changes the appearance of the progress bar.
     * Accepted variants include base or circular.
     * This value defaults to base.
     *
     * @type {string}
     * @default base
     */
    get variant() {
      return this.privateVariant;
    }
    set variant(value) {
      this.privateVariant = normalizeString(value, {
        fallbackValue: DEFAULT_VARIANT,
        validValues: ['base', 'circular']
      });
    }

    /**
     * The size of the progress bar.
     * Valid values are x-small, small, medium, and large.
     * The default value is medium.
     * @type {string}
     * @default medium
     */
    get size() {
      return this.privateSize;
    }
    set size(value) {
      this.privateSize = normalizeString(value, {
        fallbackValue: DEFAULT_SIZE,
        validValues: ['x-small', 'small', 'medium', 'large']
      });
    }
    get ariaBusy() {
      const value = this.percentValue;
      if (value > 0 && value < 100) {
        return 'true';
      }
      return null;
    }
    get computedClass() {
      const {
        size,
        variant
      } = this;
      const classes = classSet('slds-progress-bar');
      classes.add(`slds-progress-bar_${size}`);
      if (variant === 'circular') {
        classes.add('slds-progress-bar_circular');
      }
      return classes.toString();
    }
    get percentValue() {
      const {
        value
      } = this;
      if (!value || value <= 0) {
        return 0;
      }
      if (value >= 100) {
        return 100;
      }
      return Math.round(value);
    }
    get computedStyle() {
      return `width: ${this.percentValue}%;`;
    }
    get assistiveText() {
      const formattedPercent = numberFormat$1({
        style: 'percent'
      }).format(this.percentValue / 100);
      return `${i18n.progress} ${formattedPercent}`;
    }
  }
  lwc.registerDecorators(LightningProgressBar, {
    publicProps: {
      value: {
        config: 0
      },
      variant: {
        config: 3
      },
      size: {
        config: 3
      }
    },
    track: {
      privateVariant: 1,
      privateSize: 1
    }
  });
  var _lightningProgressBar = lwc.registerComponent(LightningProgressBar, {
    tmpl: _tmpl$1
  });

  function tmpl$1($api, $cmp, $slotset, $ctx) {
    const {
      s: api_slot,
      b: api_bind,
      h: api_element,
      c: api_custom_element
    } = $api;
    const {
      _m0
    } = $ctx;
    return [api_element("div", {
      className: $cmp.computedWrapperClass,
      key: 3
    }, [api_element("ol", {
      classMap: {
        "slds-progress__list": true
      },
      key: 1,
      on: {
        "stepfocus": _m0 || ($ctx._m0 = api_bind($cmp.handleStepFocus))
      }
    }, [api_slot("", {
      key: 0
    }, [], $slotset)]), api_custom_element("lightning-progress-bar", _lightningProgressBar, {
      props: {
        "value": $cmp.privateProgressValue,
        "size": "small"
      },
      key: 2
    }, [])])];
  }

  var base = lwc.registerTemplate(tmpl$1);
  tmpl$1.slots = [""];
  tmpl$1.stylesheets = [];
  tmpl$1.stylesheetTokens = {
    hostAttribute: "lightning-progressIndicator_base-host",
    shadowAttribute: "lightning-progressIndicator_base"
  };

  function tmpl$2($api, $cmp, $slotset, $ctx) {
    const {
      s: api_slot,
      b: api_bind,
      h: api_element
    } = $api;
    const {
      _m0,
      _m1
    } = $ctx;
    return [api_element("div", {
      classMap: {
        "slds-path": true
      },
      key: 6
    }, [api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-path__track": true
      },
      key: 5
    }, [api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-path__scroller-container": true
      },
      key: 4
    }, [api_element("div", {
      classMap: {
        "slds-path__scroller": true
      },
      attrs: {
        "role": "application"
      },
      key: 3
    }, [api_element("div", {
      classMap: {
        "slds-path__scroller_inner": true
      },
      key: 2
    }, [api_element("ul", {
      classMap: {
        "slds-path__nav": true
      },
      attrs: {
        "role": "listbox",
        "aria-orientation": "horizontal"
      },
      key: 1,
      on: {
        "keydown": _m0 || ($ctx._m0 = api_bind($cmp.handleStepKeyDown)),
        "stepfocus": _m1 || ($ctx._m1 = api_bind($cmp.handleStepFocus))
      }
    }, [api_slot("", {
      key: 0
    }, [], $slotset)])])])])])])];
  }

  var path = lwc.registerTemplate(tmpl$2);
  tmpl$2.slots = [""];
  tmpl$2.stylesheets = [];
  tmpl$2.stylesheetTokens = {
    hostAttribute: "lightning-progressIndicator_path-host",
    shadowAttribute: "lightning-progressIndicator_path"
  };

  const STATE_COMPLETED = 'completed';
  const STATE_CURRENT = 'current';
  const STATE_INCOMPLETE = 'incomplete';
  const STATE_ERROR = 'error';
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  /**
   * Provides a visual indication on the progress of a particular process.
   * @slot default Placeholder for lightning-progress-step.
   */
  class LightningProgressIndicator extends lwc.LightningElement {
    constructor(...args) {
      super(...args);
      this.type = 'base';
      this.variant = 'base';
      this.currentStep = void 0;
      this.hasError = false;
      this.privateStepHandlers = {};
      this.privateProgressValue = 0;
      this.privateTooltipHidden = true;
      this.privateTooltipLabel = void 0;
      this.privateActiveStepIndex = void 0;
      this.privateTooltipElement = void 0;
    }
    /**
     * Changes the visual pattern of the indicator. Valid values are base and path.
     * The default is base.
     * @type {string}
     * @default base
     */
    /**
     * Changes the appearance of the progress indicator for the base type only.
     * Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators.
     * The default is base.
     * @type {string}
     * @default base
     */
    /**
     * Set current-step to match the value attribute of one of progress-step components.
     * If current-step is not provided, the value of the first progress-step component is used.
     * @type {string}
     */
    /**
     * If present, the current step is in error state and an error icon is displayed on the step indicator.
     * Only the base type can display errors.
     * @type {boolean}
     * @default false
     */
    connectedCallback() {
      this.addEventListener('privateregisterstep', this.handlePrivateRegisterStep.bind(this));
    }
    renderedCallback() {
      this.updateSteps();
    }
    updateSteps(activeStep) {
      const steps = this.getSteps();
      const {
        privateStepHandlers,
        type,
        hasError,
        currentStep
      } = this;
      const currentStepIndex = getCurrentStepIndex(steps, currentStep);
      let activeStepIndex = -1;
      if (activeStep) {
        activeStepIndex = getStepIndex(steps, activeStep);
        this.privateActiveStepIndex = activeStepIndex;
      }

      // cast 'steps' NodeList to an Array for crossbrowser compatibility
      const stepsArray = Array.prototype.slice.call(steps);
      stepsArray.forEach((step, index) => {
        const stepName = step.value;
        const isActive = index === activeStepIndex;
        if (index < currentStepIndex) {
          privateStepHandlers[stepName](STATE_COMPLETED, type, index, isActive);
        } else if (index === currentStepIndex) {
          const state = hasError ? STATE_ERROR : STATE_CURRENT;
          privateStepHandlers[stepName](state, type, index, isActive);
        } else {
          privateStepHandlers[stepName](STATE_INCOMPLETE, type, index, isActive);
        }
      });
      if (this.isBase) {
        this.privateProgressValue = computeProgressValue(steps, currentStepIndex);
      }
    }
    isActive(stepName) {
      return this.currentStep === stepName;
    }
    getSteps() {
      return Array.from(this.querySelectorAll('lightning-progress-step'));
    }
    handlePrivateRegisterStep(event) {
      const {
        stepName,
        callback
      } = event.detail;
      this.privateStepHandlers[stepName] = callback;
    }
    handleStepFocus(event) {
      if (!this.isBase) {
        this.updateActiveStepStatus(event.target);
      }
    }
    handleStepKeyDown(event) {
      if (this.privateActiveStepIndex >= 0) {
        const steps = this.getSteps();
        switch (event.keyCode) {
          case UP:
          case LEFT:
            if (this.privateActiveStepIndex - 1 >= 0) {
              this.updateSteps(steps[this.privateActiveStepIndex - 1].value);
            }
            break;
          case DOWN:
          case RIGHT:
            if (this.privateActiveStepIndex + 1 <= steps.length) {
              this.updateSteps(steps[this.privateActiveStepIndex + 1].value);
            }
            break;
        }
      }
    }
    get computedWrapperClass() {
      return classSet('slds-progress').add({
        'slds-progress_shade': this.variant === 'shade'
      });
    }
    get computedTooltipClass() {
      return classSet('slds-popover slds-popover_tooltip slds-nubbin_bottom slds-is-absolute').add({
        'slds-hidden': this.privateTooltipHidden
      });
    }
    updateActiveStepStatus(activeStep) {
      if (this.currentStep !== activeStep) {
        this.updateSteps(activeStep.value);
      }
    }
    get isBase() {
      return this.type === 'base';
    }
    render() {
      if (this.isBase) {
        return base;
      }
      return path;
    }
  }
  lwc.registerDecorators(LightningProgressIndicator, {
    publicProps: {
      type: {
        config: 0
      },
      variant: {
        config: 0
      },
      currentStep: {
        config: 0
      },
      hasError: {
        config: 0
      }
    },
    track: {
      privateProgressValue: 1,
      privateTooltipHidden: 1,
      privateTooltipLabel: 1
    },
    fields: ["privateStepHandlers", "privateActiveStepIndex", "privateTooltipElement"]
  });
  var _lightningProgressIndicator = lwc.registerComponent(LightningProgressIndicator, {
    tmpl: _tmpl
  });

  var labelCurrentStage = 'Current Stage';

  var labelStageComplete = 'Stage Complete';

  const POSITION_ATTR_NAME = 'data-position-id';
  class BrowserWindow {
    get window() {
      if (!this._window) {
        this._window = window;

        // JTEST/Ingtegration: getComputedStyle may be null
        if (!this.window.getComputedStyle) {
          this.window.getComputedStyle = node => {
            return node.style;
          };
        }
      }
      return this._window;
    }
    mockWindow(value) {
      // For test, allow mock window.
      this._window = value;
    }
    get documentElement() {
      assert(this.window.document, 'Missing window.document');
      return this.window.document.documentElement;
    }
    get MutationObserver() {
      return this.window.MutationObserver;
    }
    isWindow(element) {
      return element && element.toString() === '[object Window]';
    }
  }
  const WindowManager = new BrowserWindow();
  function isShadowRoot(node) {
    return node && node.nodeType === 11;
  }
  function enumerateParent(elem, stopEl, checker) {
    // document.body is not necessarily a body tag, because of the (very rare)
    // case of a frameset.
    if (!elem || elem === stopEl || elem === document.body) {
      return null;
    }
    // if overflow is auto and overflow-y is also auto,
    // however in firefox the opposite is not true
    try {
      // getComputedStyle throws an exception
      // if elem is not an element
      // (can happen during unrender)
      const computedStyle = WindowManager.window.getComputedStyle(elem);
      if (!computedStyle) {
        return null;
      }
      if (checker(computedStyle)) {
        return elem;
      }
      return enumerateParent(isShadowRoot(elem.parentNode) ? elem.parentNode.host : elem.parentNode, stopEl, checker);
    } catch (e) {
      return null;
    }
  }
  function getScrollableParent(elem, stopEl) {
    return enumerateParent(elem, stopEl, computedStyle => {
      const overflow = computedStyle['overflow-y'];
      return overflow === 'auto' || overflow === 'scroll';
    });
  }
  function queryOverflowHiddenParent(elem, stopEl) {
    return enumerateParent(elem, stopEl, computedStyle => {
      return computedStyle['overflow-x'] === 'hidden' || computedStyle['overflow-y'] === 'hidden';
    });
  }
  function isInDom(el) {
    if (el === WindowManager.window) {
      return true;
    }
    if (!isShadowRoot(el.parentNode) && el.parentNode && el.parentNode.tagName && el.parentNode.tagName.toUpperCase() === 'BODY') {
      return true;
    }
    if (isShadowRoot(el.parentNode) && el.parentNode.host) {
      return isInDom(el.parentNode.host);
    }
    if (el.parentNode) {
      return isInDom(el.parentNode);
    }
    return false;
  }
  function isDomNode(obj) {
    return obj.nodeType && (obj.nodeType === 1 || obj.nodeType === 11);
  }
  function timeout(time) {
    return new Promise(resolve => {
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
  function getPositionTarget(element) {
    return element.tagName === 'TEXTAREA' ? isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode : element;
  }
  let lastId = 1000000;
  function generateUniqueSelector() {
    return `lgcp-${lastId++}`;
  }
  function normalizeElement(element) {
    const selector = generateUniqueSelector();
    element.setAttribute(POSITION_ATTR_NAME, selector);
    element =
    // eslint-disable-next-line @lwc/lwc/no-document-query
    document.querySelector(`[${POSITION_ATTR_NAME}="${selector}"]`) || element;
    return element;
  }
  function isInsideOverlay(element, modalOnly) {
    if (!element) {
      return {
        isInside: false,
        overlay: null
      };
    }
    if (element.classList && (element.classList.contains('uiModal') || element.localName === 'lightning-dialog' || !modalOnly && element.classList.contains('uiPanel'))) {
      return {
        isInside: true,
        overlay: element
      };
    }
    if (!element.parentNode) {
      return {
        isInside: false,
        overlay: null
      };
    }
    return isInsideOverlay(isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode, modalOnly);
  }
  function isInsideModal(element) {
    return isInsideOverlay(element, true);
  }
  function normalizePosition(element, nextIndex, target, alignWidth) {
    // Set element position to fixed
    // 1. element is inside overlay
    // or 2. When element isn't align with target's width, and target's parent has overflow-x:hidden setting.
    const isFixed = isInsideOverlay(element).isInside || !alignWidth && queryOverflowHiddenParent(target, WindowManager.window);
    element.style.position = isFixed ? 'fixed' : 'absolute';
    element.style.zIndex = nextIndex || 0;
    element.style.left = '-9999px'; // Avoid flicker
    // we always position from the left, but in RTL mode Omakase swaps left and right properties.
    // To always allow positioning from the left we set right to auto so position library can do its work.
    element.style.right = 'auto';
    element.style.top = '0px'; // Avoid flicker

    return element;
  }
  function requestAnimationFrameAsPromise() {
    return new Promise(resolve => {
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      requestAnimationFrame(() => resolve());
    });
  }

  const Direction = {
    Center: 'center',
    Middle: 'middle',
    Right: 'right',
    Left: 'left',
    Bottom: 'bottom',
    Top: 'top',
    Default: 'default'
  };
  const VerticalMap = {
    top: Direction.Top,
    bottom: Direction.Bottom,
    center: Direction.Middle
  };
  const HorizontalMap = {
    left: Direction.Left,
    right: Direction.Right,
    center: Direction.Center
  };
  const FlipMap = {
    left: Direction.Right,
    right: Direction.Left,
    top: Direction.Bottom,
    bottom: Direction.Top,
    center: Direction.Center,
    default: Direction.Right
  };
  function getWindowSize() {
    return {
      width: WindowManager.window.innerWidth || document.body.clientWidth || 0,
      height: WindowManager.window.innerHeight || document.body.clientHeight || 0
    };
  }
  function normalizeDirection(direction, defaultValue) {
    return normalizeString(direction, {
      fallbackValue: defaultValue || Direction.Default,
      validValues: [Direction.Center, Direction.Right, Direction.Left, Direction.Bottom, Direction.Top, Direction.Middle, Direction.Default]
    });
  }
  function mapToHorizontal(value) {
    value = normalizeDirection(value, Direction.Left);
    return HorizontalMap[value];
  }
  function mapToVertical(value) {
    value = normalizeDirection(value, Direction.Left);
    return VerticalMap[value];
  }
  function flipDirection(value) {
    value = normalizeDirection(value, Direction.Left);
    return FlipMap[value];
  }
  function checkFlipPossibility(element, target, leftAsBoundary) {
    const viewPort = getWindowSize();
    const elemRect = element.getBoundingClientRect();
    const referenceElemRect = target.getBoundingClientRect();
    const height = typeof elemRect.height !== 'undefined' ? elemRect.height : elemRect.bottom - elemRect.top;
    const width = typeof elemRect.width !== 'undefined' ? elemRect.width : elemRect.right - elemRect.left;

    // TODO: We'll need to revisit the leftAsBoundary config property. Either we'll need a better
    // name to cover the RTL language cases and maybe open up the possibility of bounding the
    // element to the target in both the horizontal and vertical directions.

    // The boundary shrinks the available area to the edge of the target rather than the viewport.
    let rightAsBoundary = false;
    if (document.dir === 'rtl') {
      rightAsBoundary = leftAsBoundary;
      leftAsBoundary = false;
    }
    const hasSpaceAbove = referenceElemRect.top >= height;
    const hasSpaceBelow = viewPort.height - referenceElemRect.bottom >= height;

    // Assuming left alignment is specified this tests if:
    // - there's room to accommodate the element with right alignment
    // - there's not enough room to accommodate the element with left alignment
    const shouldAlignToRight = referenceElemRect.right >= width && referenceElemRect.left + width > (rightAsBoundary ? referenceElemRect.right : viewPort.width);

    // Assuming right alignment is specified this tests if:
    // - there's room to accommodate the element with left alignment
    // - there's not enough room to accommodate the element with right alignment
    const shouldAlignToLeft = referenceElemRect.left + width <= viewPort.width && referenceElemRect.right - width < (leftAsBoundary ? referenceElemRect.left : 0);

    // Assuming center alignment, does the viewport have space to fit half of the element around
    // the target?
    const centerOverflow = {
      left: referenceElemRect.left - width * 0.5 < 0,
      right: referenceElemRect.right + width * 0.5 > viewPort.width,
      top: referenceElemRect.top - height * 0.5 < 0,
      bottom: referenceElemRect.bottom + height * 0.5 > viewPort.height
    };
    return {
      shouldAlignToLeft,
      shouldAlignToRight,
      hasSpaceAbove,
      hasSpaceBelow,
      centerOverflow
    };
  }

  class Transformer {
    constructor(pad, boxDirections, transformX, transformY) {
      this.pad = pad || 0;
      this.boxDirections = boxDirections || {
        left: true,
        right: true
      };
      this.transformX = transformX || function () {};
      this.transformY = transformY || function () {};
    }
    transform() {
      // no-op
    }
  }
  class TopTransformer extends Transformer {
    transform(targetBox, elementBox) {
      return {
        top: this.transformY(targetBox.top, targetBox, elementBox) + this.pad
      };
    }
  }
  class BottomTransFormer extends Transformer {
    transform(targetBox, elementBox) {
      return {
        top: this.transformY(targetBox.top, targetBox, elementBox) - elementBox.height - this.pad
      };
    }
  }
  class CenterTransformer extends Transformer {
    transform(targetBox, elementBox) {
      return {
        left: Math.floor(this.transformX(targetBox.left, targetBox, elementBox) - 0.5 * elementBox.width)
      };
    }
  }
  class MiddleTransformer extends Transformer {
    transform(targetBox, elementBox) {
      return {
        top: Math.floor(0.5 * (2 * targetBox.top + targetBox.height - elementBox.height))
      };
    }
  }
  class LeftTransformer extends Transformer {
    transform(targetBox, elementBox) {
      return {
        left: this.transformX(targetBox.left, targetBox, elementBox) + this.pad
      };
    }
  }
  class RightTransformer extends Transformer {
    transform(targetBox, elementBox) {
      return {
        left: this.transformX(targetBox.left, targetBox, elementBox) - elementBox.width - this.pad
      };
    }
  }
  class BelowTransformer extends Transformer {
    transform(targetBox, elementBox) {
      const top = targetBox.top + targetBox.height + this.pad;
      return elementBox.top < top ? {
        top
      } : {};
    }
  }
  const MIN_HEIGHT = 36; // Minimum Line Height
  const MIN_WIDTH = 36;
  class ShrinkingBoxTransformer extends Transformer {
    transform(targetBox, elementBox) {
      const retBox = {};
      if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
        retBox.top = targetBox.top + this.pad;
        retBox.height = Math.max(elementBox.height - (retBox.top - elementBox.top), MIN_HEIGHT);
      }
      if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
        retBox.left = targetBox.left + this.pad;
        retBox.width = Math.max(elementBox.width - (retBox.left - elementBox.left), MIN_WIDTH);
      }
      if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
        retBox.right = targetBox.left + targetBox.width - this.pad;
        retBox.width = Math.max(retBox.right - (retBox.left || elementBox.left), MIN_WIDTH);
      }
      if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
        retBox.bottom = targetBox.top + targetBox.height - this.pad;
        retBox.height = Math.max(retBox.bottom - (retBox.top || elementBox.top), MIN_HEIGHT);
      }
      return retBox;
    }
  }
  class BoundingBoxTransformer extends Transformer {
    transform(targetBox, elementBox) {
      const retBox = {};
      if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
        retBox.top = targetBox.top + this.pad;
      }
      if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
        retBox.left = targetBox.left + this.pad;
      }
      if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
        retBox.left = targetBox.left + targetBox.width - elementBox.width - this.pad;
      }
      if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
        retBox.top = targetBox.top + targetBox.height - elementBox.height - this.pad;
      }
      return retBox;
    }
  }
  class InverseBoundingBoxTransformer extends Transformer {
    transform(targetBox, elementBox) {
      const retBox = {};
      if (this.boxDirections.left && targetBox.left - this.pad < elementBox.left) {
        retBox.left = targetBox.left - this.pad;
      }
      if (this.boxDirections.right && elementBox.left + elementBox.width < targetBox.left + targetBox.width + this.pad) {
        retBox.left = targetBox.width + this.pad - elementBox.width + targetBox.left;
      }
      if (this.boxDirections.top && targetBox.top < elementBox.top + this.pad) {
        retBox.top = targetBox.top - this.pad;
      }
      if (this.boxDirections.bottom && elementBox.top + elementBox.height < targetBox.top + targetBox.height + this.pad) {
        retBox.top = targetBox.height + this.pad - elementBox.height + targetBox.top;
      }
      return retBox;
    }
  }
  const TransformFunctions = {
    center(input, targetBox) {
      return Math.floor(input + 0.5 * targetBox.width);
    },
    right(input, targetBox) {
      return input + targetBox.width;
    },
    left(input) {
      return input;
    },
    bottom(input, targetBox) {
      return input + targetBox.height;
    }
  };
  const Transformers = {
    top: TopTransformer,
    bottom: BottomTransFormer,
    center: CenterTransformer,
    middle: MiddleTransformer,
    left: LeftTransformer,
    right: RightTransformer,
    below: BelowTransformer,
    'bounding box': BoundingBoxTransformer,
    'shrinking box': ShrinkingBoxTransformer,
    'inverse bounding box': InverseBoundingBoxTransformer,
    default: Transformer
  };
  function toTransformFunctions(value) {
    return TransformFunctions[value] || TransformFunctions.left;
  }

  class TransformBuilder {
    type(value) {
      this._type = value;
      return this;
    }
    align(horizontal, vertical) {
      this._transformX = toTransformFunctions(horizontal);
      this._transformY = toTransformFunctions(vertical);
      return this;
    }
    pad(value) {
      this._pad = parseInt(value, 10);
      return this;
    }
    boxDirections(value) {
      this._boxDirections = value;
      return this;
    }
    build() {
      const AConstructor = Transformers[this._type] ? Transformers[this._type] : Transformers[Direction.Default];
      return new AConstructor(this._pad || 0, this._boxDirections || {}, this._transformX || toTransformFunctions(Direction.left), this._transformY || toTransformFunctions(Direction.left));
    }
  }

  class Constraint {
    constructor(type, config) {
      const {
        target,
        element,
        pad,
        boxDirections
      } = config;
      const {
        horizontal,
        vertical
      } = config.targetAlign;
      this._element = element;
      this._targetElement = target;
      this.destroyed = false;
      this._transformer = new TransformBuilder().type(type).align(horizontal, vertical).pad(pad).boxDirections(boxDirections).build();
    }
    detach() {
      this._disabled = true;
    }
    attach() {
      this._disabled = false;
    }
    computeDisplacement() {
      if (!this._disabled) {
        this._targetElement.refresh();
        this._element.refresh();
        this._pendingBox = this._transformer.transform(this._targetElement, this._element);
      }
      return this;
    }
    computePosition() {
      const el = this._element;
      if (!this._disabled) {
        Object.keys(this._pendingBox).forEach(key => {
          el.setDirection(key, this._pendingBox[key]);
        });
      }
      return this;
    }
    destroy() {
      this._element.release();
      this._targetElement.release();
      this._disabled = true;
      this.destroyed = true;
    }
  }

  class ElementProxy {
    constructor(el, id) {
      this.id = id;
      this.width = 0;
      this.height = 0;
      this.left = 0;
      this.top = 0;
      this.right = 0;
      this.bottom = 0;
      this._dirty = false;
      this._node = null;
      this._releaseCb = null;
      if (!el) {
        throw new Error('Element missing');
      }

      // W-3262919
      // for some reason I cannot figure out sometimes the
      // window, which clearly a window object, is not the window object
      // this will correct that. It might be related to locker
      if (WindowManager.isWindow(el)) {
        el = WindowManager.window;
      }
      this._node = el;
      this.setupObserver();
      this.refresh();
    }
    setupObserver() {
      // this check is because phantomjs does not support
      // mutation observers. The consqeuence here
      // is that any browser without mutation observers will
      // fail to update dimensions if they changwe after the proxy
      // is created and the proxy is not not refreshed
      if (WindowManager.MutationObserver && !this._node.isObserved) {
        // Use mutation observers to invalidate cache. It's magic!
        this._observer = new WindowManager.MutationObserver(this.refresh.bind(this));

        // do not observe the window
        if (!WindowManager.isWindow(this._node)) {
          this._observer.observe(this._node, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
          this._node.isObserved = true;
        }
      }
    }
    setReleaseCallback(cb, scope) {
      const scopeObj = scope || this;
      this._releaseCb = cb.bind(scopeObj);
    }
    checkNodeIsInDom() {
      // if underlying DOM node is gone,
      // this proxy should be released
      if (!isInDom(this._node)) {
        return false;
      }
      return true;
    }
    refresh() {
      const w = WindowManager.window;
      if (!this.isDirty()) {
        if (!this.checkNodeIsInDom()) {
          return this.release();
        }
        let box, x, scrollTop, scrollLeft;
        if (typeof w.pageYOffset !== 'undefined') {
          scrollTop = w.pageYOffset;
          scrollLeft = w.pageXOffset;
        } else {
          scrollTop = w.scrollY;
          scrollLeft = w.scrollX;
        }
        if (!WindowManager.isWindow(this._node)) {
          // force paint
          // eslint-disable-next-line no-unused-vars
          const offsetHeight = this._node.offsetHeight;
          box = this._node.getBoundingClientRect();

          // not using integers causes weird rounding errors
          // eslint-disable-next-line guard-for-in
          for (x in box) {
            this[x] = Math.floor(box[x]);
          }
          this.top = Math.floor(this.top + scrollTop);
          this.bottom = Math.floor(this.top + box.height);
          this.left = Math.floor(this.left + scrollLeft);
          this.right = Math.floor(this.left + box.width);
        } else {
          box = {};
          this.width = WindowManager.documentElement.clientWidth;
          this.height = WindowManager.documentElement.clientHeight;
          this.left = scrollLeft;
          this.top = scrollTop;
          this.right = WindowManager.documentElement.clientWidth + scrollLeft;
          this.bottom = WindowManager.documentElement.clientHeight;
        }
        this._dirty = false;
      }
      return this._dirty;
    }
    getNode() {
      return this._node;
    }
    isDirty() {
      return this._dirty;
    }
    bake() {
      const w = WindowManager.window;
      const absPos = this._node.getBoundingClientRect();
      const style = w.getComputedStyle(this._node) || this._node.style;
      const hasPageOffset = typeof w.pageYOffset !== 'undefined';
      const scrollTop = hasPageOffset ? w.pageYOffset : w.scrollY;
      const scrollLeft = hasPageOffset ? w.pageXOffset : w.scrollX;
      const originalLeft = style.left.match(/auto|fixed/) ? '0' : parseInt(style.left.replace('px', ''), 10);
      const originalTop = style.top.match(/auto|fixed/) ? '0' : parseInt(style.top.replace('px', ''), 10);
      const leftDif = Math.round(this.left - (absPos.left + scrollLeft));
      const topDif = this.top - (absPos.top + scrollTop);
      this._node.style.left = `${originalLeft + leftDif}px`;
      this._node.style.top = `${originalTop + topDif}px`;
      if (this._restoreSize) {
        // Only store the first height/width which is the original height/width.
        if (this.originalHeight === undefined) {
          this.originalHeight = this._node.style.height;
        }
        if (this.originalWidth === undefined) {
          this.originalWidth = this._node.style.width;
        }
        this._node.style.width = `${this.width}px`;
        this._node.style.height = `${this.height}px`;
      }
      this._dirty = false;
    }
    setDirection(direction, val) {
      this[direction] = val;
      this._dirty = true;
      // if size is changed, should restore the original size.
      if (direction === 'height' || direction === 'width') {
        this._restoreSize = true;
      }
    }
    release() {
      if (this._restoreSize) {
        this._node.style.width = this.originalWidth;
        this._node.style.height = this.originalHeight;
        if (this._removeMinHeight) {
          this._node.style.minHeight = '';
        }
      }
      if (this._releaseCb) {
        this._releaseCb(this);
      }

      // Due to https://github.com/salesforce/lwc/pull/1423
      // require to call disconnect explicitly.
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
    }
    querySelectorAll(selector) {
      return this._node.querySelectorAll(selector);
    }
  }

  class ProxyCache {
    constructor() {
      this.proxyCache = {};
    }
    get count() {
      return Object.keys(this.proxyCache).length;
    }
    releaseOrphanProxies() {
      for (const proxy in this.proxyCache) {
        if (!this.proxyCache[proxy].el.checkNodeIsInDom()) {
          this.proxyCache[proxy].el.release();
        }
      }
    }
    bakeOff() {
      for (const proxy in this.proxyCache) {
        if (this.proxyCache[proxy].el.isDirty()) {
          this.proxyCache[proxy].el.bake();
        }
      }
    }
    getReferenceCount(proxy) {
      const id = proxy.id;
      if (!id || !this.proxyCache[id]) {
        return 0;
      }
      return this.proxyCache[id].refCount;
    }
    release(proxy) {
      const proxyInstance = this.proxyCache[proxy.id];
      if (proxyInstance) {
        --proxyInstance.refCount;
      }
      if (proxyInstance && proxyInstance.refCount <= 0) {
        delete this.proxyCache[proxy.id];
      }
    }
    reset() {
      this.proxyCache = {};
    }
    create(element) {
      let key = 'window';
      if (!WindowManager.isWindow(element)) {
        key = element ? element.getAttribute(POSITION_ATTR_NAME) : null;
        // 1 - Node.ELEMENT_NODE, 11 - Node.DOCUMENT_FRAGMENT_NODE
        assert(key && element.nodeType && (element.nodeType !== 1 || element.nodeType !== 11), `Element Proxy requires an element and has property ${POSITION_ATTR_NAME}`);
      }
      if (this.proxyCache[key]) {
        this.proxyCache[key].refCount++;
        return this.proxyCache[key].el;
      }
      const newProxy = new ElementProxy(element, key);
      newProxy.setReleaseCallback(release, newProxy);
      this.proxyCache[key] = {
        el: newProxy,
        refCount: 1
      };

      // run GC
      timeout(0).then(() => {
        this.releaseOrphanProxies();
      });
      return this.proxyCache[key].el;
    }
  }
  lwc.registerDecorators(ProxyCache, {
    fields: ["proxyCache"]
  });
  const elementProxyCache = new ProxyCache();
  function bakeOff() {
    elementProxyCache.bakeOff();
  }
  function release(proxy) {
    return elementProxyCache.release(proxy);
  }
  function createProxy(element) {
    return elementProxyCache.create(element);
  }

  class RepositionQueue {
    constructor() {
      this.callbacks = [];
      this.repositionScheduled = false;
      this._constraints = [];
      this.timeoutId = 0;
      this.lastIndex = getZIndexBaseline();
      this.eventsBound = false;
    }
    get nextIndex() {
      return this.lastIndex++;
    }
    get constraints() {
      return this._constraints;
    }
    set constraints(value) {
      this._constraints = this._constraints.concat(value);
    }
    dispatchRepositionCallbacks() {
      while (this.callbacks.length > 0) {
        this.callbacks.shift()();
      }
    }
    add(callback) {
      if (typeof callback === 'function') {
        this.callbacks.push(callback);
        return true;
      }
      return false;
    }
    scheduleReposition(callback) {
      if (this.timeoutId === 0) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.timeoutId = setTimeout(() => {
          this.reposition(callback);
        }, 10);
      }
    }
    reposition(callback) {
      // all the callbacks will be called
      if (typeof callback === 'function') {
        this.callbacks.push(callback);
      }
      // this is for throttling
      clearTimeout(this.timeoutId);
      this.timeoutId = 0;

      // this semaphore is to make sure
      // if reposition is called twice within one frame
      // we only run this once
      if (!this.repositionScheduled) {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
          this.repositionScheduled = false;
          // this must be executed in order or constraints
          // will behave oddly
          this._constraints = this._constraints.filter(constraint => {
            if (!constraint.destroyed) {
              constraint.computeDisplacement().computePosition();
              return true;
            }
            return false;
          });
          bakeOff();
          this.dispatchRepositionCallbacks();
        });
        this.repositionScheduled = true;
      }
    }
    get repositioning() {
      if (!this._reposition) {
        this._reposition = this.scheduleReposition.bind(this);
      }
      return this._reposition;
    }
    bindEvents() {
      if (!this.eventsBound) {
        window.addEventListener('resize', this.repositioning);
        window.addEventListener('scroll', this.repositioning);
        this.eventsBound = true;
      }
    }
    detachEvents() {
      window.removeEventListener('resize', this.repositioning);
      window.removeEventListener('scroll', this.repositioning);
      this.eventsBound = false;
    }
    rebase(index) {
      if (this.lastIndex <= index) {
        this.lastIndex = index + 1;
      }
    }
  }
  lwc.registerDecorators(RepositionQueue, {
    fields: ["callbacks", "repositionScheduled", "_constraints", "timeoutId", "lastIndex", "eventsBound"]
  });
  const positionQueue = new RepositionQueue();
  function scheduleReposition(callback) {
    positionQueue.scheduleReposition(callback);
  }
  function bindEvents() {
    positionQueue.bindEvents();
  }
  function addConstraints(list) {
    positionQueue.constraints = list;
  }
  function reposition(callback) {
    positionQueue.reposition(callback);
  }
  function nextIndex() {
    return positionQueue.nextIndex;
  }
  function rebaseIndex(index) {
    return positionQueue.rebase(index);
  }

  class Relationship {
    constructor(config, constraintList, scrollableParent, observer) {
      this.config = config;
      this.constraintList = constraintList;
      this.scrollableParent = scrollableParent;
      this.observer = observer;
    }
    disable() {
      this.constraintList.forEach(constraintToDisable => {
        constraintToDisable.detach();
      });
    }
    enable() {
      this.constraintList.forEach(constraintToEnable => {
        constraintToEnable.attach();
      });
    }
    destroy() {
      if (this.config.removeListeners) {
        this.config.removeListeners();
        this.config.removeListeners = undefined;
      }
      while (this.constraintList.length > 0) {
        this.constraintList.pop().destroy();
      }

      // Clean up node appended to body of dom
      if (this.config.appendToBody && this.config.element) {
        // eslint-disable-next-line @lwc/lwc/no-document-query
        const nodeToRemove = document.querySelector(`[${POSITION_ATTR_NAME}="${this.config.element.getAttribute(POSITION_ATTR_NAME)}"]`);
        if (nodeToRemove) {
          nodeToRemove.parentNode.removeChild(nodeToRemove);
        }
      }

      // Due to https://github.com/salesforce/lwc/pull/1423
      // require to call disconnect explicitly.
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
    reposition() {
      return new Promise(resolve => {
        reposition(() => {
          resolve();
        });
      });
    }
  }

  const DEFAULT_MIN_HEIGHT = '1.875rem';
  function setupObserver(config, scrollableParent) {
    const observedElement = config.element;
    let observer = null;
    if (WindowManager.MutationObserver && !observedElement.isObserved) {
      observer = new WindowManager.MutationObserver(() => {});
      observer.observe(observedElement, {
        attributes: true,
        subtree: true,
        childList: true
      });
      observedElement.isObserved = true;
    }
    if (scrollableParent) {
      scrollableParent.addEventListener('scroll', scheduleReposition);
      config.removeListeners = () => {
        scrollableParent.removeEventListener('scroll', scheduleReposition);
      };
    }
    return observer;
  }
  function validateConfig(config) {
    assert(config.element && isDomNode(config.element), 'Element is undefined or missing, or not a Dom Node');
    assert(config.target && (WindowManager.isWindow(config.target) || isDomNode(config.target)), 'Target is undefined or missing');
  }
  function createRelationship(config) {
    bindEvents();
    if (config.alignWidth && config.element.style.position === 'fixed') {
      config.element.style.width = config.target.getBoundingClientRect().width + 'px';
    }
    const constraintList = [];
    const scrollableParent = getScrollableParent(getPositionTarget(config.target), WindowManager.window);

    // This observer and the test for scrolling children
    // is so that if a panel contains a scroll we do not
    // proxy the events to the "parent"  (actually the target's parent)
    const observer = setupObserver(config, scrollableParent);
    if (config.appendToBody) {
      document.body.appendChild(config.element);
    }
    config.element = createProxy(config.element);
    config.target = createProxy(config.target);

    // Add horizontal constraint.
    const horizontalConfig = Object.assign({}, config);
    if (horizontalConfig.padLeft !== undefined) {
      horizontalConfig.pad = horizontalConfig.padLeft;
    }

    // Add vertical constraint.
    const verticalConfig = Object.assign({}, config);
    if (verticalConfig.padTop !== undefined) {
      verticalConfig.pad = verticalConfig.padTop;
    }
    constraintList.push(new Constraint(mapToHorizontal(config.align.horizontal), horizontalConfig));
    constraintList.push(new Constraint(mapToVertical(config.align.vertical), verticalConfig));
    const autoShrink = config.autoShrink.height || config.autoShrink.width;
    if (config.scrollableParentBound && scrollableParent) {
      const parent = normalizeElement(scrollableParent);
      const boxConfig = {
        element: config.element,
        enabled: config.enabled,
        target: createProxy(parent),
        align: {},
        targetAlign: {},
        pad: 3,
        boxDirections: {
          top: true,
          bottom: true,
          left: true,
          right: true
        }
      };
      if (autoShrink) {
        const style = boxConfig.element.getNode().style;
        if (!style.minHeight) {
          style.minHeight = config.minHeight;
          boxConfig.element._removeMinHeight = true;
        }
        boxConfig.boxDirections = {
          top: !!config.autoShrink.height,
          bottom: !!config.autoShrink.height,
          left: !!config.autoShrink.width,
          right: !!config.autoShrink.width
        };
        constraintList.push(new Constraint('shrinking box', boxConfig));
      } else {
        constraintList.push(new Constraint('bounding box', boxConfig));
      }
    }
    if (config.keepInViewport) {
      constraintList.push(new Constraint('bounding box', {
        element: config.element,
        enabled: config.enabled,
        target: createProxy(window),
        align: {},
        targetAlign: {},
        pad: 3,
        boxDirections: {
          top: true,
          bottom: true,
          left: true,
          right: true
        }
      }));
    }
    addConstraints(constraintList);
    reposition();
    return new Relationship(config, constraintList, scrollableParent, observer);
  }
  function isAutoFlipHorizontal(config) {
    return config.autoFlip || config.autoFlipHorizontal;
  }
  function isAutoFlipVertical(config) {
    return config.autoFlip || config.autoFlipVertical;
  }
  function normalizeAlignments(config, flipConfig) {
    const align = {
      horizontal: config.align.horizontal,
      vertical: config.align.vertical
    };
    const targetAlign = {
      horizontal: config.targetAlign.horizontal,
      vertical: config.targetAlign.vertical
    };

    // Horizontal alignments flip for RTL languages.
    if (document.dir === 'rtl') {
      align.horizontal = flipDirection(align.horizontal);
      targetAlign.horizontal = flipDirection(targetAlign.horizontal);
    }

    // When using the autoFlip flags with center alignment, we change the element alignment to fit
    // within the viewport when it's detected that it overflows the edge of the viewport.

    let vFlip = false;
    if (isAutoFlipVertical(config)) {
      if (align.vertical === Direction.Bottom) {
        vFlip = !flipConfig.hasSpaceAbove && flipConfig.hasSpaceBelow;
      } else if (align.vertical === Direction.Top) {
        vFlip = flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow;
      } else if (align.vertical === Direction.Center) {
        if (flipConfig.centerOverflow.top && !flipConfig.centerOverflow.bottom) {
          align.vertical = targetAlign.vertical = Direction.Top;
        } else if (flipConfig.centerOverflow.bottom && !flipConfig.centerOverflow.top) {
          align.vertical = targetAlign.vertical = Direction.Bottom;
        }
      }
    }
    let hFlip = false;
    if (isAutoFlipHorizontal(config)) {
      if (align.horizontal === Direction.Left) {
        hFlip = flipConfig.shouldAlignToRight;
      } else if (align.horizontal === Direction.Right) {
        hFlip = flipConfig.shouldAlignToLeft;
      } else if (align.horizontal === Direction.Center) {
        if (flipConfig.centerOverflow.left && !flipConfig.centerOverflow.right) {
          align.horizontal = targetAlign.horizontal = Direction.Left;
        } else if (flipConfig.centerOverflow.right && !flipConfig.centerOverflow.left) {
          align.horizontal = targetAlign.horizontal = Direction.Right;
        }
      }
    }
    return {
      align: {
        horizontal: hFlip ? flipDirection(align.horizontal) : normalizeDirection(align.horizontal, Direction.Left),
        vertical: vFlip ? flipDirection(align.vertical) : normalizeDirection(align.vertical, Direction.Top)
      },
      targetAlign: {
        horizontal: hFlip ? flipDirection(targetAlign.horizontal) : normalizeDirection(targetAlign.horizontal, Direction.Left),
        vertical: vFlip ? flipDirection(targetAlign.vertical) : normalizeDirection(targetAlign.vertical, Direction.Bottom)
      }
    };
  }
  function normalizeConfig(config) {
    config.align = config.align || {};
    config.targetAlign = config.targetAlign || {};
    const flipConfig = checkFlipPossibility(config.element, config.target, config.leftAsBoundary);
    const {
      align,
      targetAlign
    } = normalizeAlignments(config, flipConfig);

    // When inside modal, element may expand out of the viewport and be cut off.
    // So if inside modal, and don't have enough space above or below, will add bounding box rule.
    if (config.isInsideModal && !flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow) {
      config.scrollableParentBound = true;
    }
    return {
      target: config.target,
      element: config.element,
      align,
      targetAlign,
      alignWidth: config.alignWidth,
      scrollableParentBound: config.scrollableParentBound,
      keepInViewport: config.keepInViewport,
      pad: config.pad,
      padTop: config.padTop,
      padLeft: config.padLeft,
      autoShrink: {
        height: config.autoShrink || config.autoShrinkHeight,
        width: config.autoShrink || config.autoShrinkWidth
      },
      minHeight: config.minHeight || DEFAULT_MIN_HEIGHT
    };
  }
  function toElement(root, target) {
    if (target && typeof target === 'string') {
      return root.querySelector(target);
    } else if (target && typeof target === 'function') {
      return target();
    }
    return target;
  }
  function startPositioning(root, config) {
    assert(root, 'Root is undefined or missing');
    assert(config, 'Config is undefined or missing');
    const node = normalizeElement(root);
    const target = toElement(node, config.target);
    const element = toElement(node, config.element);

    // when target/element is selector, there is chance, dom isn't present anymore.
    if (!target || !element) {
      return null;
    }
    config.target = normalizeElement(target);
    config.element = normalizeElement(element);
    const result = isInsideModal(config.element);
    config.isInsideModal = result.isInside;

    // stackManager will increase the zIndex too.
    // if detect inside modal, read modal zindex and rebase to it.
    if (config.isInsideModal && result.overlay) {
      const index = parseInt(result.overlay.style.zIndex, 10);
      rebaseIndex(index);
    }

    // Also should check if target inside modal too.
    const targetResult = isInsideModal(config.target);
    config.isInsideModal = targetResult.isInside;

    // if detect inside modal, read modal zindex and rebase to it.
    if (config.isInsideModal && targetResult.overlay) {
      const index = parseInt(targetResult.overlay.style.zIndex, 10);
      rebaseIndex(index);
    }

    // Element absolute / fixed must be set prior to getBoundingClientRect call or
    // the scrollable parent (usually due to uiModal/uiPanel) will push the page down.
    config.element = normalizePosition(config.element, nextIndex(), config.target, config.alignWidth);
    validateConfig(config);
    return createRelationship(normalizeConfig(config));
  }
  function stopPositioning(relationship) {
    if (relationship) {
      relationship.destroy();
    }
  }
  class AutoPosition {
    constructor(root) {
      this._autoPositionUpdater = null;
      this._root = root;
    }
    start(config) {
      return requestAnimationFrameAsPromise().then(() => {
        let promise = Promise.resolve();
        if (!this._autoPositionUpdater) {
          this._autoPositionUpdater = startPositioning(this._root, config);
        } else {
          promise = promise.then(() => {
            return this._autoPositionUpdater.reposition();
          });
        }
        return promise.then(() => {
          return this._autoPositionUpdater;
        });
      });
    }
    stop() {
      if (this._autoPositionUpdater) {
        stopPositioning(this._autoPositionUpdater);
        this._autoPositionUpdater = null;
      }
      return Promise.resolve();
    }
  }
  lwc.registerDecorators(AutoPosition, {
    fields: ["_autoPositionUpdater"]
  });

  function tmpl$3($api, $cmp, $slotset, $ctx) {
    const {
      b: api_bind,
      h: api_element
    } = $api;
    const {
      _m0
    } = $ctx;
    return [api_element("div", {
      classMap: {
        "slds-popover__body": true
      },
      context: {
        lwc: {
          dom: "manual"
        }
      },
      key: 0,
      on: {
        "mouseleave": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseLeave))
      }
    }, [])];
  }

  var _tmpl$2 = lwc.registerTemplate(tmpl$3);
  tmpl$3.stylesheets = [];
  tmpl$3.stylesheetTokens = {
    hostAttribute: "lightning-primitiveBubble_primitiveBubble-host",
    shadowAttribute: "lightning-primitiveBubble_primitiveBubble"
  };

  const DEFAULT_ALIGN = {
    horizontal: 'left',
    vertical: 'bottom'
  };
  class LightningPrimitiveBubble extends lwc.LightningElement {
    constructor(...args) {
      super(...args);
      this.state = {
        visible: false,
        contentId: ''
      };
      this.divElement = void 0;
    }
    get contentId() {
      return this.state.contentId;
    }
    set contentId(value) {
      this.state.contentId = value;
      if (this.state.inDOM) {
        this.divEl.setAttribute('id', this.state.contentId);
      }
    }
    connectedCallback() {
      this.updateClassList();
      this.state.inDOM = true;
    }
    disconnectedCallback() {
      this.state.inDOM = false;
    }
    renderedCallback() {
      // set content manually once rendered
      // - this is required to avoid the content update being in the wrong 'tick'
      this.setContentManually();
      this.setIdManually();
    }
    set content(value) {
      this.state.content = value;
      if (this.state.inDOM) {
        this.setContentManually();
      }
    }
    get content() {
      return this.state.content || '';
    }
    get align() {
      return this.state.align || DEFAULT_ALIGN;
    }
    set align(value) {
      this.state.align = value;
      this.updateClassList();
    }
    get visible() {
      return this.state.visible;
    }
    set visible(value) {
      this.state.visible = value;
      this.updateClassList();
    }
    setIdManually() {
      this.divElement = this.divElement ? this.divElement : this.template.querySelector('div');
      this.divElement.setAttribute('id', this.state.contentId);
    }

    // manually set the content value
    setContentManually() {
      /* manipulate DOM directly */
      this.template.querySelector('.slds-popover__body').textContent = this.state.content;
    }

    // compute class value for this bubble
    updateClassList() {
      const classes = classSet('slds-popover').add('slds-popover_tooltip');

      // show or hide bubble
      classes.add({
        'slds-rise-from-ground': this.visible,
        'slds-fall-into-ground': !this.visible
      });

      // apply the proper nubbin CSS class
      const {
        horizontal,
        vertical
      } = this.align;
      classes.add({
        'slds-nubbin_top-left': horizontal === 'left' && vertical === 'top',
        'slds-nubbin_top-right': horizontal === 'right' && vertical === 'top',
        'slds-nubbin_bottom-left': horizontal === 'left' && vertical === 'bottom',
        'slds-nubbin_bottom-right': horizontal === 'right' && vertical === 'bottom',
        'slds-nubbin_bottom': horizontal === 'center' && vertical === 'bottom',
        'slds-nubbin_top': horizontal === 'center' && vertical === 'top',
        'slds-nubbin_left': horizontal === 'left' && vertical === 'center',
        'slds-nubbin_right': horizontal === 'right' && vertical === 'center'
      });
      classListMutation(this.classList, classes);
    }
    handleMouseLeave() {
      this.visible = false;
    }
  }
  lwc.registerDecorators(LightningPrimitiveBubble, {
    publicProps: {
      contentId: {
        config: 3
      },
      content: {
        config: 3
      },
      align: {
        config: 3
      },
      visible: {
        config: 3
      }
    },
    track: {
      state: 1
    },
    fields: ["divElement"]
  });
  var LightningPrimitiveBubble$1 = lwc.registerComponent(LightningPrimitiveBubble, {
    tmpl: _tmpl$2
  });

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  const BUBBLE_ID = `salesforce-lightning-tooltip-bubble_${guid()}`;
  function isResizeObserverSupported() {
    return window.ResizeObserver != null;
  }
  function buildResizeObserver(callback) {
    if (isResizeObserverSupported()) {
      return new ResizeObserver(callback);
    }
    return {
      observe() {},
      unobserve() {}
    };
  }
  /**
   * Shared instance of a primitive bubble used as a tooltip by most components. This was originally
   * defined in the helptext component which is where the minWidth style came from.
   * TODO: We may want to revisit the minWidth style with the PO and/or UX.
   */
  let CACHED_BUBBLE_ELEMENT;
  function getCachedBubbleElement() {
    if (!CACHED_BUBBLE_ELEMENT) {
      CACHED_BUBBLE_ELEMENT = lwc.createElement('lightning-primitive-bubble', {
        is: LightningPrimitiveBubble$1
      });
      CACHED_BUBBLE_ELEMENT.contentId = BUBBLE_ID;
      CACHED_BUBBLE_ELEMENT.style.position = 'absolute';
      CACHED_BUBBLE_ELEMENT.style.minWidth = '75px';
      // hide bubble element on create
      CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
      CACHED_BUBBLE_ELEMENT.addEventListener('transitionend', () => {
        // W-7201022 https://gus.lightning.force.com/lightning/r/ADM_Work__c/a07B00000079kNjIAI/view
        // The tooltip uses absolute positioning and visibility gets set to hidden to
        // hide it from view which means it's still part of the document layout.
        // If we don't hide the bubble it could stay on the page and accidentally scroll pages
        // in the console app after a tab switch, especially when the tab content lengths differ.
        if (!CACHED_BUBBLE_ELEMENT.visible) {
          CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
        }
      });
    }
    return CACHED_BUBBLE_ELEMENT;
  }
  const ARIA_DESCRIBEDBY = 'aria-describedby';

  /**
   * Used as a position offset to compensate for the nubbin. The dimensions of the nubbin are not
   * included in the position library bounding box calculations. This is the size in pixels of the
   * nubbin.
   * TODO: We may want to measure this instead in cases it changes.
   */
  const NUBBIN_SIZE = 16;

  /**
   * Used in the calculation that moves the tooltip to a location that places the nubbin at the
   * center of the target element. This is the nubbin offset from the edge of the bubble in pixels
   * when using slds-nubbin_bottom-left or slds-nubbin_bottom-right.
   * TODO: We may want to measure this instead in case it changes.
   */
  const NUBBIN_OFFSET = 24;

  /**
   * Known tooltip types:
   * - info: used in cases where target already has click handlers such as button-icon
   * - toggle: used in cases where target only shows a tooltip such as helptext
   */
  const TooltipType = {
    Info: 'info',
    Toggle: 'toggle'
  };

  /**
   * Allows us to attach a tooltip to components. Typical usage is as follows:
   * - Create an instance of Tooltip
   * - Call Tooltip.initialize() to add the appropriate listeners to the element that needs a tooltip
   * See buttonIcon and buttonMenu for example usage.
   */
  class Tooltip {
    /**
     * A shared instance of primitiveBubble is used when an element is not specified in the config
     * object.
     * @param {string} value the content of the tooltip
     * @param {object} config specifies the root component, target element of the tooltip
     */
    constructor(value, config) {
      this._autoPosition = null;
      this._disabled = true;
      this._initialized = false;
      this._visible = false;
      this._config = {};
      assert(config.target, 'target for tooltip is undefined or missing');
      this.value = value;
      this._root = config.root;
      this._target = config.target;
      this._config = _objectSpread({}, config);
      this._config.align = config.align || {};
      this._config.targetAlign = config.targetAlign || {};
      this._type = normalizeString(config.type, {
        fallbackValue: TooltipType.Info,
        validValues: Object.values(TooltipType)
      });

      // If a tooltip element is not given, fall back on the globally shared instance.
      this._element = config.element;
      if (!this._element) {
        this._element = getCachedBubbleElement;
        const bubbleElement = getCachedBubbleElement();
        if (bubbleElement.parentNode === null) {
          document.body.appendChild(bubbleElement);
        }
      }
      this.handleDocumentTouch = this.handleDocumentTouch.bind(this);
    }

    /**
     * Disables the tooltip.
     */
    detach() {
      this._disabled = true;
    }

    /**
     * Enables the tooltip.
     */
    attach() {
      this._disabled = false;
    }

    /**
     * Adds the appropriate event listeners to the target element to make the tooltip appear. Also
     * links the tooltip and target element via the aria-describedby attribute for screen readers.
     */
    initialize() {
      const target = this._target();
      if (!this._initialized && target) {
        switch (this._type) {
          case TooltipType.Toggle:
            this.addToggleListeners();
            break;
          case TooltipType.Info:
          default:
            this.addInfoListeners();
            break;
        }
        const ariaDescribedBy = normalizeAriaAttribute([target.getAttribute(ARIA_DESCRIBEDBY), this._element().contentId]);
        target.setAttribute(ARIA_DESCRIBEDBY, ariaDescribedBy);
        this._initialized = true;
      }
    }
    addInfoListeners() {
      const target = this._target();
      if (!this._initialized && target) {
        ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show()));
        // Unlike the tooltip in Aura, we want clicks and keys to dismiss the tooltip.
        ['mouseleave', 'blur', 'click', 'keydown'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
      }
    }
    hideIfNotSelfCover(event) {
      if (event.type === 'mouseleave' && event.clientX && event.clientY) {
        // In any chance, if mouseleave is caused by tooltip itself, it would means
        // tooltip cover the target which mostly caused by dynamic resize of tooltip by CSS or JS.
        try {
          const elementMouseIsOver = document.elementFromPoint ? document.elementFromPoint(event.clientX, event.clientY) : null;
          if (elementMouseIsOver === this._element()) {
            if (!isResizeObserverSupported()) {
              this.startPositioning();
            }
            return;
          }
        } catch (ex) {
          // Jest Throw Exception
        }
      }
      this.hide();
    }
    handleDocumentTouch() {
      if (this._visible) {
        this.hide();
      }
    }
    addToggleListeners() {
      const target = this._target();
      if (!this._initialized && target) {
        target.addEventListener('touchstart', e => {
          e.stopPropagation();
          this.toggle();
        });
        ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show()));
        ['mouseleave', 'blur'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
      }
    }
    get resizeObserver() {
      if (!this._resizeObserver) {
        this._resizeObserver = buildResizeObserver(() => {
          if (this._visible && this._autoPosition) {
            this.startPositioning();
          }
        });
      }
      return this._resizeObserver;
    }
    show() {
      if (this._disabled) {
        return;
      }
      this._visible = true;
      const tooltip = this._element();

      /* We only change the visibility of the cached bubble element here,
         for custom bubble elements, we expect them to react to `visible`
         property change */
      if (CACHED_BUBBLE_ELEMENT) {
        // Show cached bubble element
        CACHED_BUBBLE_ELEMENT.classList.remove('slds-hide');
      }
      tooltip.content = this._value;
      this.startPositioning();
      document.addEventListener('touchstart', this.handleDocumentTouch);
      this.resizeObserver.observe(tooltip);
    }
    hide() {
      this._visible = false;
      const tooltip = this._element();
      tooltip.visible = this._visible;
      this.stopPositioning();
      document.removeEventListener('touchstart', this.handleDocumentTouch);
      this.resizeObserver.unobserve(tooltip);
    }
    toggle() {
      if (this._visible) {
        this.hide();
      } else {
        this.show();
      }
    }
    get value() {
      return this._value;
    }
    set value(value) {
      this._value = value;
      this._disabled = !value;
    }
    get initialized() {
      return this._initialized;
    }
    get visible() {
      return this._visible;
    }
    startPositioning() {
      if (!this._autoPosition) {
        this._autoPosition = new AutoPosition(this._root);
      }

      // The lightning-helptext component was originally left aligned.
      const align = {
        horizontal: this._config.align.horizontal || Direction.Left,
        vertical: this._config.align.vertical || Direction.Bottom
      };
      const targetAlign = {
        horizontal: this._config.targetAlign.horizontal || Direction.Left,
        vertical: this._config.targetAlign.vertical || Direction.Top
      };

      // Pads the tooltip so its nubbin is at the center of the target element.
      const targetBox = this._target().getBoundingClientRect();
      const padLeft = targetBox.width * 0.5 - NUBBIN_OFFSET;
      this._autoPosition.start({
        target: this._target,
        element: this._element,
        align,
        targetAlign,
        autoFlip: true,
        padTop: NUBBIN_SIZE,
        padLeft
      }).then(autoPositionUpdater => {
        // The calculation above may have flipped the alignment of the tooltip. When the
        // tooltip changes alignment we need to update the nubbin class to have it draw in
        // the appropriate place.
        if (autoPositionUpdater) {
          const tooltip = this._element();
          tooltip.align = autoPositionUpdater.config.align;
          tooltip.visible = this._visible;
        }
      });
    }
    stopPositioning() {
      if (this._autoPosition) {
        this._autoPosition.stop();
      }
    }
  }
  lwc.registerDecorators(Tooltip, {
    fields: ["_autoPosition", "_disabled", "_initialized", "_visible", "_config"]
  });

  function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
    return "_:-ms-lang(x)" + shadowSelector + ", svg" + shadowSelector + " {pointer-events: none;}\n";
  }
  var _implicitStylesheets$1 = [stylesheet$1];

  function tmpl$4($api, $cmp, $slotset, $ctx) {
    const {
      fid: api_scoped_frag_id,
      h: api_element
    } = $api;
    return [api_element("svg", {
      className: $cmp.computedClass,
      attrs: {
        "focusable": "false",
        "data-key": $cmp.name,
        "aria-hidden": "true"
      },
      key: 1
    }, [api_element("use", {
      attrs: {
        "xlink:href": lwc.sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
      },
      key: 0
    }, [])])];
  }

  var _tmpl$3 = lwc.registerTemplate(tmpl$4);
  tmpl$4.stylesheets = [];

  if (_implicitStylesheets$1) {
    tmpl$4.stylesheets.push.apply(tmpl$4.stylesheets, _implicitStylesheets$1);
  }
  tmpl$4.stylesheetTokens = {
    hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
    shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
  };

  var dir = 'ltr';

  // Taken from https://github.com/jonathantneal/svg4everybody/pull/139
  // Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
  const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
  const inIframe = window.top !== window.self;
  const isIframeInEdge = isEdgeUA && inIframe;
  var isIframeInEdge$1 = lwc.registerComponent(isIframeInEdge, {
    tmpl: _tmpl
  });

  // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
  function fetchSvg(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr);
          }
        }
      };
    });
  }

  // Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L89-L98
  // Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
  // Modify at your own risk!
  const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
  const webkitUA = /\bAppleWebKit\/(\d+)\b/;
  const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
  const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
  const supportsSvg = !isIE && !isIframeInEdge$1;
  var supportsSvg$1 = lwc.registerComponent(supportsSvg, {
    tmpl: _tmpl
  });

  /**
  This polyfill injects SVG sprites into the document for clients that don't
  fully support SVG. We do this globally at the document level for performance
  reasons. This causes us to lose namespacing of IDs across sprites. For example,
  if both #image from utility sprite and #image from doctype sprite need to be
  rendered on the page, both end up as #image from the doctype sprite (last one
  wins). SLDS cannot change their image IDs due to backwards-compatibility
  reasons so we take care of this issue at runtime by adding namespacing as we
  polyfill SVG elements.

  For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
  replace the "#approval" id with "#${namespace}-approval" and a similar
  operation is done on the corresponding symbol element.
  **/
  const svgTagName = /svg/i;
  const isSvgElement = el => el && svgTagName.test(el.nodeName);
  const requestCache = {};
  const symbolEls = {};
  const svgFragments = {};
  const spritesContainerId = 'slds-svg-sprites';
  let spritesEl;
  function polyfill(el) {
    if (!supportsSvg$1 && isSvgElement(el)) {
      if (!spritesEl) {
        spritesEl = document.createElement('svg');
        spritesEl.xmlns = 'http://www.w3.org/2000/svg';
        spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
        spritesEl.style.display = 'none';
        spritesEl.id = spritesContainerId;
        document.body.insertBefore(spritesEl, document.body.childNodes[0]);
      }
      Array.from(el.getElementsByTagName('use')).forEach(use => {
        // We access the href differently in raptor and in aura, probably
        // due to difference in the way the svg is constructed.
        const src = use.getAttribute('xlink:href') || use.getAttribute('href');
        if (src) {
          // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
          // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
          const parts = src.split('#');
          const url = parts[0];
          const id = parts[1];
          const namespace = url.replace(/[^\w]/g, '-');
          const href = `#${namespace}-${id}`;
          if (url.length) {
            // set the HREF value to no longer be an external reference
            if (use.getAttribute('xlink:href')) {
              use.setAttribute('xlink:href', href);
            } else {
              use.setAttribute('href', href);
            }

            // only insert SVG content if it hasn't already been retrieved
            if (!requestCache[url]) {
              requestCache[url] = fetchSvg(url);
            }
            requestCache[url].then(svgContent => {
              // create a document fragment from the svgContent returned (is parsed by HTML parser)
              if (!svgFragments[url]) {
                const svgFragment = document.createRange().createContextualFragment(svgContent);
                svgFragments[url] = svgFragment;
              }
              if (!symbolEls[href]) {
                const svgFragment = svgFragments[url];
                const symbolEl = svgFragment.querySelector(`#${id}`);
                symbolEls[href] = true;
                symbolEl.id = `${namespace}-${id}`;
                spritesEl.appendChild(symbolEl);
              }
            });
          }
        }
      });
    }
  }

  const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
  let pathPrefix;
  const tokenNameMap = Object.assign(Object.create(null), {
    action: 'lightning.actionSprite',
    custom: 'lightning.customSprite',
    doctype: 'lightning.doctypeSprite',
    standard: 'lightning.standardSprite',
    utility: 'lightning.utilitySprite'
  });
  const tokenNameMapRtl = Object.assign(Object.create(null), {
    action: 'lightning.actionSpriteRtl',
    custom: 'lightning.customSpriteRtl',
    doctype: 'lightning.doctypeSpriteRtl',
    standard: 'lightning.standardSpriteRtl',
    utility: 'lightning.utilitySpriteRtl'
  });
  const defaultTokenValueMap = Object.assign(Object.create(null), {
    'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
    'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
    'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
    'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
    'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
    'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
    'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
    'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
    'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
    'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
  });
  const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];
  const getBaseIconPath = (category, direction) => {
    const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
    return configProvider.getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
  };
  const getMatchAtIndex = index => iconName => {
    const result = validNameRe.exec(iconName);
    return result ? result[index] : '';
  };
  const getCategory = getMatchAtIndex(1);
  const getName = getMatchAtIndex(2);
  const isValidName = iconName => validNameRe.test(iconName);
  const getIconPath = (iconName, direction = 'ltr') => {
    pathPrefix = pathPrefix !== undefined ? pathPrefix : configProvider.getPathPrefix();
    if (isValidName(iconName)) {
      const baseIconPath = getBaseIconPath(getCategory(iconName), direction);
      if (baseIconPath) {
        // This check was introduced the following MS-Edge issue:
        // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
        // If and when this get fixed, we can safely remove this block of code.
        if (isIframeInEdge$1) {
          // protocol => 'https:' or 'http:'
          // host => hostname + port
          const origin = `${window.location.protocol}//${window.location.host}`;
          return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
        }
        return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
      }
    }
    return '';
  };

  class LightningPrimitiveIcon extends lwc.LightningElement {
    constructor(...args) {
      super(...args);
      this.iconName = void 0;
      this.src = void 0;
      this.svgClass = void 0;
      this.size = 'medium';
      this.variant = void 0;
      this.privateIconSvgTemplates = configProvider.getIconSvgTemplates();
    }
    get inlineSvgProvided() {
      return !!this.privateIconSvgTemplates;
    }
    renderedCallback() {
      if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
        this.prevIconName = this.iconName;
        const svgElement = this.template.querySelector('svg');
        polyfill(svgElement);
      }
    }
    get href() {
      return this.src || getIconPath(this.iconName, dir);
    }
    get name() {
      return getName(this.iconName);
    }
    get normalizedSize() {
      return normalizeString(this.size, {
        fallbackValue: 'medium',
        validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
      });
    }
    get normalizedVariant() {
      // NOTE: Leaving a note here because I just wasted a bunch of time
      // investigating why both 'bare' and 'inverse' are supported in
      // lightning-primitive-icon. lightning-icon also has a deprecated
      // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
      // that no classes should be applied. So this component needs to
      // support both 'bare' and 'inverse' while lightning-icon only needs to
      // support 'inverse'.
      return normalizeString(this.variant, {
        fallbackValue: '',
        validValues: ['bare', 'error', 'inverse', 'warning', 'success']
      });
    }
    get computedClass() {
      const {
        normalizedSize,
        normalizedVariant
      } = this;
      const classes = classSet(this.svgClass);
      if (normalizedVariant !== 'bare') {
        classes.add('slds-icon');
      }
      switch (normalizedVariant) {
        case 'error':
          classes.add('slds-icon-text-error');
          break;
        case 'warning':
          classes.add('slds-icon-text-warning');
          break;
        case 'success':
          classes.add('slds-icon-text-success');
          break;
        case 'inverse':
        case 'bare':
          break;
        default:
          // if custom icon is set, we don't want to set
          // the text-default class
          if (!this.src) {
            classes.add('slds-icon-text-default');
          }
      }
      if (normalizedSize !== 'medium') {
        classes.add(`slds-icon_${normalizedSize}`);
      }
      return classes.toString();
    }
    resolveTemplate() {
      const name = this.iconName;
      if (isValidName(name)) {
        const [spriteName, iconName] = name.split(':');
        const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];
        if (template) {
          return template;
        }
      }
      return _tmpl$3;
    }
    render() {
      if (this.inlineSvgProvided) {
        return this.resolveTemplate();
      }
      return _tmpl$3;
    }
  }
  lwc.registerDecorators(LightningPrimitiveIcon, {
    publicProps: {
      iconName: {
        config: 0
      },
      src: {
        config: 0
      },
      svgClass: {
        config: 0
      },
      size: {
        config: 0
      },
      variant: {
        config: 0
      }
    },
    fields: ["privateIconSvgTemplates"]
  });
  var _lightningPrimitiveIcon = lwc.registerComponent(LightningPrimitiveIcon, {
    tmpl: _tmpl$3
  });

  function tmpl$5($api, $cmp, $slotset, $ctx) {
    const {
      c: api_custom_element,
      d: api_dynamic,
      h: api_element,
      ti: api_tab_index,
      b: api_bind
    } = $api;
    const {
      _m0,
      _m1,
      _m2
    } = $ctx;
    return [api_element("a", {
      classMap: {
        "slds-path__link": true
      },
      attrs: {
        "aria-selected": $cmp.ariaSelected,
        "href": "javascript:void(0);",
        "role": "option",
        "tabindex": api_tab_index($cmp.tabIndex)
      },
      key: 4,
      on: {
        "mouseenter": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseEnter)),
        "mouseleave": _m1 || ($ctx._m1 = api_bind($cmp.handleMouseLeave)),
        "focus": _m2 || ($ctx._m2 = api_bind($cmp.handleFocus))
      }
    }, [api_element("span", {
      classMap: {
        "slds-path__stage": true
      },
      key: 2
    }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
      props: {
        "iconName": "utility:check",
        "size": "x-small",
        "variant": "inverse"
      },
      key: 0
    }, []), $cmp.assistiveText ? api_element("span", {
      classMap: {
        "slds-assistive-text": true
      },
      key: 1
    }, [api_dynamic($cmp.assistiveText)]) : null]), api_element("span", {
      classMap: {
        "slds-path__title": true
      },
      key: 3
    }, [api_dynamic($cmp.label)])])];
  }

  var path$1 = lwc.registerTemplate(tmpl$5);
  tmpl$5.stylesheets = [];
  tmpl$5.stylesheetTokens = {
    hostAttribute: "lightning-progressStep_path-host",
    shadowAttribute: "lightning-progressStep_path"
  };

  function tmpl$6($api, $cmp, $slotset, $ctx) {
    const {
      c: api_custom_element,
      d: api_dynamic,
      h: api_element,
      b: api_bind
    } = $api;
    const {
      _m0,
      _m1,
      _m2,
      _m3
    } = $ctx;
    return [api_element("button", {
      className: $cmp.computedButtonClass,
      attrs: {
        "title": $cmp.label
      },
      key: 2,
      on: {
        "mouseenter": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseEnter)),
        "mouseleave": _m1 || ($ctx._m1 = api_bind($cmp.handleMouseLeave)),
        "focus": _m2 || ($ctx._m2 = api_bind($cmp.handleFocus)),
        "blur": _m3 || ($ctx._m3 = api_bind($cmp.handleBlur))
      }
    }, [$cmp.hasIcon ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
      props: {
        "iconName": $cmp.baseIconName,
        "svgClass": "slds-button__icon",
        "variant": "bare"
      },
      key: 0
    }, []) : null, $cmp.assistiveText ? api_element("span", {
      classMap: {
        "slds-assistive-text": true
      },
      key: 1
    }, [api_dynamic($cmp.assistiveText)]) : null])];
  }

  var base$1 = lwc.registerTemplate(tmpl$6);
  tmpl$6.stylesheets = [];
  tmpl$6.stylesheetTokens = {
    hostAttribute: "lightning-progressStep_base-host",
    shadowAttribute: "lightning-progressStep_base"
  };

  // Temporary workaround until we get real label support. New label entries must
  // also be added to the static `labels` prop inside the class.
  // https://git.soma.salesforce.com/raptor/raptor/issues/196
  const i18n$1 = {
    currentStage: labelCurrentStage,
    stageComplete: labelStageComplete
  };

  // Maps the status of the base progress-step to the icon it should render
  const baseIconNameMap = {
    completed: 'utility:success',
    error: 'utility:error'
  };
  class LightningProgressStep extends lwc.LightningElement {
    constructor(...args) {
      super(...args);
      this.value = void 0;
      this.state = {};
    }
    updateInternal(newStatus, newType, newIndex, newActive) {
      classListMutation(this.classList, this.computeClassSet(newType, newStatus, newActive));
      if (newActive === true) {
        this.focusPathLink();
      }
      this.state.status = newStatus;
      this.state.type = newType;
      this.state.index = newIndex;
      this.state.active = newActive;
    }
    set label(value) {
      if (this._tooltip) {
        this._tooltip.value = value;
      } else if (value && !this.isPath) {
        // Note that because the tooltip target is a child element it may not be present in the
        // dom during initial rendering.
        this._tooltip = new Tooltip(value, {
          root: this,
          target: () => this.template.querySelector('button'),
          type: TooltipType.Toggle,
          align: {
            horizontal: Direction.Center,
            vertical: Direction.Bottom
          },
          targetAlign: {
            horizontal: Direction.Center,
            vertical: Direction.Top
          }
        });
        this._tooltip.initialize();
      }
    }
    get label() {
      return this._tooltip ? this._tooltip.value : undefined;
    }
    computeClassSet(type, status, isActive) {
      const isPath = type === 'path';
      return classSet({
        'slds-progress__item': !isPath,
        'slds-is-completed': !isPath && status === 'completed',
        'slds-has-error': !isPath && status === 'error',
        'slds-is-active': isActive === true || type === 'base' && status === 'current',
        'slds-path__item': isPath,
        'slds-is-complete': isPath && status === 'completed',
        'slds-is-current': isPath && (status === 'error' || status === 'current'),
        'slds-is-incomplete': isPath && status === 'incomplete'
      });
    }
    connectedCallback() {
      this.setAttribute('role', 'listitem');
      this.dispatchEvent(new CustomEvent('privateregisterstep', {
        bubbles: true,
        detail: {
          callback: this.updateInternal.bind(this),
          stepName: this.value,
          setDeRegistrationCallback: deRegistrationCallback => {
            this._deRegistrationCallback = deRegistrationCallback;
          }
        }
      }));
    }
    disconnectedCallback() {
      if (this._deRegistrationCallback) {
        this._deRegistrationCallback();
      }
    }
    renderedCallback() {
      if (this._tooltip && !this._tooltip.initialized) {
        this._tooltip.initialize();
      }
    }
    get computedButtonClass() {
      const classes = classSet('slds-button slds-progress__marker');
      if (this.hasIcon) {
        classes.add('slds-button_icon').add('slds-progress__marker').add('slds-progress__marker_icon');
      }
      return classes.toString();
    }
    get hasIcon() {
      return this.state.status === 'completed' || this.state.status === 'error';
    }
    get baseIconName() {
      return baseIconNameMap[this.state.status];
    }
    get isPath() {
      return this.state.type === 'path';
    }
    get ariaSelected() {
      return this.state.active === true ? 'true' : 'false';
    }
    get tabIndex() {
      return this.state.active === true ? 0 : -1;
    }
    get assistiveText() {
      if (this.state.status === 'completed') {
        return `${this.label} - ${i18n$1.stageComplete}`;
      } else if (this.state.status === 'current') {
        return `${this.label} - ${i18n$1.currentStage}`;
      }
      return this.state.type === 'path' ? '' : this.label;
    }
    handleMouseEnter() {
      this.updateAriaDescribedBy('progress-indicator-tooltip');
      this.dispatchEvent(
      // eslint-disable-next-line lightning-global/no-custom-event-bubbling
      new CustomEvent('stepmouseenter', {
        bubbles: true,
        detail: {
          index: this.state.index
        }
      }));
    }
    handleMouseLeave() {
      this.updateAriaDescribedBy(null);
      this.dispatchEvent(
      // eslint-disable-next-line lightning-global/no-custom-event-bubbling
      new CustomEvent('stepmouseleave', {
        bubbles: true,
        detail: {
          index: this.state.index
        }
      }));
    }
    handleFocus() {
      if (this.state.type === 'base') {
        this.updateAriaDescribedBy('progress-indicator-tooltip');
      }
      this.dispatchEvent(
      // eslint-disable-next-line lightning-global/no-custom-event-bubbling
      new CustomEvent('stepfocus', {
        bubbles: true,
        detail: {
          index: this.state.index
        }
      }));
    }
    handleBlur() {
      this.updateAriaDescribedBy(null);
      this.dispatchEvent(
      // eslint-disable-next-line lightning-global/no-custom-event-bubbling
      new CustomEvent('stepblur', {
        bubbles: true,
        detail: {
          index: this.state.index
        }
      }));
    }
    updateAriaDescribedBy(value) {
      if (this.state.type === 'base') {
        const button = this.template.querySelector('button');
        if (button) {
          if (value !== null) {
            button.setAttribute('aria-describedBy', value);
          } else {
            button.removeAttribute('aria-describedBy');
          }
        }
      }
    }
    focusPathLink() {
      const pathLink = this.template.querySelector('a.slds-path__link');
      if (pathLink) {
        pathLink.focus();
      }
    }
    render() {
      if (this.isPath) {
        return path$1;
      }
      return base$1;
    }
  }
  lwc.registerDecorators(LightningProgressStep, {
    publicProps: {
      value: {
        config: 0
      },
      label: {
        config: 3
      }
    },
    track: {
      state: 1
    }
  });
  var _lightningProgressStep = lwc.registerComponent(LightningProgressStep, {
    tmpl: _tmpl
  });

  function tmpl$7($api, $cmp, $slotset, $ctx) {
    const {
      c: api_custom_element,
      d: api_dynamic,
      b: api_bind,
      h: api_element
    } = $api;
    const {
      _m0,
      _m1
    } = $ctx;
    return [api_element("button", {
      className: $cmp.computedButtonClass,
      attrs: {
        "name": $cmp.name,
        "accesskey": $cmp.computedAccessKey,
        "title": $cmp.computedTitle,
        "type": $cmp.normalizedType,
        "value": $cmp.value,
        "aria-label": $cmp.computedAriaLabel,
        "aria-expanded": $cmp.computedAriaExpanded,
        "aria-live": $cmp.computedAriaLive,
        "aria-atomic": $cmp.computedAriaAtomic
      },
      props: {
        "disabled": $cmp.disabled
      },
      key: 2,
      on: {
        "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
        "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
      }
    }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
      props: {
        "iconName": $cmp.iconName,
        "svgClass": $cmp.computedIconClass,
        "variant": "bare"
      },
      key: 0
    }, []) : null, api_dynamic($cmp.label), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
      props: {
        "iconName": $cmp.iconName,
        "svgClass": $cmp.computedIconClass,
        "variant": "bare"
      },
      key: 1
    }, []) : null])];
  }

  var _tmpl$4 = lwc.registerTemplate(tmpl$7);
  tmpl$7.stylesheets = [];
  tmpl$7.stylesheetTokens = {
    hostAttribute: "lightning-button_button-host",
    shadowAttribute: "lightning-button_button"
  };

  function tmpl$8($api, $cmp, $slotset, $ctx) {
    return [];
  }

  var _tmpl$5 = lwc.registerTemplate(tmpl$8);
  tmpl$8.stylesheets = [];
  tmpl$8.stylesheetTokens = {
    hostAttribute: "lightning-primitiveButton_primitiveButton-host",
    shadowAttribute: "lightning-primitiveButton_primitiveButton"
  };

  const ARIA_DESCRIBEDBY$1 = 'aria-describedby';
  const ARIA_CONTROLS = 'aria-controls';

  /**
   * Primitive for button, buttonIcon and buttonIconStateful
   */
  class LightningPrimitiveButton extends lwc.LightningElement {
    /**
     * Specifies whether this button should be displayed in a disabled state.
     * Disabled buttons can't be clicked. This value defaults to false.
     *
     * @type {boolean}
     * @default false
     */
    get disabled() {
      return this.state.disabled;
    }
    set disabled(value) {
      this.state.disabled = normalizeBoolean(value);
    }
    set accessKey(value) {
      this.state.accesskey = value;
    }

    /**
     * Specifies a shortcut key to activate or focus an element.
     *
     * @type {string}
     */
    get accessKey() {
      return this.state.accesskey;
    }
    get computedAccessKey() {
      return this.state.accesskey;
    }

    /**
     * Displays tooltip text when the mouse cursor moves over the element.
     *
     * @type {string}
     */
    get title() {
      return this.state.title;
    }
    set title(value) {
      this.state.title = value;
    }

    /**
     * Label describing the button to assistive technologies.
     *
     * @type {string}
     */
    get ariaLabel() {
      return this.state.ariaLabel;
    }
    set ariaLabel(value) {
      this.state.ariaLabel = value;
    }
    get computedAriaLabel() {
      return this.state.ariaLabel;
    }

    /**
     * A space-separated list of element IDs that provide descriptive labels for the button.
     *
     * @type {string}
     */
    get ariaDescribedBy() {
      return this.state.ariaDescribedBy;
    }
    set ariaDescribedBy(value) {
      this.state.ariaDescribedBy = value;
      const button = this.template.querySelector('button');
      synchronizeAttrs(button, {
        [ARIA_DESCRIBEDBY$1]: value
      });
    }

    /**
     * A space-separated list of element IDs whose presence or content is controlled by this button.
     *
     * @type {string}
     */
    get ariaControls() {
      return this.state.ariaControls;
    }
    set ariaControls(value) {
      this.state.ariaControls = value;
      const button = this.template.querySelector('button');
      synchronizeAttrs(button, {
        [ARIA_CONTROLS]: value
      });
    }

    /**
     * Indicates whether an element that the button controls is expanded or collapsed.
     * Valid values are 'true' or 'false'. The default value is undefined.
     *
     * @type {string}
     * @default undefined
     */
    get ariaExpanded() {
      return this.state.ariaExpanded;
    }
    set ariaExpanded(value) {
      this.state.ariaExpanded = normalizeString(value, {
        fallbackValue: undefined,
        validValues: ['true', 'false']
      });
    }
    get computedAriaExpanded() {
      return this.state.ariaExpanded || null;
    }
    set ariaLive(value) {
      this.state.ariaLive = value;
    }
    /**
     * Indicates that the button can be updated when it doesn't have focus.
     * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
     * technologies to notify users of updates at a low priority, generally without interrupting.
     * The assertive value causes assistive technologies to notify users immediately,
     * potentially clearing queued speech updates.
     *
     * @type {string}
     */
    get ariaLive() {
      return this.state.ariaLive;
    }
    get computedAriaLive() {
      return this.state.ariaLive;
    }

    /**
     * Indicates whether assistive technologies present all, or only parts of,
     * the changed region. Valid values are 'true' or 'false'.
     *
     * @type {string}
     */
    get ariaAtomic() {
      return this.state.ariaAtomic || null;
    }
    set ariaAtomic(value) {
      this.state.ariaAtomic = normalizeString(value, {
        fallbackValue: undefined,
        validValues: ['true', 'false']
      });
    }
    get computedAriaAtomic() {
      return this.state.ariaAtomic || null;
    }

    /**
     * Sets focus on the element.
     */
    focus() {}
    constructor() {
      super();

      // Workaround for an IE11 bug where click handlers on button ancestors
      // receive the click event even if the button element has the `disabled`
      // attribute set.
      this._initialized = false;
      this.state = {
        accesskey: null,
        ariaAtomic: null,
        ariaControls: null,
        ariaDescribedBy: null,
        ariaExpanded: null,
        ariaLabel: null,
        ariaLive: null,
        disabled: false
      };
      if (isIE11) {
        this.template.addEventListener('click', event => {
          if (this.disabled) {
            event.stopImmediatePropagation();
          }
        });
      }
    }
    renderedCallback() {
      if (!this._initialized) {
        const button = this.template.querySelector('button');
        synchronizeAttrs(button, {
          [ARIA_CONTROLS]: this.state.ariaControls,
          [ARIA_DESCRIBEDBY$1]: this.state.ariaDescribedBy
        });
        this._initialized = true;
      }
    }
  }
  lwc.registerDecorators(LightningPrimitiveButton, {
    publicProps: {
      disabled: {
        config: 3
      },
      accessKey: {
        config: 3
      },
      title: {
        config: 3
      },
      ariaLabel: {
        config: 3
      },
      ariaDescribedBy: {
        config: 3
      },
      ariaControls: {
        config: 3
      },
      ariaExpanded: {
        config: 3
      },
      ariaLive: {
        config: 3
      },
      ariaAtomic: {
        config: 3
      }
    },
    publicMethods: ["focus"],
    track: {
      state: 1
    },
    fields: ["_initialized"]
  });
  var LightningPrimitiveButton$1 = lwc.registerComponent(LightningPrimitiveButton, {
    tmpl: _tmpl$5
  });

  /**
   * A clickable element used to perform an action.
   */
  class LightningButton extends LightningPrimitiveButton$1 {
    constructor(...args) {
      super(...args);
      this.name = void 0;
      this.value = void 0;
      this.label = void 0;
      this.variant = 'neutral';
      this.iconName = void 0;
      this.iconPosition = 'left';
      this.type = 'button';
      this.title = null;
      this._order = null;
    }
    /**
     * The name for the button element.
     * This value is optional and can be used to identify the button in a callback.
     *
     * @type {string}
     */
    /**
     * The value for the button element.
     * This value is optional and can be used when submitting a form.
     *
     * @type {string}
     */
    /**
     * The text to be displayed inside the button.
     *
     * @type {string}
     */
    /**
     * The variant changes the appearance of the button.
     * Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.
     * This value defaults to neutral.
     *
     * @type {string}
     * @default neutral
     */
    /**
     * The Lightning Design System name of the icon.
     * Names are written in the format 'utility:down' where 'utility' is the category,
     * and 'down' is the specific icon to be displayed.
     *
     * @type {string}
     */
    /**
     * Describes the position of the icon with respect to the button label.
     * Options include left and right.
     * This value defaults to left.
     *
     * @type {string}
     * @default left
     */
    /**
     * Specifies the type of button.
     * Valid values are button, reset, and submit.
     * This value defaults to button.
     *
     * @type {string}
     * @default button
     */
    render() {
      return _tmpl$4;
    }
    get computedButtonClass() {
      return classSet('slds-button').add({
        'slds-button_neutral': this.normalizedVariant === 'neutral',
        'slds-button_brand': this.normalizedVariant === 'brand',
        'slds-button_outline-brand': this.normalizedVariant === 'brand-outline',
        'slds-button_destructive': this.normalizedVariant === 'destructive',
        'slds-button_text-destructive': this.normalizedVariant === 'destructive-text',
        'slds-button_inverse': this.normalizedVariant === 'inverse',
        'slds-button_success': this.normalizedVariant === 'success',
        'slds-button_first': this._order === 'first',
        'slds-button_middle': this._order === 'middle',
        'slds-button_last': this._order === 'last'
      }).toString();
    }
    get computedTitle() {
      return this.title;
    }
    get normalizedVariant() {
      return normalizeString(this.variant, {
        fallbackValue: 'neutral',
        validValues: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
      });
    }
    get normalizedType() {
      return normalizeString(this.type, {
        fallbackValue: 'button',
        validValues: ['button', 'reset', 'submit']
      });
    }
    get normalizedIconPosition() {
      return normalizeString(this.iconPosition, {
        fallbackValue: 'left',
        validValues: ['left', 'right']
      });
    }
    get showIconLeft() {
      return this.iconName && this.normalizedIconPosition === 'left';
    }
    get showIconRight() {
      return this.iconName && this.normalizedIconPosition === 'right';
    }
    get computedIconClass() {
      return classSet('slds-button__icon').add({
        'slds-button__icon_left': this.normalizedIconPosition === 'left',
        'slds-button__icon_right': this.normalizedIconPosition === 'right'
      }).toString();
    }
    handleButtonFocus() {
      this.dispatchEvent(new CustomEvent('focus'));
    }
    handleButtonBlur() {
      this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Sets focus on the button.
     */
    focus() {
      if (this._connected) {
        this.template.querySelector('button').focus();
      }
    }

    /**
     * Clicks the button.
     */
    click() {
      if (this._connected) {
        this.template.querySelector('button').click();
      }
    }

    /**
     * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
     * @param {String} order -  The order string (first, middle, last)
     */
    setOrder(order) {
      this._order = order;
    }

    /**
     * Once we are connected, we fire a register event so the button-group (or other) component can register
     * the buttons.
     */
    connectedCallback() {
      this._connected = true;
      const privatebuttonregister = new CustomEvent('privatebuttonregister', {
        bubbles: true,
        detail: {
          callbacks: {
            setOrder: this.setOrder.bind(this),
            setDeRegistrationCallback: deRegistrationCallback => {
              this._deRegistrationCallback = deRegistrationCallback;
            }
          }
        }
      });
      this.dispatchEvent(privatebuttonregister);
    }
    disconnectedCallback() {
      this._connected = false;
      if (this._deRegistrationCallback) {
        this._deRegistrationCallback();
      }
    }
  }
  LightningButton.delegatesFocus = true;
  lwc.registerDecorators(LightningButton, {
    publicProps: {
      name: {
        config: 0
      },
      value: {
        config: 0
      },
      label: {
        config: 0
      },
      variant: {
        config: 0
      },
      iconName: {
        config: 0
      },
      iconPosition: {
        config: 0
      },
      type: {
        config: 0
      }
    },
    publicMethods: ["focus", "click"],
    track: {
      title: 1,
      _order: 1
    }
  });
  var _lightningButton = lwc.registerComponent(LightningButton, {
    tmpl: _tmpl$4
  });
  LightningButton.interopMap = {
    exposeNativeEvent: {
      click: true,
      focus: true,
      blur: true
    }
  };

  function tmpl$9($api, $cmp, $slotset, $ctx) {
    const {
      b: api_bind,
      c: api_custom_element,
      t: api_text,
      h: api_element,
      gid: api_scoped_id
    } = $api;
    const {
      _m0,
      _m1,
      _m2,
      _m3,
      _m4,
      _m5,
      _m6,
      _m7,
      _m8,
      _m9,
      _m10,
      _m11,
      _m12,
      _m13,
      _m14,
      _m15,
      _m16,
      _m17,
      _m18,
      _m19,
      _m20,
      _m21,
      _m22,
      _m23,
      _m24,
      _m25,
      _m26,
      _m27,
      _m28,
      _m29,
      _m30,
      _m31,
      _m32,
      _m33,
      _m34,
      _m35,
      _m36
    } = $ctx;
    return [api_element("div", {
      classMap: {
        "container": true
      },
      key: 519
    }, [api_custom_element("lightning-progress-indicator", _lightningProgressIndicator, {
      props: {
        "currentStep": $cmp.currentStep,
        "type": "base",
        "variant": "base"
      },
      key: 7
    }, [api_custom_element("lightning-progress-step", _lightningProgressStep, {
      props: {
        "label": "Step 1",
        "value": "1"
      },
      key: 0,
      on: {
        "click": _m0 || ($ctx._m0 = api_bind($cmp.handleOnStepClick))
      }
    }, []), api_custom_element("lightning-progress-step", _lightningProgressStep, {
      props: {
        "label": "Step 2",
        "value": "2"
      },
      key: 1,
      on: {
        "click": _m1 || ($ctx._m1 = api_bind($cmp.handleOnStepClick))
      }
    }, []), api_custom_element("lightning-progress-step", _lightningProgressStep, {
      props: {
        "label": "Step 3",
        "value": "3"
      },
      key: 2,
      on: {
        "click": _m2 || ($ctx._m2 = api_bind($cmp.handleOnStepClick))
      }
    }, []), api_custom_element("lightning-progress-step", _lightningProgressStep, {
      props: {
        "label": "Step 4",
        "value": "4"
      },
      key: 3,
      on: {
        "click": _m3 || ($ctx._m3 = api_bind($cmp.handleOnStepClick))
      }
    }, []), api_custom_element("lightning-progress-step", _lightningProgressStep, {
      props: {
        "label": "Step 5",
        "value": "5"
      },
      key: 4,
      on: {
        "click": _m4 || ($ctx._m4 = api_bind($cmp.handleOnStepClick))
      }
    }, []), api_custom_element("lightning-progress-step", _lightningProgressStep, {
      props: {
        "label": "Step 6",
        "value": "6"
      },
      key: 5,
      on: {
        "click": _m5 || ($ctx._m5 = api_bind($cmp.handleOnStepClick))
      }
    }, []), api_custom_element("lightning-progress-step", _lightningProgressStep, {
      props: {
        "label": "Step 7",
        "value": "7"
      },
      key: 6,
      on: {
        "click": _m6 || ($ctx._m6 = api_bind($cmp.handleOnStepClick))
      }
    }, [])]), $cmp.isStepOne ? api_element("div", {
      classMap: {
        "container": true
      },
      key: 127
    }, [api_element("div", {
      classMap: {
        "nav": true
      },
      key: 9
    }, [api_element("h1", {
      key: 8
    }, [api_text("I. \xA0  BORROWER/GUARANTOR INFORMATION")])]), api_element("br", {
      key: 10
    }, []), api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-gutters": true
      },
      key: 51
    }, [api_element("div", {
      classMap: {
        "slds-col": true
      },
      key: 31
    }, [api_element("span", {
      key: 30
    }, [api_element("ul", {
      key: 29
    }, [api_element("li", {
      key: 28
    }, [api_element("label", {
      attrs: {
        "for": `${api_scoped_id("name")}`
      },
      key: 11
    }, [api_text("Primary Borrower:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "40"
      },
      props: {
        "value": ""
      },
      key: 12
    }, []), api_element("br", {
      key: 13
    }, []), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("address")}`
      },
      key: 14
    }, [api_text("Residence Address:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "40"
      },
      key: 15
    }, []), api_element("br", {
      key: 16
    }, []), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("city")}`
      },
      key: 17
    }, [api_text("City:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "13"
      },
      props: {
        "value": ""
      },
      key: 18
    }, []), api_text("\xA0\xA0\xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 19
    }, [api_text("State:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "13"
      },
      props: {
        "value": ""
      },
      key: 20
    }, []), api_text("\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 21
    }, [api_text("Zip Code:")]), api_text("\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "10"
      },
      props: {
        "value": ""
      },
      key: 22
    }, []), api_element("br", {
      key: 23
    }, []), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("emailaddress")}`
      },
      key: 24
    }, [api_text("Email Address:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "email",
        "size": "40"
      },
      props: {
        "value": ""
      },
      key: 25
    }, []), api_element("br", {
      key: 26
    }, []), api_element("br", {
      key: 27
    }, [])])])])]), api_element("div", {
      classMap: {
        "slds-col": true
      },
      key: 50
    }, [api_element("span", {
      key: 49
    }, [api_element("ul", {
      key: 48
    }, [api_element("li", {
      key: 47
    }, [api_element("label", {
      key: 32
    }, [api_text("Cell Phone:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "20"
      },
      props: {
        "value": ""
      },
      key: 33
    }, []), api_element("br", {
      key: 34
    }, []), api_element("label", {
      key: 35
    }, [api_text("Home Phone:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "number",
        "size": "20"
      },
      props: {
        "value": ""
      },
      key: 36
    }, []), api_element("br", {
      key: 37
    }, []), api_element("label", {
      key: 38
    }, [api_text("Social Security Number:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "tel",
        "size": "20"
      },
      props: {
        "value": ""
      },
      key: 39
    }, []), api_element("br", {
      key: 40
    }, []), api_element("label", {
      key: 41
    }, [api_text("Are you Married:")]), api_text(" \xA0\xA0\xA0"), api_element("label", {
      key: 42
    }, [api_text("Yes: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "maritalStatus"
      },
      props: {
        "value": "married"
      },
      key: 43,
      on: {
        "change": _m7 || ($ctx._m7 = api_bind($cmp.handleCheckboxChange))
      }
    }, []), api_element("label", {
      key: 44
    }, [api_text("  No: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "maritalStatus"
      },
      props: {
        "value": "single"
      },
      key: 45,
      on: {
        "change": _m8 || ($ctx._m8 = api_bind($cmp.handleCheckboxChange))
      }
    }, []), api_element("br", {
      key: 46
    }, [])])])])])]), api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 67
    }, [api_element("span", {
      key: 66
    }, [api_element("label", {
      key: 52
    }, [api_text("Experience: ")]), api_text(" \xA0\xA0"), api_element("label", {
      key: 53
    }, [api_text("None: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "None"
      },
      key: 54,
      on: {
        "change": _m9 || ($ctx._m9 = api_bind($cmp.handleCheckbox))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 55
    }, [api_text("1-3 Deals: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "None"
      },
      key: 56,
      on: {
        "change": _m10 || ($ctx._m10 = api_bind($cmp.handleCheckbox))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 57
    }, [api_text("5+ Deals: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "None"
      },
      key: 58,
      on: {
        "change": _m11 || ($ctx._m11 = api_bind($cmp.handleCheckbox))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 59
    }, [api_text("BK OR F/C Last 36 Months: ")]), api_text(" \xA0\xA0"), api_element("label", {
      key: 60
    }, [api_text("Y: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Yes"
      },
      key: 61,
      on: {
        "change": _m12 || ($ctx._m12 = api_bind($cmp.handleBox))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 62
    }, [api_text("N: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Yes"
      },
      key: 63,
      on: {
        "change": _m13 || ($ctx._m13 = api_bind($cmp.handleBox))
      }
    }, []), api_text(" \xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 64
    }, [api_text("Credit Score:")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "name": "credit score:"
      },
      props: {
        "value": ""
      },
      key: 65
    }, [])])]), api_element("br", {
      key: 68
    }, []), api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-gutters": true
      },
      key: 109
    }, [api_element("div", {
      classMap: {
        "slds-col": true
      },
      key: 89
    }, [api_element("span", {
      key: 88
    }, [api_element("ul", {
      key: 87
    }, [api_element("li", {
      key: 86
    }, [api_element("label", {
      key: 69
    }, [api_text("Co Borrower:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "name": "name",
        "size": "40"
      },
      props: {
        "value": ""
      },
      key: 70
    }, []), api_element("br", {
      key: 71
    }, []), api_element("label", {
      key: 72
    }, [api_text("Residence Address:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "40"
      },
      props: {
        "value": ""
      },
      key: 73
    }, []), api_element("br", {
      key: 74
    }, []), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("city")}`
      },
      key: 75
    }, [api_text("City:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "13"
      },
      props: {
        "value": ""
      },
      key: 76
    }, []), api_text("\xA0\xA0\xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 77
    }, [api_text("State:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "13"
      },
      props: {
        "value": ""
      },
      key: 78
    }, []), api_text("\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 79
    }, [api_text("Zip Code:")]), api_text("\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "10"
      },
      props: {
        "value": ""
      },
      key: 80
    }, []), api_element("br", {
      key: 81
    }, []), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("emailaddress")}`
      },
      key: 82
    }, [api_text("Email Address:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "email",
        "size": "40"
      },
      props: {
        "value": ""
      },
      key: 83
    }, []), api_element("br", {
      key: 84
    }, []), api_element("br", {
      key: 85
    }, [])])])])]), api_element("div", {
      classMap: {
        "slds-col": true
      },
      key: 108
    }, [api_element("span", {
      key: 107
    }, [api_element("ul", {
      key: 106
    }, [api_element("li", {
      key: 105
    }, [api_element("label", {
      key: 90
    }, [api_text("Cell Phone:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "tel",
        "size": "20"
      },
      props: {
        "value": ""
      },
      key: 91
    }, []), api_element("br", {
      key: 92
    }, []), api_element("label", {
      key: 93
    }, [api_text("Home Phone:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "number",
        "size": "20"
      },
      props: {
        "value": ""
      },
      key: 94
    }, []), api_element("br", {
      key: 95
    }, []), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("phone")}`
      },
      key: 96
    }, [api_text("Social Security Number:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "number",
        "size": "20"
      },
      props: {
        "value": ""
      },
      key: 97
    }, []), api_element("br", {
      key: 98
    }, []), api_element("label", {
      key: 99
    }, [api_text("Are you Married:")]), api_text(" \xA0\xA0\xA0"), api_element("label", {
      key: 100
    }, [api_text("Yes: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "NO"
      },
      key: 101,
      on: {
        "change": _m14 || ($ctx._m14 = api_bind($cmp.handlecheckboxChange))
      }
    }, []), api_element("label", {
      key: 102
    }, [api_text(" No: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "NO"
      },
      key: 103,
      on: {
        "change": _m15 || ($ctx._m15 = api_bind($cmp.handlecheckboxChange))
      }
    }, []), api_element("br", {
      key: 104
    }, [])])])])])]), api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 126
    }, [api_element("span", {
      key: 125
    }, [api_element("label", {
      key: 110
    }, [api_text("Experience: ")]), api_text(" \xA0\xA0"), api_element("label", {
      key: 111
    }, [api_text("None: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Experience"
      },
      key: 112,
      on: {
        "change": _m16 || ($ctx._m16 = api_bind($cmp.handleEvent))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 113
    }, [api_text("1-3 Deals: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Experience"
      },
      key: 114,
      on: {
        "change": _m17 || ($ctx._m17 = api_bind($cmp.handleEvent))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 115
    }, [api_text("5+ Deals: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Experience"
      },
      key: 116,
      on: {
        "change": _m18 || ($ctx._m18 = api_bind($cmp.handleEvent))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 117
    }, [api_text("BK OR F/C Last 36 Months: ")]), api_text(" \xA0\xA0"), api_element("label", {
      key: 118
    }, [api_text("Y: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "scale"
      },
      key: 119,
      on: {
        "change": _m19 || ($ctx._m19 = api_bind($cmp.YesEvent))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 120
    }, [api_text("N: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "scale"
      },
      key: 121,
      on: {
        "change": _m20 || ($ctx._m20 = api_bind($cmp.YesEvent))
      }
    }, []), api_text(" \xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 122
    }, [api_text("Credit Score:")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "name": "credit score:"
      },
      props: {
        "value": ""
      },
      key: 123
    }, []), api_element("br", {
      key: 124
    }, [])])])]) : null, $cmp.isSteptwo ? api_element("div", {
      classMap: {
        "container": true
      },
      key: 185
    }, [api_element("div", {
      classMap: {
        "nav": true
      },
      key: 129
    }, [api_element("h1", {
      key: 128
    }, [api_text("II. \xA0  ENTITY/COMPANY INFORMATION")])]), api_element("br", {
      key: 130
    }, []), api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-gutters": true
      },
      key: 153
    }, [api_element("div", {
      classMap: {
        "slds-col": true
      },
      key: 152
    }, [api_element("span", {
      key: 150
    }, [api_element("ul", {
      key: 149
    }, [api_element("li", {
      key: 148
    }, [api_element("label", {
      attrs: {
        "for": `${api_scoped_id("name")}`
      },
      key: 131
    }, [api_text("Entity Name:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "40"
      },
      props: {
        "value": ""
      },
      key: 132
    }, []), api_element("br", {
      key: 133
    }, []), api_element("p", {
      key: 134
    }, []), api_element("label", {
      key: 135
    }, [api_text("Individual:")]), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 136
    }, [api_text("Partnership: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "scales"
      },
      key: 137,
      on: {
        "change": _m21 || ($ctx._m21 = api_bind($cmp.formsection1))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 138
    }, [api_text("Corporation: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "scales"
      },
      key: 139,
      on: {
        "change": _m22 || ($ctx._m22 = api_bind($cmp.formsection1))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 140
    }, [api_text("LLC: ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "scales"
      },
      key: 141,
      on: {
        "change": _m23 || ($ctx._m23 = api_bind($cmp.formsection1))
      }
    }, []), api_text(" \xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 142
    }, [api_text("Other:")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "scales"
      },
      key: 143,
      on: {
        "change": _m24 || ($ctx._m24 = api_bind($cmp.formsection1))
      }
    }, []), api_text(" \xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "name": "Other"
      },
      props: {
        "value": ""
      },
      key: 144
    }, []), api_text("\xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 145
    }, [api_text("EIN:")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "name": "Other"
      },
      props: {
        "value": ""
      },
      key: 146,
      on: {
        "change": _m25 || ($ctx._m25 = api_bind($cmp.formsection1))
      }
    }, []), api_text("\xA0\xA0"), api_element("br", {
      key: 147
    }, [])])])]), api_element("p", {
      key: 151
    }, [])])]), api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 166
    }, [api_element("span", {
      key: 165
    }, [api_element("ul", {
      key: 163
    }, [api_element("li", {
      key: 162
    }, [api_element("label", {
      attrs: {
        "for": `${api_scoped_id("city")}`
      },
      key: 154
    }, [api_text("Entity Address:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text"
      },
      props: {
        "value": ""
      },
      key: 155
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("city")}`
      },
      key: 156
    }, [api_text("City:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text"
      },
      props: {
        "value": ""
      },
      key: 157
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 158
    }, [api_text("State:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text"
      },
      props: {
        "value": ""
      },
      key: 159
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 160
    }, [api_text("Zip Code:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "name": "zipcode",
        "size": "10"
      },
      props: {
        "value": ""
      },
      key: 161
    }, []), api_text("\xA0\xA0\xA0\xA0")])]), api_element("p", {
      key: 164
    }, [])])]), api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 172
    }, [api_element("span", {
      key: 171
    }, [api_element("ul", {
      key: 170
    }, [api_element("li", {
      key: 169
    }, [api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 167
    }, [api_text("Billing Address (check here if same")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "scales"
      },
      key: 168
    }, []), api_text(") \xA0\xA0")])])])]), api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 184
    }, [api_element("span", {
      key: 183
    }, [api_element("ul", {
      key: 182
    }, [api_element("li", {
      key: 181
    }, [api_element("label", {
      attrs: {
        "for": `${api_scoped_id("city")}`
      },
      key: 173
    }, [api_text("Entity Address:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text"
      },
      props: {
        "value": ""
      },
      key: 174
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("city")}`
      },
      key: 175
    }, [api_text("City:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text"
      },
      props: {
        "value": ""
      },
      key: 176
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      attrs: {
        "for": `${api_scoped_id("state")}`
      },
      key: 177
    }, [api_text("State:")]), api_text("\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text"
      },
      props: {
        "value": ""
      },
      key: 178
    }, []), api_text("\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 179
    }, [api_text("Zip Code:")]), api_text("\xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "text",
        "size": "10"
      },
      props: {
        "value": ""
      },
      key: 180
    }, []), api_text("\xA0\xA0\xA0\xA0")])])])])]) : null, $cmp.isStepThree ? api_element("div", {
      classMap: {
        "container": true
      },
      key: 266
    }, [api_element("div", {
      classMap: {
        "nav": true
      },
      key: 187
    }, [api_element("h1", {
      key: 186
    }, [api_text("III. \xA0 BUSINESS PLAN FOR PROPERTY (Details will be reviewed with max LTV)")])]), api_element("br", {
      key: 188
    }, []), api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-gutters": true
      },
      key: 265
    }, [api_element("div", {
      classMap: {
        "slds-col": true
      },
      key: 264
    }, [api_element("span", {
      key: 263
    }, [api_element("ul", {
      key: 262
    }, [api_element("li", {
      key: 261
    }, [api_element("label", {
      key: 189
    }, [api_text("Property Address: ")]), api_text(" \xA0\xA0 \xA0\xA0"), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "20"
      },
      key: 190
    }, []), api_text(" \xA0"), api_element("label", {
      key: 191
    }, [api_text("Property Type: ")]), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 192
    }, [api_text("SFR ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Property"
      },
      props: {
        "value": "Yes"
      },
      key: 193,
      on: {
        "change": _m26 || ($ctx._m26 = api_bind($cmp.handleChange))
      }
    }, []), api_text(" \xA0\xA0\xA0\xA0"), api_element("label", {
      key: 194
    }, [api_text("MF3  ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Property"
      },
      props: {
        "value": "Yes"
      },
      key: 195,
      on: {
        "change": _m27 || ($ctx._m27 = api_bind($cmp.handleChange))
      }
    }, []), api_text("\xA0\xA0 \xA0\xA0"), api_element("label", {
      key: 196
    }, [api_text("MF4  ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Property"
      },
      props: {
        "value": "Yes"
      },
      key: 197,
      on: {
        "change": _m28 || ($ctx._m28 = api_bind($cmp.handleChange))
      }
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 198
    }, [api_text(" OTHER ")]), api_text("\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Property"
      },
      props: {
        "value": "other"
      },
      key: 199,
      on: {
        "change": _m29 || ($ctx._m29 = api_bind($cmp.handleChange))
      }
    }, []), $cmp.areDetailsVisible ? api_text("\xA0\xA0") : null, $cmp.areDetailsVisible ? api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "14"
      },
      key: 200
    }, []) : null, api_element("br", {
      key: 201
    }, []), api_element("label", {
      key: 202
    }, [api_text("City: ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 203
    }, []), api_text(" \xA0"), api_element("label", {
      key: 204
    }, [api_text("State: ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "8"
      },
      key: 205
    }, []), api_element("label", {
      key: 206
    }, [api_text("Zip Code: ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "12"
      },
      key: 207
    }, []), api_text(" \xA0\xA0"), api_element("label", {
      key: 208
    }, [api_text("Annual Taxes: $ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "10"
      },
      key: 209
    }, []), api_element("label", {
      key: 210
    }, [api_text("Annual HOI:$ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "10"
      },
      key: 211
    }, []), api_text(" \xA0"), api_element("br", {
      key: 212
    }, []), api_element("label", {
      key: 213
    }, [api_text("Purchase: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 214
    }, []), api_text(" \xA0 \xA0 \xA0 \xA0"), api_element("label", {
      key: 215
    }, [api_text("Purchase/Rehab: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      props: {
        "value": "Yes",
        "checked": true
      },
      key: 216
    }, []), api_text(" \xA0 \xA0 \xA0 \xA0"), api_element("label", {
      key: 217
    }, [api_text("Cash Out: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 218
    }, []), api_text(" \xA0 \xA0 \xA0 \xA0"), api_element("label", {
      key: 219
    }, [api_text("Refinance: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 220
    }, []), api_text(" \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0"), api_element("label", {
      key: 221
    }, [api_text("New Construction: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 222
    }, []), api_text(" \xA0 \xA0 \xA0 \xA0 \xA0 \xA0 \xA0"), api_element("label", {
      key: 223
    }, [api_text("Rehab Only: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 224
    }, []), api_text(" \xA0"), api_element("br", {
      key: 225
    }, []), api_element("label", {
      key: 226
    }, [api_text("Purchase Prize:$ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "40"
      },
      key: 227
    }, []), api_text("  \xA0\xA0\xA0\xA0"), api_element("label", {
      key: 228
    }, [api_text("Estimates Rehab:$ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "40"
      },
      key: 229
    }, []), api_element("br", {
      key: 230
    }, []), api_element("label", {
      key: 231
    }, [api_text("Loan Amount:$ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "40"
      },
      key: 232
    }, []), api_text("  \xA0\xA0\xA0\xA0"), api_element("label", {
      key: 233
    }, [api_text("ARV Value: \xA0\xA0 $ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "40"
      },
      key: 234
    }, []), api_element("br", {
      key: 235
    }, []), api_element("label", {
      key: 236
    }, [api_text("Leased: ")]), api_text(" \xA0\xA0\xA0\xA0"), api_element("label", {
      key: 237
    }, [api_text("Yes ")]), api_text("\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 238
    }, []), api_text("\xA0\xA0 \xA0  \xA0"), api_element("label", {
      key: 239
    }, [api_text("No ")]), api_text("\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": ""
      },
      props: {
        "value": "No"
      },
      key: 240
    }, []), api_text("\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 241
    }, [api_text("Monthly Rental:$ \xA0\xA0$ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 242
    }, []), api_text("  \xA0\xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 243
    }, [api_text("As-is Value: \xA0\xA0$ ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "10"
      },
      key: 244
    }, []), api_text("  \xA0\xA0"), api_element("label", {
      key: 245
    }, [api_text("Proposed LTV: ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "",
        "type": "text",
        "size": "10"
      },
      props: {
        "value": "0%"
      },
      key: 246
    }, []), api_element("br", {
      key: 247
    }, []), api_element("label", {
      key: 248
    }, [api_text("Exit Strategy: ")]), api_text("\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 249
    }, [api_text("Wholesale/R \xA0 Refinance: ")]), api_element("input", {
      classMap: {
        "inputfild1": true
      },
      attrs: {
        "name": "Exit",
        "type": "checkbox"
      },
      key: 250,
      on: {
        "change": _m30 || ($ctx._m30 = api_bind($cmp.exitStrategy))
      }
    }, []), api_text(" \xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 251
    }, [api_text("Other: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "Exit"
      },
      props: {
        "value": "Yes"
      },
      key: 252,
      on: {
        "change": _m31 || ($ctx._m31 = api_bind($cmp.exitStrategy))
      }
    }, []), api_text(" \xA0 \xA0 \xA0 \xA0"), api_element("label", {
      key: 253
    }, [api_text("Gap Financing?")]), api_text("\xA0 \xA0 \xA0\xA0"), api_element("label", {
      key: 254
    }, [api_text("Yes ")]), api_text("\xA0 "), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "gap"
      },
      props: {
        "value": "Yes"
      },
      key: 255,
      on: {
        "change": _m32 || ($ctx._m32 = api_bind($cmp.gapFinancing))
      }
    }, []), api_text("\xA0  \xA0"), api_element("label", {
      key: 256
    }, [api_text("No ")]), api_text("\xA0"), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": "gap"
      },
      props: {
        "value": "No"
      },
      key: 257,
      on: {
        "change": _m33 || ($ctx._m33 = api_bind($cmp.gapFinancing))
      }
    }, []), api_element("br", {
      key: 258
    }, []), api_text("\xA0  \xA0 \xA0  \xA0 \xA0  \xA0 \xA0\xA0\xA0 \xA0  \xA0 \xA0  \xA0 \xA0\xA0 \xA0 \xA0  \xA0 \xA0  \xA0 \xA0\xA0"), api_element("label", {
      key: 259
    }, [api_text("e-Sale: ")]), api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 260
    }, [])])])])])])]) : null, $cmp.isStepFour ? api_element("div", {
      classMap: {
        "container": true
      },
      key: 328
    }, [api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-wrap": true
      },
      key: 327
    }, [api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-2": true
      },
      key: 298
    }, [api_element("div", {
      classMap: {
        "nav": true
      },
      key: 268
    }, [api_element("h1", {
      key: 267
    }, [api_text("IV. \xA0 FINANCIAL ASSETS")])]), api_element("span", {
      key: 297
    }, [api_element("ul", {
      key: 296
    }, [api_element("li", {
      key: 295
    }, [api_element("label", {
      classMap: {
        "radio": true
      },
      key: 269
    }, [api_text("Self Employed: ")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": ""
      },
      props: {
        "value": "Yes"
      },
      key: 270
    }, []), api_text("\xA0"), api_element("label", {
      key: 271
    }, [api_text("Yes ")]), api_text("\xA0 \xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": ""
      },
      props: {
        "value": "No"
      },
      key: 272
    }, []), api_text("\xA0"), api_element("label", {
      key: 273
    }, [api_text("No ")]), api_text("\xA0"), api_element("br", {
      key: 274
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 275
    }, [api_text("Annual Income(s): ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 276
    }, []), api_element("br", {
      key: 277
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 278
    }, [api_text("Cash on hand & Cheching Account(s): ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 279
    }, []), api_element("br", {
      key: 280
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 281
    }, [api_text("Savings Account(s): ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 282
    }, []), api_element("br", {
      key: 283
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 284
    }, [api_text("Business Account(s): ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 285
    }, []), api_element("br", {
      key: 286
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 287
    }, [api_text("Real Estate: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 288
    }, []), api_element("br", {
      key: 289
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 290
    }, [api_text("401K/IRA Account: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 291
    }, []), api_element("br", {
      key: 292
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 293
    }, [api_text("Total Assets: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      props: {
        "value": "$"
      },
      key: 294
    }, [])])])])]), api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-2": true
      },
      key: 326
    }, [api_element("div", {
      classMap: {
        "nav": true
      },
      key: 300
    }, [api_element("h1", {
      key: 299
    }, [api_text("V. \xA0 FINANCIAL DEBT")])]), api_element("span", {
      key: 325
    }, [api_element("ul", {
      key: 324
    }, [api_element("li", {
      key: 323
    }, [api_element("label", {
      classMap: {
        "label": true
      },
      key: 301
    }, [api_text("Mortgages on Real Estate: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 302
    }, []), api_element("br", {
      key: 303
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 304
    }, [api_text("Installment Accounts: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 305
    }, []), api_element("br", {
      key: 306
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 307
    }, [api_text("Unpaid Taxes: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 308
    }, []), api_element("br", {
      key: 309
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 310
    }, [api_text("Loan on Life Insurance: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 311
    }, []), api_element("br", {
      key: 312
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 313
    }, [api_text("Other Liabilities: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      key: 314
    }, []), api_element("br", {
      key: 315
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 316
    }, [api_text("Total Liabilities:")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      props: {
        "value": "$"
      },
      key: 317
    }, []), api_element("br", {
      key: 318
    }, []), api_element("br", {
      key: 319
    }, []), api_element("br", {
      key: 320
    }, []), api_element("label", {
      classMap: {
        "label": true
      },
      key: 321
    }, [api_text("Net Worth: ")]), api_element("input", {
      classMap: {
        "inputfild": true
      },
      attrs: {
        "name": "",
        "type": "text"
      },
      props: {
        "value": "$"
      },
      key: 322
    }, [])])])])])])]) : null, $cmp.isStepFive ? api_element("div", {
      classMap: {
        "container": true
      },
      key: 388
    }, [api_element("div", {
      classMap: {
        "nav": true
      },
      key: 330
    }, [api_element("h1", {
      key: 329
    }, [api_text("\xA0\xA0 VI.\xA0 \xA0\xA0BORROWER DECELARATIONS")])]), api_element("br", {
      key: 331
    }, []), api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 387
    }, [api_element("span", {
      key: 386
    }, [api_element("ul", {
      key: 385
    }, [api_element("li", {
      key: 384
    }, [api_element("label", {
      key: 332
    }, [api_text("Defendant in suits or judgment? \xA0\xA0\xA0\xA0")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "Yes"
      },
      props: {
        "value": "Yes"
      },
      key: 333
    }, []), api_text(" Yes \xA0\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "No"
      },
      props: {
        "value": "No"
      },
      key: 334
    }, []), api_text(" No \xA0\xA0\xA0"), api_element("label", {
      key: 335
    }, [api_text("Description: ")]), api_element("input", {
      attrs: {
        "name": "Description:",
        "type": "text",
        "size": "40"
      },
      key: 336
    }, []), api_element("br", {
      key: 337
    }, []), api_element("label", {
      key: 338
    }, [api_text("Default on any financial obligation? \xA0\xA0\xA0\xA0")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "Yes"
      },
      props: {
        "value": "Yes"
      },
      key: 339
    }, []), api_text(" Yes \xA0\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "No"
      },
      props: {
        "value": "No"
      },
      key: 340
    }, []), api_text(" No \xA0\xA0\xA0"), api_element("label", {
      key: 341
    }, [api_text("Description: ")]), api_element("input", {
      attrs: {
        "name": "Description:",
        "type": "text",
        "size": "40"
      },
      key: 342
    }, []), api_element("br", {
      key: 343
    }, []), api_element("label", {
      key: 344
    }, [api_text("Bankruptcy? \xA0\xA0\xA0")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "Yes"
      },
      props: {
        "value": "Yes"
      },
      key: 345
    }, []), api_text(" Yes \xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "No"
      },
      props: {
        "value": "No"
      },
      key: 346
    }, []), api_text(" No \xA0\xA0\xA0"), api_element("label", {
      key: 347
    }, [api_text("Month/Year:")]), api_element("input", {
      attrs: {
        "name": "Month/Year:",
        "type": "text",
        "size": "20"
      },
      key: 348
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 349
    }, [api_text("Explain: ")]), api_element("input", {
      attrs: {
        "name": "Explain:",
        "type": "text",
        "size": "20"
      },
      key: 350
    }, []), api_element("br", {
      key: 351
    }, []), api_element("label", {
      key: 352
    }, [api_text("Foreclosure? \xA0\xA0\xA0")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "Yes"
      },
      props: {
        "value": "Yes"
      },
      key: 353
    }, []), api_text(" Yes \xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "No"
      },
      props: {
        "value": "No"
      },
      key: 354
    }, []), api_text(" No \xA0\xA0\xA0"), api_element("label", {
      key: 355
    }, [api_text("Month/Year:")]), api_element("input", {
      attrs: {
        "name": "Month/Year:",
        "type": "text",
        "size": "20"
      },
      key: 356
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 357
    }, [api_text("Explain: ")]), api_element("input", {
      attrs: {
        "name": "Explain:",
        "type": "text",
        "size": "20"
      },
      key: 358
    }, []), api_element("br", {
      key: 359
    }, []), api_element("label", {
      key: 360
    }, [api_text("Short Sale? \xA0\xA0\xA0\xA0")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "Yes"
      },
      props: {
        "value": "Yes"
      },
      key: 361
    }, []), api_text(" Yes \xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "No"
      },
      props: {
        "value": "No"
      },
      key: 362
    }, []), api_text(" No \xA0\xA0\xA0"), api_element("label", {
      key: 363
    }, [api_text("Month/Year:")]), api_element("input", {
      attrs: {
        "name": "Month/Year:",
        "type": "text",
        "size": "20"
      },
      key: 364
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 365
    }, [api_text("Explain: ")]), api_element("input", {
      attrs: {
        "name": "Explain:",
        "type": "text",
        "size": "20"
      },
      key: 366
    }, []), api_element("br", {
      key: 367
    }, []), api_element("label", {
      key: 368
    }, [api_text("Convicted of a crime? \xA0\xA0\xA0\xA0")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "Yes"
      },
      props: {
        "value": "Yes"
      },
      key: 369
    }, []), api_text(" Yes \xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "No"
      },
      props: {
        "value": "No"
      },
      key: 370
    }, []), api_text(" No \xA0\xA0\xA0"), api_element("label", {
      key: 371
    }, [api_text("Month/Year:")]), api_element("input", {
      attrs: {
        "name": "Month/Year:",
        "type": "text",
        "size": "20"
      },
      key: 372
    }, []), api_text("\xA0\xA0"), api_element("label", {
      key: 373
    }, [api_text("Explain: ")]), api_element("input", {
      attrs: {
        "name": "Explain:",
        "type": "text",
        "size": "20"
      },
      key: 374
    }, []), api_element("br", {
      key: 375
    }, []), api_element("label", {
      key: 376
    }, [api_text("U.S. Citizen? \xA0\xA0\xA0\xA0")]), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "Yes"
      },
      props: {
        "value": "Yes"
      },
      key: 377
    }, []), api_text(" Yes \xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "type": "radio",
        "name": "No"
      },
      props: {
        "value": "No"
      },
      key: 378
    }, []), api_text(" No \xA0\xA0\xA0"), api_element("label", {
      key: 379
    }, [api_text("Origin:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "name": "Origin:",
        "type": "text",
        "size": "20"
      },
      key: 380
    }, []), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 381
    }, [api_text("Visa Status: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "name": "Visa Status:",
        "type": "text",
        "size": "20"
      },
      key: 382
    }, []), api_element("br", {
      key: 383
    }, [])])])])])]) : null, $cmp.isStepSix ? api_element("div", {
      classMap: {
        "container": true
      },
      key: 485
    }, [api_element("nav", {
      classMap: {
        "nav": true
      },
      key: 389
    }, [api_text("\xA0\xA0 VII.\xA0\xA0\xA0\xA0  Borrower Track Record(List \"ALL\" Fix and Flips or Fix and Hold Deals Completed In last 36 months.)")]), api_element("br", {
      key: 390
    }, []), api_element("span", {
      classMap: {
        "one": true
      },
      key: 391
    }, [api_text("1. \xA0")]), api_element("span", {
      classMap: {
        "text-form": true
      },
      key: 420
    }, [api_element("label", {
      key: 392
    }, [api_text(" Property Type:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 393
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 394
    }, [api_text(" Purchase Date:")]), api_text("\xA0\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      key: 395
    }, []), api_text("\xA0\xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 396
    }, [api_text(" Purchase Price:")]), api_text("\xA0\xA0\xA0\xA0\xA0\xA0"), api_element("input", {
      key: 397
    }, []), api_text("\xA0\xA0\xA0\xA0\xA0\xA0"), api_element("br", {
      key: 398
    }, []), api_element("label", {
      key: 399
    }, [api_text(" Amount Financed:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 400
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 401
    }, [api_text(" Rehab Budget:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 402
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 403
    }, [api_text(" Address 1:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 404
    }, []), api_text("\xA0\xA0\xA0"), api_element("br", {
      key: 405
    }, []), api_element("label", {
      key: 406
    }, [api_text(" City:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 407
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 408
    }, [api_text(" State:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 409
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 410
    }, [api_text(" Zip Code: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 411
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 412
    }, [api_text(" Entity Name: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 413
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 414
    }, [api_text(" Ownership %:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 415
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 416
    }, [api_text(" Exit: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 417
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 418
    }, [api_text(" Monthly Rent: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 419
    }, [])]), api_element("br", {
      key: 421
    }, []), api_element("br", {
      key: 422
    }, []), api_element("br", {
      key: 423
    }, []), api_element("hr", {
      styleMap: {
        "borderTopColor": "currentcolor"
      },
      key: 424
    }, []), api_element("span", {
      classMap: {
        "one": true
      },
      key: 425
    }, [api_text("2. ")]), api_element("span", {
      classMap: {
        "text-form": true
      },
      key: 452
    }, [api_element("label", {
      key: 426
    }, [api_text(" Property Type:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 427
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 428
    }, [api_text(" Purchase Date:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 429
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 430
    }, [api_text(" Purchase Price:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 431
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 432
    }, [api_text(" Amount Financed:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 433
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 434
    }, [api_text(" Rehab Budget:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 435
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 436
    }, [api_text(" Address 1:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 437
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 438
    }, [api_text(" City:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 439
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 440
    }, [api_text(" State:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 441
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 442
    }, [api_text(" Zip Code: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 443
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 444
    }, [api_text(" Entity Name: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 445
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 446
    }, [api_text(" Ownership %:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 447
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 448
    }, [api_text(" Exit: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 449
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 450
    }, [api_text(" Monthly Rent: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 451
    }, [])]), api_element("br", {
      key: 453
    }, []), api_element("br", {
      key: 454
    }, []), api_element("br", {
      key: 455
    }, []), api_element("hr", {
      styleMap: {
        "borderTopColor": "currentcolor"
      },
      key: 456
    }, []), api_element("span", {
      classMap: {
        "one": true
      },
      key: 457
    }, [api_text("3. ")]), api_element("span", {
      classMap: {
        "text-form": true
      },
      key: 484
    }, [api_text("\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 458
    }, [api_text(" Property Type:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 459
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 460
    }, [api_text(" Purchase Date:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 461
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 462
    }, [api_text(" Purchase Price:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 463
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 464
    }, [api_text(" Amount Financed:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 465
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 466
    }, [api_text(" Rehab Budget:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 467
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 468
    }, [api_text(" Address 1:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 469
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 470
    }, [api_text(" City:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 471
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 472
    }, [api_text(" State:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 473
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 474
    }, [api_text(" Zip Code: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 475
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 476
    }, [api_text(" Entity Name: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 477
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 478
    }, [api_text(" Ownership %:")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 479
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 480
    }, [api_text(" Exit: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 481
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 482
    }, [api_text(" Monthly Rent: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      key: 483
    }, [])])]) : null, $cmp.isStepSeven ? api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-wrap": true
      },
      key: 512
    }, [api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 511
    }, [api_element("span", {
      key: 510
    }, [api_element("div", {
      classMap: {
        "container": true
      },
      key: 509
    }, [api_element("nav", {
      classMap: {
        "nav": true
      },
      key: 486
    }, [api_text("\xA0 VIII.\xA0 \xA0\xA0ATTORNEY INFORMATION")]), api_element("br", {
      key: 487
    }, []), api_element("div", {
      classMap: {
        "1st": true
      },
      key: 492
    }, [api_element("label", {
      key: 488
    }, [api_text("Firm Name: ")]), api_element("input", {
      attrs: {
        "name": "Firm Name:",
        "type": "text",
        "size": "50"
      },
      key: 489
    }, []), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 490
    }, [api_text("Attorney Name:")]), api_element("input", {
      attrs: {
        "name": "Attorney Name:",
        "type": "text",
        "size": "50"
      },
      key: 491
    }, [])]), api_element("br", {
      key: 493
    }, []), api_element("div", {
      classMap: {
        "2nd": true
      },
      key: 498
    }, [api_element("label", {
      key: 494
    }, [api_text("Address: ")]), api_element("input", {
      attrs: {
        "name": "Address:",
        "type": "text",
        "size": "50"
      },
      key: 495
    }, []), api_text("\xA0\xA0\xA0\xA0\xA0"), api_element("label", {
      key: 496
    }, [api_text("Office Phone:")]), api_element("input", {
      attrs: {
        "name": "Office Phone:",
        "type": "text",
        "size": "50"
      },
      key: 497
    }, [])]), api_element("br", {
      key: 499
    }, []), api_element("div", {
      classMap: {
        "3rd": true
      },
      key: 508
    }, [api_element("label", {
      key: 500
    }, [api_text("City: ")]), api_text("\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "name": "City:",
        "type": "text",
        "size": "15"
      },
      key: 501
    }, []), api_text("\xA0\xA0\xA0"), api_element("label", {
      key: 502
    }, [api_text("State:")]), api_text(" \xA0\xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "name": "State:",
        "type": "text",
        "size": "15"
      },
      key: 503
    }, []), api_text("\xA0\xA0 \xA0"), api_element("label", {
      key: 504
    }, [api_text("Zip Code:")]), api_text(" \xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "name": "Zip Code:",
        "type": "text",
        "size": "15"
      },
      key: 505
    }, []), api_text("\xA0\xA0 \xA0"), api_element("label", {
      key: 506
    }, [api_text("Email:")]), api_text(" \xA0\xA0\xA0"), api_element("input", {
      attrs: {
        "name": "Email:",
        "type": "text",
        "size": "15"
      },
      key: 507
    }, [])])])])])]) : null, api_element("div", {
      classMap: {
        "slds-grid": true,
        "slds-wrap": true
      },
      key: 518
    }, [api_element("div", {
      classMap: {
        "slds-col": true,
        "slds-size_1-of-1": true
      },
      key: 517
    }, [api_element("span", {
      key: 516
    }, [$cmp.isEnablePrev ? api_custom_element("lightning-button", _lightningButton, {
      classMap: {
        "slds-button": true,
        "back-btn": true
      },
      props: {
        "variant": "brand",
        "label": "Previous"
      },
      key: 513,
      on: {
        "click": _m34 || ($ctx._m34 = api_bind($cmp.handlePrev))
      }
    }, []) : null, $cmp.isEnableNext ? api_custom_element("lightning-button", _lightningButton, {
      classMap: {
        "slds-button": true,
        "next-btn": true
      },
      props: {
        "label": "Next",
        "variant": "brand",
        "id": api_scoped_id("btn")
      },
      key: 514,
      on: {
        "click": _m35 || ($ctx._m35 = api_bind($cmp.handleNext))
      }
    }, []) : null, $cmp.isEnableFinish ? api_custom_element("lightning-button", _lightningButton, {
      classMap: {
        "slds-button": true,
        "finish-btn": true
      },
      props: {
        "label": "Finish",
        "variant": "brand"
      },
      key: 515,
      on: {
        "click": _m36 || ($ctx._m36 = api_bind($cmp.handleFinish))
      }
    }, []) : null])])])])];
  }

  var _tmpl$6 = lwc.registerTemplate(tmpl$9);
  tmpl$9.stylesheets = [];

  if (_implicitStylesheets) {
    tmpl$9.stylesheets.push.apply(tmpl$9.stylesheets, _implicitStylesheets);
  }
  tmpl$9.stylesheetTokens = {
    hostAttribute: "lwc-borrowerTrackRecord_borrowerTrackRecord-host",
    shadowAttribute: "lwc-borrowerTrackRecord_borrowerTrackRecord"
  };

  class BorrowerTrackRecord extends lwc.LightningElement {
    constructor(...args) {
      super(...args);
      this.currentStep = '1';
      this.areDetailsVisible = false;
    }
    handleOnStepClick(event) {
      this.currentStep = event.target.value;
    }
    get isStepOne() {
      return this.currentStep === "1";
    }
    get isSteptwo() {
      return this.currentStep === "2";
    }
    get isStepThree() {
      return this.currentStep === "3";
    }
    get isStepFour() {
      return this.currentStep === "4";
    }
    get isStepFive() {
      return this.currentStep === "5";
    }
    get isStepSix() {
      return this.currentStep === "6";
    }
    get isStepSeven() {
      return this.currentStep === "7";
    }
    get isEnableNext() {
      return this.currentStep != "7";
    }
    get isEnablePrev() {
      return this.currentStep != "1";
    }
    get isEnableFinish() {
      return this.currentStep === "7";
    }
    handleNext() {
      // document.getElementById('btn').onclick = function() {  
      //     var markedCheckbox = document.getElementsByName('maritalStatus');  
      //     for (var checkbox of markedCheckbox) {  
      //       if (checkbox.checked)  
      //         document.body.append(checkbox.value + ' ');  
      //     }  
      //   }  

      //   document.getElementById('btn').onclick = function() {  
      //     var markedCheckbox = document.getElementsByName('None');  
      //     for (var checkbox of markedCheckbox) {  
      //       if (checkbox.checked)  
      //         document.body.append(checkbox.value + ' ');  
      //     }  
      //   }  
      //   document.getElementById('btn').onclick = function() {  
      //     var markedCheckbox = document.getElementsByName('Yes');  
      //     for (var checkbox of markedCheckbox) {  
      //       if (checkbox.checked)  
      //         document.body.append(checkbox.value + ' ');  
      //     }  
      //   }  

      //   document.getElementById('btn').onclick = function() {  
      //     var markedCheckbox = document.getElementsByName('NO');  
      //     for (var checkbox of markedCheckbox) {  
      //       if (checkbox.checked)  
      //         document.body.append(checkbox.value + ' ');  
      //     }  
      //   }  

      //   document.getElementById('btn').onclick = function() {  
      //     var markedCheckbox = document.getElementsByName('Experience');  
      //     for (var checkbox of markedCheckbox) {  
      //       if (checkbox.checked)  
      //         document.body.append(checkbox.value + ' ');  
      //     }  
      //   }  

      //   document.getElementById('btn').onclick = function() {  
      //     var markedCheckbox = document.getElementsByName('scale');  
      //     for (var checkbox of markedCheckbox) {  
      //       if (checkbox.checked)  
      //         document.body.append(checkbox.value + ' ');  
      //     }  
      //   }  

      if (this.currentStep == "1") {
        this.currentStep = "2";
      } else if (this.currentStep == "2") {
        this.currentStep = "3";
      } else if (this.currentStep == "3") {
        this.currentStep = "4";
      } else if (this.currentStep == "4") {
        this.currentStep = "5";
      } else if (this.currentStep == "5") {
        this.currentStep = "6";
      } else if (this.currentStep == "6") {
        this.currentStep = "7";
      }
    }
    handlePrev() {
      if (this.currentStep == "7") {
        this.currentStep = "6";
      } else if (this.currentStep == "6") {
        this.currentStep = "5";
      } else if (this.currentStep == "5") {
        this.currentStep = "4";
      } else if (this.currentStep == "4") {
        this.currentStep = "3";
      } else if (this.currentStep == "3") {
        this.currentStep = "2";
      } else if (this.currentStep = "2") {
        this.currentStep = "1";
      }
    }
    handleFinish() {}

    //areDetailsVisible = false;

    // @track isDisabled= true;
    // handleonChange(event){
    //    if(event.target.checked == 'All'){
    //     this.isDisabled =true;
    //    }else{
    //     this.isDisabled =false;
    //    }
    // }

    // handleCheckboxChange(event) {
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'married' ? this.template.querySelector('[name="notMarried"]') : this.template.querySelector('[name="married"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    handleCheckboxChange(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }
    handleCheckbox(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }

    // handlecheckboxChange(event) {
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'YES' ? this.template.querySelector('[name="NO"]') : this.template.querySelector('[name="YES"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    handlecheckboxChange(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }

    // handleCheckbox(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === 'None' ? this.template.querySelectorAll('[name="1-3 Deals"], [name="5+ Deals"]') : this.template.querySelector('[name="None"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;

    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }

    // handlecheckbox(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '1-3 Deals' ? this.template.querySelectorAll('[name="None"], [name="5+ Deals"]') : this.template.querySelector('[name="1-3 Deals"]');

    //     checkboxes.forEach(checkbox => {

    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }
    // handleCheckBox(event){
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '5+ Deals' ? this.template.querySelectorAll('[name="None"], [name="1-3 Deals"]') : this.template.querySelector('[name="5+ Deals"]');

    //     checkboxes.forEach(checkbox => {

    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }

    //const checkboxes = this.template.querySelectorAll('input[type="checkbox"]');

    // checkboxes.forEach(checkbox => {
    //     if (checkbox.name !== selectedCheckbox.name) {
    //         checkbox.disabled = selectedCheckbox.checked;
    //     }
    // });

    // handleBox(event){
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'Yes' ? this.template.querySelector('[name="No"]') : this.template.querySelector('[name="Yes"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    handleBox(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }

    // handleEvent(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === 'NONE' ? this.template.querySelectorAll('[name="1-3 DEALS"], [name="5+ DEALS"]') : this.template.querySelector('[name="NONE"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;

    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }
    // handleevent(event) {
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '1-3 DEALS' ? this.template.querySelectorAll('[name="NONE"], [name="5+ DEALS"]') : this.template.querySelector('[name="1-3 DEALS"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;

    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }
    // handleEvents(event){
    //     const selectedCheckbox = event.target;
    //     const checkboxes = selectedCheckbox.name === '5+ DEALS' ? this.template.querySelectorAll('[name="NONE"], [name="1-3 DEALS"]') : this.template.querySelector('[name="5+ DEALS"]');

    //     // checkboxes.disabled = selectedCheckbox.checked;

    //     checkboxes.forEach(checkbox => {
    //         //checkbox.disabled = true;
    //         if (checkbox.name !== selectedCheckbox.name) {
    //             checkbox.disabled = selectedCheckbox.checked;
    //                }
    //     });
    // }

    handleEvent(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }

    // YesEvent(event){
    //     const selectedCheckbox = event.target;

    //     const otherCheckbox = selectedCheckbox.name === 'scale' ? this.template.querySelector('[name="scales"]') : this.template.querySelector('[name="scale"]');

    //     otherCheckbox.disabled = selectedCheckbox.checked;
    // }

    YesEvent(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }
    formsection1(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }
    handleChange(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
      if (clickedCheckbox.value === "other" && clickedCheckbox.checked) {
        this.areDetailsVisible = true;
      } else {
        this.areDetailsVisible = false;
      }
    }
    gapFinancing(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }
    exitStrategy(event) {
      const clickedCheckbox = event.target;
      const checkboxes = this.template.querySelectorAll(`input[name="${clickedCheckbox.name}"]`);
      checkboxes.forEach(checkbox => {
        if (checkbox !== clickedCheckbox) {
          checkbox.checked = false;
        }
      });
    }
  }
  lwc.registerDecorators(BorrowerTrackRecord, {
    track: {
      currentStep: 1
    },
    fields: ["areDetailsVisible"]
  });
  var borrowerTrackRecord = lwc.registerComponent(BorrowerTrackRecord, {
    tmpl: _tmpl$6
  });

  return borrowerTrackRecord;

});
