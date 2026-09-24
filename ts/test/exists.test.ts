
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FoodHygieneRatingSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FoodHygieneRatingSDK.test()
    equal(testsdk instanceof FoodHygieneRatingSDK, true,
      'FoodHygieneRatingSDK.test() must return a client synchronously')
  })

})
