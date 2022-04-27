import axios from "axios";


   export default async function call(job,remote){

      axios.get(`http://localhost:8080/run?job=${job}&hostname=${remote}`)
            .then(res=>console.log(res.data)).catch(err=> console.log(err))

    }

