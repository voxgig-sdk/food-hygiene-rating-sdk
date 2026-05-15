
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FoodHygieneRatingSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FoodHygieneRatingSDK.test()
    equal(null !== testsdk, true)
  })

})
