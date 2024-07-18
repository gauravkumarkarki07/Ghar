const BASE_URL="http://localhost:3000/ghar";

const PropertyEndPoints={
    GetProperties:(page)=>`${BASE_URL}/property/properties?page=${page}&limit=10`,
    SavePropertyToggle:(propertyId)=>`${BASE_URL}/property/saveproperty/${propertyId}`,
    GetSavedProperties:(page)=>`${BASE_URL}/property/savedproperties?page=${page}&limit=10`,
    GetListedProperties:(page)=>`${BASE_URL}/property/listedproperties?page=${page}&limit=10`,

    ListNewProperty:`${BASE_URL}/property/listnewproperty`,
    UpdatePropertyDetails:(propertyId)=>`${BASE_URL}/property/updateproperty/${propertyId}`,
    DeleteProperty:(propertyId)=>`${BASE_URL}/property/deleteproperty/${propertyId}`
}

const AuthEndPoints={
    LoginTenant:`${BASE_URL}/auth/logintenant`,
    GoogleSignIn:`${BASE_URL}/auth/googlesignin`,
    GoogleSignInLandlord:`${BASE_URL}/auth/googlesigninlandlord`,
    LoginLandlord:`${BASE_URL}/auth/loginlandlord`,
    RegisterTenant:`${BASE_URL}/auth/registertenant`,
    RegisterLandlord:`${BASE_URL}/auth/registerlandlord`,
    Logout:`${BASE_URL}/auth/logout`,

}

const TenantEndPoints={
    UpdateProfile:`${BASE_URL}/tenant/updateprofiledetails`,
    ChangePassword:`${BASE_URL}/tenant/changepassword`
}

const LandlordEndPoints={
    UpdateProfile:`${BASE_URL}/landlord/updateprofiledetails`,
    ChangePassword:`${BASE_URL}/landlord/changepassword`
}


export {PropertyEndPoints,AuthEndPoints,TenantEndPoints,LandlordEndPoints};