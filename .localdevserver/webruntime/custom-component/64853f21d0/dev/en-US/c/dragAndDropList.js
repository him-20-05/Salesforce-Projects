Webruntime.define('lwc/dragAndDropList', ['lwc', 'c/dragAndDropCard'], function (lwc, _cDragAndDropCard) { 'use strict';

    _cDragAndDropCard = _cDragAndDropCard && Object.prototype.hasOwnProperty.call(_cDragAndDropCard, 'default') ? _cDragAndDropCard['default'] : _cDragAndDropCard;

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        k: api_key,
        b: api_bind,
        c: api_custom_element,
        i: api_iterator,
        h: api_element
      } = $api;
      const {
        _m0,
        _m1,
        _m2
      } = $ctx;
      return [api_element("ul", {
        classMap: {
          "slds-has-dividers_around-space": true,
          "dropZone": true
        },
        styleMap: {
          "height": "70vh",
          "overflowY": "auto"
        },
        key: 1,
        on: {
          "drop": _m1 || ($ctx._m1 = api_bind($cmp.handleDrop)),
          "dragover": _m2 || ($ctx._m2 = api_bind($cmp.handleDragOver))
        }
      }, api_iterator($cmp.records, function (recordItem) {
        return api_custom_element("c-drag-and-drop-card", _cDragAndDropCard, {
          props: {
            "stage": $cmp.stage,
            "record": recordItem
          },
          key: api_key(0, recordItem.Id),
          on: {
            "itemdrag": _m0 || ($ctx._m0 = api_bind($cmp.handleItemDrag))
          }
        }, []);
      }))];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetTokens = {
      hostAttribute: "lwc-dragAndDropList_dragAndDropList-host",
      shadowAttribute: "lwc-dragAndDropList_dragAndDropList"
    };

    class DragAndDropList extends lwc.LightningElement {
      constructor(...args) {
        super(...args);
        this.records = void 0;
        this.stage = void 0;
      }
      handleItemDrag(evt) {
        const event = new CustomEvent('listitemdrag', {
          detail: evt.detail
        });
        this.dispatchEvent(event);
      }
      handleDragOver(evt) {
        evt.preventDefault();
      }
      handleDrop(evt) {
        const event = new CustomEvent('itemdrop', {
          detail: this.stage
        });
        this.dispatchEvent(event);
      }
    }
    lwc.registerDecorators(DragAndDropList, {
      publicProps: {
        records: {
          config: 0
        },
        stage: {
          config: 0
        }
      }
    });
    var dragAndDropList = lwc.registerComponent(DragAndDropList, {
      tmpl: _tmpl
    });

    return dragAndDropList;

});
