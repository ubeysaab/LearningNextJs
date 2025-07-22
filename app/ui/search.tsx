'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useSearchParams,usePathname,useRouter } from 'next/navigation';

import { useDebounce,useDebouncedCallback} from 'use-debounce';




export default function Search({ placeholder }: { placeholder: string }) {

  let [input,setInput] = useState("")
  let [debouncedInput] = useDebounce(input,1000)


  const searchParams = useSearchParams()
  // console.log(searchParams)
  const pathName = usePathname()
  // console.log(pathName)
const router = useRouter()


//  ! For Adding Debouncing 



  function handleSearch(e:React.ChangeEvent<HTMLInputElement>){
    setInput(e?.target?.value)
    // todo : why we create an instace of the searchparams ??
    const params = new URLSearchParams(searchParams);
    // console.log(params.get('name'))

  handleSearchDebounced(e)
    
  }

  const  handleSearchDebounced = useDebouncedCallback((e:React.ChangeEvent<HTMLInputElement>)=>{

    const params = new URLSearchParams(searchParams);
    // console.log(params.get('name'))

    if(e.target.value){
          params.set('page', '1');
      params.set('query',e.target.value)    

    }else{
      params.delete('query')
    }
    
    console.log(params.toString())
      
    // router.push(`${pathName}?${params.toString()}`)
    router.replace(`${pathName}?${params.toString()}`)
  },1000)


  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e)=>handleSearch(e)}
        value={input}
      />
      {/* <p> actual value {input}</p>
      <p> debounced value {debouncedInput}</p> */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
