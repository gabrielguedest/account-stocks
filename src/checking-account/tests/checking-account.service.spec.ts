import { BadRequestException } from "@nestjs/common"
import { CheckingAccountRepository } from "../repositories/checking-account.repository"
import { CheckingAccountService } from "../services/checking-account.service"

describe('CheckingAccountService', () => {
  let checkingAccountRepository: CheckingAccountRepository
  let checkingAccountService: CheckingAccountService

  beforeAll(() => {
    checkingAccountRepository = {
      checkIfCodeIsAvailable: jest.fn(),
      createCheckingAccount: jest.fn(),
      getCheckingAccount: jest.fn(),
      updateBalance: jest.fn(),
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

  describe('withdraw', () => {
    test('should withdraw from an account', async () => {
      const account = {
        code: '123456',
        balance: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const getCheckingAccountFn = jest.spyOn(checkingAccountRepository, 'getCheckingAccount').mockResolvedValue(account)
      const updateBalanceFn = jest.spyOn(checkingAccountRepository, 'updateBalance').mockResolvedValue(null)

      await checkingAccountService.withdraw('123456', 500)

      expect(getCheckingAccountFn).toHaveBeenCalledWith('123456', undefined)
      expect(updateBalanceFn).toHaveBeenCalledWith('123456', 500, undefined)
    })

    test('should throw error if balance is not enough', async () => {
      const account = {
        code: '123456',
        balance: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const getCheckingAccountFn = jest.spyOn(checkingAccountRepository, 'getCheckingAccount').mockResolvedValue(account)
      const updateBalanceFn = jest.spyOn(checkingAccountRepository, 'updateBalance').mockResolvedValue(null)

      try {
        await checkingAccountService.withdraw('123456', 15000)
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException)
        expect(error.message).toBe('Saldo insuficiente')
      }

      expect(getCheckingAccountFn).toHaveBeenCalledWith('123456', undefined)
      expect(updateBalanceFn).toHaveBeenCalledWith('123456', 500, undefined)
    })
  })
})