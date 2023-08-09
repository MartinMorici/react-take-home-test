import DATA from './data.json'
import { Ballot } from './types'




const api = {
    ballot: {
        fetch: async (): Promise <Ballot[]> => DATA.items as Ballot[]
    }
}

export default api