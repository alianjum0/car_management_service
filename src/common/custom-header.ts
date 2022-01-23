import { IncomingHttpHeaders } from 'http'
import { Request } from 'express'

interface CustomRequest extends Request {
  headers      : IncomingHttpHeaders & {
    userid?: string
  }
}

export { CustomRequest }
