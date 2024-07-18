import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../components/functional/Layout.jsx";
import Home from "../pages/Home.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import ExploreProperties from "../pages/ExploreProperties.jsx";
import Loaders from "../services/utils/loader.js";
import PropertyDetails from "../pages/PropertyDetails.jsx";
import LoginTenant from "../pages/Tenant/LoginTenant.jsx";
import RegisterTenant from "../pages/Tenant/RegisterTenant.jsx";
import TenantAuthenticated from "../components/functional/TenantAuthenticated.jsx";
import TenantMessage from "../pages/Tenant/TenantMessage.jsx";
import SaveProperties from "../pages/Tenant/SavedProperties.jsx";
import Account from "../pages/Tenant/Account.jsx";
import TenantProfile from "../pages/Tenant/TenantProfile.jsx";
import TenantPassword from "../pages/Tenant/TenantPassword.jsx";
import LoginLandlord from "../pages/Landlord/LoginLandlord.jsx";
import RegisterLandlord from "../pages/Landlord/RegisterLandlord.jsx";
import LandlordAuthenticated from '../components/functional/LandlordAuthenticated.jsx';
import Dashboard from "../pages/Landlord/Dashboard.jsx";
import LandlordAccount from '../pages/Landlord/Account.jsx';
import LandlordProfile from '../pages/Landlord/LandlordProfile.jsx';
import LandlordPassword from '../pages/Landlord/LandlordPassword.jsx';
import MyProperties from "../pages/Landlord/MyProperties.jsx";
import ListNewProperty from "../pages/Landlord/ListNewProperty.jsx";
import PropertyDetailsLandlord from '../pages/Landlord/PropertyDetailsLandlord.jsx';

const { GetPropertiesLoader,GetSavedProperties,GetListedProperties } = Loaders();

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to={'/home'} replace/>,
      },
      {
        path: "/home",
        element: <Home />,
        index: true,
      },
      {
        path: "/#aboutus",
        element: <AboutUs />,
      },
      {
        path: "/properties",
        element: <ExploreProperties />,
        loader: GetPropertiesLoader
      },
      {
        path: "tenant",
        element: <TenantAuthenticated/>,
        children:[
          {
            path: "",
            element: <Navigate to={'properties'} replace/>,
          },
          {
            path: "propertydetails/:propertyId",
            element: <PropertyDetails />,
          },
          {
            path: "properties",
            element: <ExploreProperties />,
            loader: GetPropertiesLoader,
            index:true
          },
          {
            path: "messages",
            element: <TenantMessage/>,
          },
          {
            path: "savedproperties",
            element: <SaveProperties/>,
            loader:GetSavedProperties
          },
          {
            path: "account",
            element: <Account/>,
          },
          {
            path: "account/profilesettings",
            element: <TenantProfile/>,
          },
          {
            path: "account/passwordsettings",
            element: <TenantPassword/>,
          },
        ]
      },
      {
        path:"landlord",
        element:<LandlordAuthenticated/>,
        children:[
          {
            path:'',
            element:<Navigate to={'dashboard'} replace/>
          },
          {
            path:'dashboard',
            element:<Dashboard/>
          },
          {
            path:'account',
            element:<LandlordAccount/>
          },
          {
            path:'account/profilesettings',
            element:<LandlordProfile/>
          },
          {
            path:'account/passwordsettings',
            element:<LandlordPassword/>
          },
          {
            path:'myproperties',
            element:<MyProperties/>,
            loader:GetListedProperties
          },
          {
            path:'propertydetails/:propertyId',
            element:<PropertyDetailsLandlord/>,
          },
          {
            path:'listnewproperty',
            element:<ListNewProperty/>,
          },
        ]
      }
    ],
  },
  {
    path: "logintenant",
    element: <LoginTenant />,
  },
  {
    path: "registertenant",
    element: <RegisterTenant/>,
  },
  {
    path: "loginlandlord",
    element: <LoginLandlord/>,
  },
  {
    path: "registerlandlord",
    element: <RegisterLandlord/>,
  },
]);

export default router;
