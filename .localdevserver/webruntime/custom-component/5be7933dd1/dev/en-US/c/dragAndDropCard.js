Webruntime.define('lwc/dragAndDropCard', ['lwc', 'lightning/navigation'], function (lwc, navigation) { 'use strict';

    function stylesheet(hostSelector, shadowSelector, nativeShadow) {
      return ".slds-item" + shadowSelector + " {border: 1px solid #d8dde6;border-radius: 0.25rem;background-clip: padding-box;padding: 0.45rem;margin: 0.25rem;}\n";
    }
    var _implicitStylesheets = [stylesheet];

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        d: api_dynamic,
        h: api_element,
        b: api_bind,
        t: api_text
      } = $api;
      const {
        _m0,
        _m1,
        _m2
      } = $ctx;
      return [$cmp.isSameStage ? api_element("li", {
        classMap: {
          "slds-item": true,
          "slds-var-m-around_small": true
        },
        attrs: {
          "draggable": "true"
        },
        key: 10,
        on: {
          "dragstart": _m2 || ($ctx._m2 = api_bind($cmp.itemDragStart))
        }
      }, [api_element("article", {
        classMap: {
          "slds-tile": true,
          "slds-tile_board": true
        },
        key: 9
      }, [api_element("h3", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "title": $cmp.record.Name
        },
        key: 2
      }, [api_element("a", {
        attrs: {
          "href": "#",
          "data-id": $cmp.record.Id
        },
        key: 1,
        on: {
          "click": _m0 || ($ctx._m0 = api_bind($cmp.navigateOppHandler))
        }
      }, [api_element("span", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "data-id": $cmp.record.Id
        },
        key: 0
      }, [api_dynamic($cmp.record.Name)])])]), api_element("div", {
        classMap: {
          "slds-tile__detail": true,
          "slds-text-body_small": true
        },
        key: 8
      }, [api_element("p", {
        classMap: {
          "slds-text-heading_small": true
        },
        key: 3
      }, [api_text("Amount: $"), api_dynamic($cmp.record.Amount)]), api_element("p", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "title": $cmp.record.AccountName
        },
        key: 6
      }, [api_element("a", {
        attrs: {
          "href": "#",
          "data-id": $cmp.record.AccountId
        },
        key: 5,
        on: {
          "click": _m1 || ($ctx._m1 = api_bind($cmp.navigateAccHandler))
        }
      }, [api_element("span", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "data-id": $cmp.record.AccountId
        },
        key: 4
      }, [api_dynamic($cmp.record.AccountName)])])]), api_element("p", {
        classMap: {
          "slds-truncate": true
        },
        attrs: {
          "title": $cmp.record.CloseDate
        },
        key: 7
      }, [api_text("Closing "), api_dynamic($cmp.record.CloseDate)])])])]) : null];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];

    if (_implicitStylesheets) {
      tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
    }
    tmpl.stylesheetTokens = {
      hostAttribute: "lwc-dragAndDropCard_dragAndDropCard-host",
      shadowAttribute: "lwc-dragAndDropCard_dragAndDropCard"
    };

    class DragAndDropCard extends navigation.NavigationMixin(lwc.LightningElement) {
      constructor(...args) {
        super(...args);
        this.stage = void 0;
        this.record = void 0;
      }
      get isSameStage() {
        return this.stage === this.record.StageName;
      }
      navigateOppHandler(event) {
        event.preventDefault();
        this.navigateHandler(event.target.dataset.id, 'Opportunity');
      }
      navigateAccHandler(event) {
        event.preventDefault();
        this.navigateHandler(event.target.dataset.id, 'Account');
      }
      navigateHandler(Id, apiName) {
        this[navigation.NavigationMixin.Navigate]({
          type: 'standard__recordPage',
          attributes: {
            recordId: Id,
            objectApiName: apiName,
            actionName: 'view'
          }
        });
      }
      itemDragStart() {
        const event = new CustomEvent('itemdrag', {
          detail: this.record.Id
        });
        this.dispatchEvent(event);
      }
    }
    lwc.registerDecorators(DragAndDropCard, {
      publicProps: {
        stage: {
          config: 0
        },
        record: {
          config: 0
        }
      }
    });
    var dragAndDropCard = lwc.registerComponent(DragAndDropCard, {
      tmpl: _tmpl
    });

    return dragAndDropCard;

});
