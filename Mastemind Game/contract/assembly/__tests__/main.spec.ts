import { setMastermind } from '..'
import { storage, Context } from 'near-sdk-as'

describe('mastermind ', () => {
  it('should be set and read', () => {
    setMastermind('hello world')
    storage.get<string>(Context.sender)
  })
})
