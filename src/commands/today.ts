import {Command, Flags} from '@oclif/core'
import Calendar from '../calendar'
import Astrology from '../astrology'
import moment from 'moment'
import chalk from 'chalk'
import * as chrono from 'chrono-node'

export default class Today extends Command {
  public static description = 'This is information about today.'
  public static now = new Date()

  public static flags = {
    sun: Flags.boolean({char: 's', description: 'Show solar information only.', exclusive: ['moon'], required: false}),
    moon: Flags.boolean({char: 'm', description: 'Show lunar information only.', exclusive: ['sun'], required: false}),
  }

  public static args = [{name: 'when', description: 'Specify a specific time.', required: false}]

  private printSummary = async () => {
    const client = new Calendar()
    const week = await client.getWeek()
    const day = Today.now.getDay()
    const today = week.days.find(d => d.index === day)

    if (!today) {
      this.error('No entry was found in the database for today.')
    }

    const output = `
• ${chalk.bold('Planet')}: ${chalk.blueBright(today.planet)}
• ${chalk.bold('Metal')}:  ${chalk.blueBright(today.metal)}`

    this.log(output)
  }

  public run = async (): Promise<void> => {
    const {args, flags} = await this.parse(Today)

    const parsedWhen = chrono.parseDate(args.when)

    if (!parsedWhen) {
      this.warn(`"${args.when}" is not a valid date. Using the current date and time.`)
    }

    const when = parsedWhen ? new Date(parsedWhen) : Today.now

    const m = moment(when)
    this.log(`\n${chalk.bold.yellowBright(m.format('dddd'))} ${chalk.red('♢')} ${chalk.gray(m.format('MMMM Do, YYYY h:mm a'))}`)

    if (!flags.sun && !flags.moon) {
      await this.printSummary()
    }

    const astrology = new Astrology(this)

    if (!flags.moon) {
      astrology.printSunTimesFor(when)
    }

    if (!flags.sun) {
      astrology.printMoonTimesFor(when)
    }
  }
}
