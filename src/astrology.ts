import {Command} from '@oclif/core'
import moment from 'moment'
import suncalc from 'suncalc'
import Configuration from './configuration'
import chalk from 'chalk'

export default class Astrology {
  private command: Command
  constructor(command: Command) {
    this.command = command
  }

  public printSunTimesFor = (when: Date | undefined): void => {
    if (!when) {
      throw new Error('No date was provided.')
    }

    const sunTimes = suncalc.getTimes(when, Configuration.latitude, Configuration.longitude)

    const sunrise = moment(sunTimes.sunrise)
    const solarNoon = moment(sunTimes.solarNoon)
    const sunset = moment(sunTimes.sunset)
    const solarMidnight = moment(sunTimes.nadir)

    const sunPhase = moment(when).isAfter(sunrise) && moment(when).isBefore(sunset) ? 'up' : 'down'

    this.command.log(`\n${chalk.bold.yellowBright('The Sun')} ${chalk.red('♢')} ${chalk.gray(`The sun is currently ${sunPhase}.`)}\n`)

    if (solarMidnight < sunrise) {
      this.command.log(`• ${chalk.bold('Midnight')}: ${chalk.greenBright(solarMidnight.format(Configuration.timeFormat))}`)
    }

    this.command.log(`• ${chalk.bold('Sunrise')}:  ${chalk.greenBright(sunrise.format(Configuration.timeFormat))}`)
    this.command.log(`• ${chalk.bold('Noon')}:     ${chalk.greenBright(solarNoon.format(Configuration.timeFormat))}`)
    this.command.log(`• ${chalk.bold('Sunset')}:   ${chalk.greenBright(sunset.format(Configuration.timeFormat))}`)

    if (solarMidnight > sunset) {
      this.command.log(`• ${chalk.bold('Midnight')}: ${chalk.greenBright(solarMidnight.format(Configuration.timeFormat))}`)
    }
  }

  public printMoonTimesFor = (when: Date | undefined): void => {
    if (!when) {
      throw new Error('No date was provided.')
    }

    const startingMoonPhase = suncalc.getMoonIllumination(moment(when).startOf('day').toDate()).phase
    const endingMoonPhase = suncalc.getMoonIllumination(moment(when).endOf('day').toDate()).phase
    const currentMoonPhase = suncalc.getMoonIllumination(when).phase

    const newMoonPhase = 0
    const firstQuarterMoonPhase = 0.25
    const fullMoonPhase = 0.5
    const lastQuarterMoonPhase = 0.75

    let moonPhase = ''

    if (startingMoonPhase > endingMoonPhase || (startingMoonPhase < newMoonPhase && endingMoonPhase > newMoonPhase)) {
      moonPhase = 'New Moon'
    } else if (startingMoonPhase < firstQuarterMoonPhase && endingMoonPhase > firstQuarterMoonPhase) {
      moonPhase = 'First Quarter'
    } else if (startingMoonPhase < fullMoonPhase && endingMoonPhase > fullMoonPhase) {
      moonPhase = 'Full Moon'
    } else if (startingMoonPhase < lastQuarterMoonPhase && endingMoonPhase > lastQuarterMoonPhase) {
      moonPhase = 'Last Quarter'
    } else if (currentMoonPhase < 0.25) {
      moonPhase = 'Waxing Crescent'
    } else if (currentMoonPhase < 0.5) {
      moonPhase = 'Waxing Gibbous'
    } else if (currentMoonPhase < 0.75) {
      moonPhase = 'Waning Gibbous'
    } else if (currentMoonPhase < 1) {
      moonPhase = 'Waning Crescent'
    }

    const moonTimes = suncalc.getMoonTimes(when, Configuration.latitude, Configuration.longitude)

    const moonrise = moment(moonTimes.rise)
    const moonset = moment(moonTimes.set)

    this.command.log(`
${chalk.bold.yellowBright('The Moon')} ${chalk.red('♢')} ${chalk.gray(`The current moon phase is ${moonPhase}`)}

• ${chalk.bold('Moonrise')}: ${chalk.greenBright(moonrise.format(Configuration.timeFormat))}
• ${chalk.bold('Moonset')}:  ${chalk.greenBright(moonset.format(Configuration.timeFormat))}`)
  }
}
