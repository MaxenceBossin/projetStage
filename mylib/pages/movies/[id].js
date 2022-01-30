import { useRouter } from 'next/router'
export default function MovieList(){
   const rooter = useRouter()
   const { id } = rooter.query

   return  <h1> movie : { id }</h1>
}