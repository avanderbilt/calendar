import {MongoClient} from 'mongodb'

export class Day {
  public index: number
  public name: string
  public planet: string | undefined
  public metal: string | undefined
  constructor(index: number, name: string) {
    this.index = index
    this.name = name
  }
}

export class Easter {
  // https://www.irt.org/articles/js052/index.htm
  public getDateFor = (year: number): Date => {
    const c = Math.floor(year / 100)
    const n = year - (19 * Math.floor(year / 19))
    const k = Math.floor((c - 17) / 25)
    let i = c - Math.floor(c / 4) - Math.floor((c - k) / 3) + (19 * n) + 15
    i -= (30 * Math.floor((i / 30)))
    i -= Math.floor(i / 28) * (1 - (Math.floor(i / 28) * Math.floor(29 / (i + 1)) * Math.floor((21 - n) / 11)))
    let j = year + Math.floor(year / 4) + i + 2 - c + Math.floor(c / 4)
    j -= 7 * Math.floor(j / 7)
    const l = i - j
    const month = 3 + Math.floor((l + 40) / 44) - 1
    const day = l + 28 - (31 * Math.floor(month / 4))

    return new Date(year, month, day)
  }

  private padout = (number: number): string => {
    return (number < 10) ? '0' + number.toString() : number.toString()
  }
}

export class Week {
  public days: Day[]
  constructor(days: Day[]) {
    this.days = days
  }
}

export default class Calendar {
  private connectionUri = 'mongodb://localhost:27017'
  private client = new MongoClient(this.connectionUri)
  private projection = {_id: 0, index: 1, name: 1}

  public getDays = async (): Promise<Day[]> => {
    const days: Day[] = []
    try {
      await this.client.connect()
      const daysFound = await this.client.db('calendar').collection('week_days').find().project(this.projection).toArray()
      const planetsFound = await this.client.db('calendar').collection('classical_planets').find().project(this.projection).toArray()
      const metalsFound = await this.client.db('calendar').collection('alchemical_metals').find().project(this.projection).toArray()
      for (const d of daysFound) {
        const day = new Day(d.index, d.name)
        day.planet = planetsFound.find(p => p.index === d.index)?.name
        day.metal = metalsFound.find(m => m.index === d.index)?.name
        days.push(day)
      }
    } catch (error) {
      console.error(error)
    } finally {
      await this.client.close()
    }

    return days
  }

  public getWeek = async (): Promise<Week> => {
    const days = await this.getDays()
    return new Week(days)
  }
}
