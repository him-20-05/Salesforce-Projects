({
        handleAccountSelect: function (component, event) {
            var service = component.find('getAccount');
            component.set('v.accountId', event.getParam('accountId'));
            service.reloadRecord();
        }
    })