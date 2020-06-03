import TableRow from './TableRow'

export default class Table {
  rows: TableRow[] = []

  get columns (): string[] {
    return ['keys', 'fruits']
  }

  constructor (data?: Partial<Table>) {
    Object.assign(this, data)
  }
}
