import {Command} from '@oclif/core'
import Calendar from '../calendar'
import Astrology from '../astrology'
import moment from 'moment'
import chalk from 'chalk'

export default class Today extends Command {
  public static description = 'This is information about today.'
  public static now = new Date()

  private async printSummary() {
    const client = new Calendar()
    const week = await client.getWeek()
    const day = Today.now.getDay()
    const today = week.days.find(d => d.index === day)

    if (!today) {
      this.error('No entry was found in the database for today.')
    }

    const m = moment(Today.now)
    const output = `
${chalk.bold.yellowBright(today.name)} ${chalk.red('♢')} ${chalk.gray(m.format('MMMM Do, YYYY h:mm a'))}

• ${chalk.bold('Planet')}: ${chalk.blueBright(today.planet)}
• ${chalk.bold('Metal')}:  ${chalk.blueBright(today.metal)}`

    this.log(output)
  }

  private printSunAndMoonTimes() {
    const astrology = new Astrology(this, Today.now)

    astrology.printSunTimesForToday()
    astrology.printMoonTimesForToday()
  }

  public async run(): Promise<void> {
    await this.printSummary()
    this.printSunAndMoonTimes()
  }
}
