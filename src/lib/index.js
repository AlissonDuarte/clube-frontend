// place files you want to import through the `$lib` alias in this folder.
import dotenv from 'dotenv'

dotenv.config()

export const env = process.env

/** /src/lib/other.js **/
import { env } from '$lib/env'

const api_url = env.API_URL_BASE
