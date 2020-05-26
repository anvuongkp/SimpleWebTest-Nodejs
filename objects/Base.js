import {createDriver, quitDriver} from '../utils/Driver'
import Helper from '../utils/Helper'
import {By, findElement} from 'selenium-webdriver'

const DEFAULT_TIMEOUT = 5000
let helper
export default class Base {

  constructor(driver, timeout) {
    this.driver_ = driver
    this.timeout_ = timeout
    helper = new Helper(driver, timeout)
  }

  async goTo(url) {
    await this.driver_.get(url)
  }

  async findByID(locator, timeout) {
    const timeout_ = timeout || DEFAULT_TIMEOUT
    return await this.driver_.findElement(By.id(locator), timeout_)
  }

  async findByXpath(locator, timeout) {
    const timeout_ = timeout || DEFAULT_TIMEOUT
    return await this.driver_.findElement(By.xpath(locator), timeout_)
  }

  async waitFor(timeout) {
    await this.driver_.sleep(timeout*1000)
  }

  async waitForElement(locator, timeout) {
    const timeout_ = timeout || DEFAULT_TIMEOUT
    return this.driver_.wait(until.elementLocated(locator), timeout_)
  }

  async waitForElementVisible(locator, timeout) {
    const timeout_ = timeout || DEFAULT_TIMEOUT
    const element = this.wait(until.elementLocated(locator), timeout_)
    return this.driver.wait(new until.WebElementCondition('wait for element to be visible: ' + locator, () => {
      return element.isDisplayed().then(state => state ? element : null)
    }))
  }

}
