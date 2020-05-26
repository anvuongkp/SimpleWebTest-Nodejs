import 'babel-polyfill'
import webdriver from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import path from 'path'

export async function quitDriver(driver) {
  try {
    await driver.quit()
  }
  catch (err) {
    console.log('failed to quit driver', err)
  }
}

export async function createDriver() {
  const chromeDriverPath = path.join(__dirname, "data\\chromedriver.exe")
  const serviceBuilder = new chrome.ServiceBuilder(chromeDriverPath);
  const chromeOptions = new chrome.Options()
  chromeOptions.addArguments('--headless')
  chromeOptions.addArguments('--log-level=3')

  let driver = await new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeService(serviceBuilder)
            .setChromeOptions(chromeOptions)
            .build()
  return driver

}
