import {combineReducers, configureStore} from '@reduxjs/toolkit';
import PropertySlice from './Property/PropertySlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import TenantSlice from './Tenant/TenantSlice.js';
import LandlordSlice from '../redux/Landlord/LandlordSlice.js';
import GlobalSlice from '../redux/Global/GlobalSlice.js';

const rootReducer=combineReducers({
    Property:PropertySlice,
    Tenant:TenantSlice,
    Landlord:LandlordSlice,
    Global:GlobalSlice
})

const persistConfig={
    key:'root',
    storage,
    version:1,
    blacklist:['Property']
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})

export const persistor=persistStore(store);