
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HackernewsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HackernewsSDK.test()
    equal(null !== testsdk, true)
  })

})
