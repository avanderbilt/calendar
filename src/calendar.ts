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
