self.addEventListener('paymentrequest', event => {
  const expectedId = 'test-payment-request-identifier';
  if (event.paymentRequestId !== expectedId) {
    const msg = `Expected payment request identifier "${expectedId}", but got "${
      event.paymentRequestId
    }"`;
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  if (event.methodData.length !== 1) {
    const msg = `Expected one method data, but got ${
      event.methodData.length
    } instead`;
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  const methodData = event.methodData[0];
  const expectedMethodName = window.location.origin + '/payment-handler/payment-app/';
  if (methodData.supportedMethods !== expectedMethodName) {
    const msg = `Expected payment method name "${expectedMethodName}", but got "${
      methodData.supportedMethods
    }"`;
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  if (methodData.data.supportedNetworks) {
    const msg =
      'Expected no supported networks in payment method specific data';
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  if (methodData.displayItems) {
    const msg = 'Expected no display items';
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  const total = event.total;
  if (!total) {
    const msg = 'Expected total';
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  if (total.label) {
    const msg = 'Expected no total label';
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  const expectedCurrency = 'USD';
  if (total.currency !== expectedCurrency) {
    const msg = `Expected currency "${expectedCurrency}", but got "${
      total.currency
    }"`;
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  const expectedValue = '0.01';
  if (total.value !== expectedValue) {
    const msg = `Expected value "${expectedValue}", but got "${total.value}"`;
    event.respondWith(Promise.reject(new Error(msg)));
    return;
  }

  event.respondWith({
    methodName: expectedMethodName,
  });
});
