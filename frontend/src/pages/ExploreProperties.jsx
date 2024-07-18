import Button from "../components/ui/Button";
import { LuSettings2 } from "react-icons/lu";
import { CiDollar } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { PiToiletLight } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import Properties from "./Properties";
import { useLoaderData } from "react-router-dom";
import ApiRequestManager from '../services/apiRequest/ApiRequestManager.js';
import {PropertyEndPoints} from '../services/apiRequest/EndPoints.js';
import { useEffect, useState } from "react";
import Pagination from "../components/functional/Pagination.jsx";
import GoogleMapsAutocomplete from "../components/functional/GoogleMapsAutocomplete.jsx";

export default function ExploreProperties() {

  const{getRequest}=ApiRequestManager();

  const loaderData=useLoaderData();

  const[data,setData]=useState(loaderData);
  const[currentPage,setCurrentPage]=useState(1);


  const getProperties=async(page)=>{
    const response=await getRequest(PropertyEndPoints.GetProperties(page));
    if(response){
      setData(response);
    }
  }

  useEffect(()=>{
      getProperties(currentPage);
  },[currentPage])

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

  return (
    <section className="max-w-[1290px] m-auto py-6 flex flex-col gap-8">
      <h1 className="text-3xl font-semibold">Search Properties for rent</h1>
      <section className="flex gap-4">
      <GoogleMapsAutocomplete/>
        <section className="flex gap-2">
          <Button variant={"white"} type="button">
           <section className="flex items-center gap-2">
              <LuSettings2/>
              Filters
            </section>
          </Button>
          <Button>Search</Button>
        </section>
      </section>
      <section className="flex justify-between items-center">
        <h2 className="text-gray w-1/2">
          Total Properties {data.totalProperties}
        </h2>
        <section className="flex gap-2">
          <Button variant={"white"}>
           <section className="flex items-center gap-2">
            <CiDollar/>
            Price
            </section>
          </Button>
          <Button variant={"white"}>
            <section className="flex items-center gap-2">
              <IoBedOutline/>
            BedRoom
            </section>
          </Button>
          <Button variant={"white"}>
            <section className="flex items-center gap-2">
              <PiToiletLight/>
            BathRoom
            </section>
          </Button>
          <Button variant={"white"}>
            <section className="flex items-center gap-2">
            Sort
              <IoMdArrowDropdown/>
            </section>
          </Button>
        </section>
      </section>
      <Properties property={data}/>
      <section className="max-w-[300px] my-6 self-center">
        <Pagination currentPage={data.currentPage} totalPages={data.totalPages} handleNext={handleNext} handlePrev={handlePrev}/>
      </section>
    </section>
  );
}
