
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HackernewsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HackernewsSDK.test()
    equal(testsdk instanceof HackernewsSDK, true,
      'HackernewsSDK.test() must return a client synchronously')
  })

})
