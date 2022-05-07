/*
 * Mastermind game contract
 *
 */


import { Context, ContractPromiseBatch, logging, storage, u128 } from 'near-sdk-as'

const amount: u128 = u128.from("1000000000000000000000000") // 1 NEAR



export function getMastermind(accountId: string): string | null {

  return storage.get<string>(accountId)
}

export function setMastermind(message: string): void {
  const accountId = Context.sender


  if (message.includes("Win"))  {
    ContractPromiseBatch.create('fehmituran.testnet').transfer(amount)
    logging.log(`Congratulations, "${message}"`)

   } else {
    logging.log(`Unfortunately, "${message}"`)
   }
 
  storage.set(accountId, message)
}

