import axios from "axios";
import { setupCache } from 'axios-cache-adapter'



const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: {
    // Only exclude PUT, PATCH and DELETE methods from cache
    methods: ['put', 'patch', 'delete']
  }
})
export const axiosCached = axios.create({
  adapter: cache.adapter
})