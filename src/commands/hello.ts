import {Command, Flags} from '@oclif/core'

export default class Hello extends Command {
  private static examplePerson = 'Arthur'
  private static exampleFrom = 'Jessica'
  public static description = 'Say hello to a friend or to the world, from someone or from no one.'

  public static examples = [
    `$ cal hello ${Hello.examplePerson} --from ${Hello.exampleFrom}
${Hello.output(Hello.examplePerson, Hello.exampleFrom)}`,
    `$ cal hello ${Hello.examplePerson}
${Hello.output(Hello.examplePerson)}`,
    `$ cal hello
${Hello.output()}`,
  ]

  public static flags = {
    from: Flags.string({char: 'f', description: 'The person who is saying hello.', required: false}),
  }

  public static args = [{name: 'person', description: 'The person hello is being said to.', required: false}]

  private static output(person?: string, from?: string): string {
    const world = !person && !from
    return `Hello${person ? ` ${person}` : ''}${from ? ` from ${from}` : ''}${world ? ' world' : ''}!`
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Hello)
    const output = Hello.output(args.person, flags.from)
    this.log(output)
  }
}

