import ApiRequestManager from "../../services/apiRequest/ApiRequestManager.js";
import {PropertyEndPoints} from '../../services/apiRequest/EndPoints.js';
import { useEffect } from "react";
import Pagination from "../../components/functional/Pagination.jsx";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import PropertyCard from "../../components/ui/PropertyCard.jsx";

export default function SaveProperties() {

  const loaderData=useLoaderData();

  const[data,setData]=useState(loaderData);
  const[currentPage,setCurrentPage]=useState(1);

  const {getRequest}=ApiRequestManager();

  const handlePrev=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }

  const handleNext=()=>{
    if(currentPage<data.totalPages){
      setCurrentPage(currentPage+1);
    }
  }

  const getSavedProperty=async(page)=>{
    const response=await getRequest(PropertyEndPoints.GetSavedProperties(page))
    if(response){
      setData(response);
    }
  }

  useEffect(()=>{
    getSavedProperty(currentPage);
  },[currentPage])

  return (
    <section className="max-w-[1290px] mx-auto py-4">
      <section className="flex flex-col gap-6">
        <h1 className="text-3xl">
          Your Saved properties
        </h1>
        <section className="flex flex-col gap-4">
        <h2>
          Total Saved Properties:<span className="px-2">{data.totalProperties}</span>
        </h2>
        <section className="flex flex-wrap gap-10">
        {data?.savedProperties.map((property,index) => (
          <PropertyCard key={index} property={property} saved={true}/>
        ))}
      </section>
      </section>

      <section className="max-w-[300px] my-8 self-center">
        <Pagination currentPage={data.currentPage} totalPages={data.totalPages} handleNext={handleNext} handlePrev={handlePrev}/>
      </section>
      </section>
    </section>
  )
}
