
import { Context } from './Context'


class FoodHygieneRatingError extends Error {

  isFoodHygieneRatingError = true

  sdk = 'FoodHygieneRating'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FoodHygieneRatingError
}

