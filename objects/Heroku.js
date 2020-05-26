import Helper from '../utils/Helper'
import Base from '../objects/Base'

const elements = {
  url: 'http://the-internet.herokuapp.com/login',
  usernameId: 'username',
  passwordId: 'password',
  username: 'tomsmith',
  password: 'SuperSecretPassword!',
  submitXpath: '//button[@class="radius"]',
  messageXpath: '//div[@id="flash"]'
}
const TIMEOUT = 2000
export default class HerokuPage extends Base {
  constructor(driver, timeout){
    super(driver, timeout)
  }

  async login() {
    await this.goTo(elements.url)
    const username = await this.findByID(elements.usernameId, TIMEOUT)
    await username.sendKeys(elements.username)
    const password = await this.findByID(elements.passwordId, TIMEOUT)
    await password.sendKeys(elements.password)
    const form = await this.findByXpath(elements.submitXpath, TIMEOUT)
    await form.click()
  }

  async getMessage() {
    const ele = await this.findByXpath(elements.messageXpath, TIMEOUT)
    return await ele.getText()
  }
}
