import 'babel-polyfill'
import 'colors'
import {assert} from 'chai'
import {createDriver, quitDriver} from '../utils/Driver'
import HerokuPage from '../objects/Heroku'


describe('test heroku login function', () => {
  let driver

  before(async () => {
    driver = await createDriver()
  })

  describe('input correct credentials', async () => {
    it('should login with correct credentials sussessfully', async () =>{
      const timeout = 60000
      const herokuPage = new HerokuPage(driver, timeout)
      await herokuPage.login()
      await herokuPage.waitFor(2)
      const expect = 'You logged into a secure area!\n×'
      const actual = await herokuPage.getMessage()
      assert.equal(actual, expect)
    })
  })

  after(async() => {
    await quitDriver(driver)
  })
})
