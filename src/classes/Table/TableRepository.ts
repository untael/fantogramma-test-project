import * as t from 'io-ts'
import axios, { AxiosResponse } from 'axios'
import Table from './Table'
import TableRow from './TableRow'
import { PathReporter } from 'io-ts/es6/PathReporter'
import { isRight } from 'fp-ts/es6/These'

const map = (plain: any): Table => {
  const table: Table = new Table()
  for (const obj in plain) {
    table.rows.push(new TableRow({
      keys: obj,
      fruits: plain[obj].fruit
    })
    )
  }
  return table
}

const get = async (): Promise<Table> => {
  const keys = t.type({
    key22: t.type({
      fruit: t.string
    }),
    key1: t.type({
      fruit: t.string
    }),
    key100: t.type({
      fruit: t.string
    }),
    key4: t.type({
      fruit: t.string
    })
  })
  type Keys = t.TypeOf<typeof keys>

  const plain: AxiosResponse = await axios.get('http://fantogramma.org/test.json')
  const decodedPlain = keys.decode(plain.data)
  if (isRight(decodedPlain)) {
    return map(plain.data)
  } else {
    throw (PathReporter.report(decodedPlain))
  }
}

export default {
  get
}
