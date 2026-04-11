import { type SchemaTypeDefinition } from 'sanity'

import book from '../schemas/book'
import post from '../schemas/post'
import quote from '../schemas/quote'
import config from '../schemas/config'
import user from '../schemas/user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [book, post, quote, config, user],
}
