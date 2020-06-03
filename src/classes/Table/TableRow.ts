export default class TableRow {
  keys = ''
  fruits = ''

  constructor (data: Partial<TableRow>) {
    Object.assign(this, data)
  }
}
