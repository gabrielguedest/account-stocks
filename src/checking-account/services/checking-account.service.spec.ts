import { CheckingAccountRepository } from "../repositories/checking-account.repository"
import { CheckingAccountService } from "./checking-account.service"

describe('CheckingAccountService', () => {
  let checkingAccountRepository: CheckingAccountRepository
  let checkingAccountService: CheckingAccountService

  beforeAll(() => {
    checkingAccountRepository = {
      checkIfCodeIsAvailable: jest.fn(),
      createCheckingAccount: jest.fn(),
    } as unknown as CheckingAccountRepository

    checkingAccountService = new CheckingAccountService(checkingAccountRepository)
  })

  test('should make an account code', async () => {
    let codeChecks = 0
    const checkCodeFn = jest.spyOn(checkingAccountRepository, 'checkIfCodeIsAvailable').mockImplementation(async (_) => {
      codeChecks++;
      return codeChecks > 1;
    })

    const accountCode = await checkingAccountService.makeAccountCode()

    expect(accountCode).not.toBe(null)
    expect(accountCode.length).toBe(6)
    expect(checkCodeFn).toHaveBeenCalledTimes(2)
  })

  test('should create a checking account', async () => {
    const checkCodeFn = jest.spyOn(checkingAccountRepository, 'checkIfCodeIsAvailable').mockResolvedValue(true)
    const createCheckingAccountFn = jest.spyOn(checkingAccountRepository, 'createCheckingAccount').mockResolvedValue({
      code: '123456',
      balance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const account = await checkingAccountService.createNewCheckingAccount()

    expect(account).not.toBe(null)
    expect(account.code).toBe('123456')
    expect(account.balance).toBe(0)
    expect(checkCodeFn).toHaveBeenCalled()
    expect(createCheckingAccountFn).toHaveBeenCalled()
  })
})