import { useEffect, useState } from "react";
import Pagination from "../../components/functional/Pagination";
import ApiRequestManager from "../../services/apiRequest/ApiRequestManager.js";
import {PropertyEndPoints} from '../../services/apiRequest/EndPoints.js';
import { useLoaderData } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import { useNavigate } from "react-router-dom";
import PropertyCardLandlord from "../../components/ui/PropertyCardLandlord.jsx";

export default function MyProperties() {
    const navigate=useNavigate();

    const{getRequest}=ApiRequestManager();

    const loaderData=useLoaderData();
    const[data,setData]=useState(loaderData);
    const[currentPage,setCurrentPage]=useState(1);

    const getListedProperty=async(page)=>{
        const response=await getRequest(PropertyEndPoints.GetListedProperties(page));
        if(response){
            setData(response);
        }
    }
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

      useEffect(()=>{
        getListedProperty(currentPage);
      },[currentPage])

      const navigateNewProperty=()=>{
        navigate('/landlord/listnewproperty')
      }

  return (
    <section className="max-w-[1290px] mx-auto">
        <section className="flex flex-col gap-6 my-6">
            <section className="flex items-center justify-between">

            <h1 className="text-3xl">
                Listed Properties
            </h1>
            <section className="w-[200px]">
            <Button type="button" onClick={navigateNewProperty}>
                List New Property
            </Button>
            </section>
            </section>
        <section className="flex flex-col gap-4">
        <h2 className="text-gray">
          Total Listed Properties:<span className="px-2">{data.totalProperties}</span>
        </h2>
        <section className="flex flex-wrap gap-10">
        {data?.listedProperties.map((property,index) => (
          <PropertyCardLandlord key={index} property={property} saved={true}/>
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
