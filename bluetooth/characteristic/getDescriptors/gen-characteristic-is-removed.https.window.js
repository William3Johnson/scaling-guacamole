// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-test.js
// META: script=/bluetooth/resources/bluetooth-fake-devices.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Characteristic gets removed. Reject with InvalidStateError.';
const expected = new DOMException(
    'GATT Characteristic no longer exists.', 'InvalidStateError');
let fake_peripheral, characteristic, fake_characteristic;

bluetooth_test(
    () =>
        getMeasurementIntervalCharacteristic()
            .then(
                _ => (
                    {fake_peripheral, characteristic, fake_characteristic} = _))
            .then(() => characteristic.getDescriptor(user_description.name))
            .then(
                () => null,
                (e) => assert_unreached('Caught error unexpectedly.', e))
            .then(() => fake_characteristic.remove())
            .then(() => fake_peripheral.simulateGATTServicesChanged())
            .then(
                () => assert_promise_rejects_with_message(
                    characteristic.getDescriptors(), expected)),
    test_desc);
