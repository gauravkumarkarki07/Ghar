import { ErrorHandler } from "../middlewares/ErrorHandler.js";
import PropertyModel from "../models/PropertyModel.js";
import TenantModel from "../models/TenantModel.js";
import LandlordModel from "../models/LandlordModel.js";

// Get Property List with pagination
export const GetAllProperties = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const count = await PropertyModel.countDocuments();
    const totalPages = Math.ceil(count / limit);

    // To make Page number is in valid range
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch the properties
    const properties = await PropertyModel.find()
      .populate("landlord", "firstname lastname email profilePicture")
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      properties,
      totalProperties: count,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    next(error);
  }
};


//Get Property By Id
export const GetPropertyById = async (req, res, next) => {
  const { propertyId } = req.params;
  try {
    const propertyById = await PropertyModel.findById(propertyId);
    if (!propertyById) {
      next(ErrorHandler(400, "Property Not Found"));
    }
    res.status(200).json({
      propertyById,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateProperty = async (req, res, next) => {
  const {
    title,
    description,
    address,
    propertyType,
    rentType,
    geoLocation,
    houseRules,
    facilities,
    propertyImage,
    bedRooms,
    bathRooms,
    price
  } = req.body;

  try {
    // Validate landlord existence
    const validLandlord = await LandlordModel.findById(req.token.id);
    if (!validLandlord) {
      return next(ErrorHandler(404, "Login as valid landlord"));
    }

    // Create new property
    const newProperty = await PropertyModel.create({
      title,
      description,
      address,
      propertyType,
      rentType,
      geoLocation,
      houseRules,
      facilities,
      propertyImage,
      bedRooms,
      bathRooms,
      price,
      landlord: req.token.id,
    });

    // Add property ID to landlord's properties array
    validLandlord.properties.push(newProperty._id);
    await validLandlord.save();

    res.status(201).json({
      message: "Property Listed Successfully",
    });
  } catch (error) {
    next(error);
  }
};

//Update Property
export const UpdateProperty = async (req, res, next) => {
  const { propertyId } = req.params;
  const updatedField = req.body;
  try {
    const validProperty = await PropertyModel.findById(propertyId);
    if (!validProperty) {
      return next(ErrorHandler(400, "Property not found"));
    }

    if (!String(validProperty.landlord)== req.token.id) {
      return next(ErrorHandler(404, "You are not allowed to update this"));
    }

    const updatedProperty = await PropertyModel.findByIdAndUpdate(
      propertyId,
      updatedField,
      { new: true, runValidators: true }
    );
    if (!updatedProperty) {
      return next(ErrorHandler(400, "Cannot Update Property Details"));
    }

    res.status(200).json({
      message: "Property Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

//Delete Property
export const DeleteProperty = async (req, res, next) => {
  const { propertyId } = req.params;
  try {
    const validProperty = await PropertyModel.findById(propertyId);
    if (!validProperty) {
      return next(ErrorHandler(400, "Property not found"));
    }

    if (String(validProperty.landlord) !== req.token.id) {
      return next(ErrorHandler(404, "You are not allowed to delete this"));
    }

    await PropertyModel.findByIdAndDelete(propertyId);
    res.status(200).json({
      message: "Property Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

//Save and Unsave Property
export const SaveProperty = async (req, res, next) => {
  const { propertyId } = req.params;
  try {
    const validTenant = await TenantModel.findById(req.token.id);
    if (!validTenant) {
      return next(ErrorHandler(404, "Please Login as Valid Tenant"));
    }
    const validProperty = await PropertyModel.findById(propertyId);
    if (!validProperty) {
      return next(ErrorHandler(400, "Property doesnt exists"));
    }
    const propertyIndex = validTenant.savedProperties.indexOf(propertyId);
    if (propertyIndex === -1) {
      validTenant.savedProperties.push(propertyId);
    } else {
      validTenant.savedProperties.splice(propertyIndex, 1);
    }
    await validTenant.save();
    const message =
      propertyIndex === -1 ? "Property Saved" : "Property UnSaved";
    res.status(200).json({
      message: message,
    });
  } catch (error) {
    next(error);
  }
};

// Get Saved Property with Pagination
export const GetSavedProperties = async (req, res, next) => {
  try {
    const validTenant = await TenantModel.findById(req.token.id);
    if (!validTenant) {
      return next(ErrorHandler(404, "Login as valid tenant"));
    }

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const Properties = await Promise.all(
      validTenant.savedProperties.map(async (propertyId) => {
        const property = await PropertyModel.findById(propertyId).populate(
          "landlord",
          "firstname lastname email profilePicture"
        );
        return property;
      })
    );

    // Filters out null or undefined properties
    const savedProperties = Properties.filter((property) => property);

    // Update tenant's savedProperties to remove invalid entries
    const validPropertyIds = savedProperties.map((property) =>
      property._id.toString()
    );
    const invalidPropertyIds = validTenant.savedProperties.filter(
      (propertyId) => !validPropertyIds.includes(propertyId.toString())
    );

    // Remove invalid property IDs from tenant's savedProperties array
    if (invalidPropertyIds.length > 0) {
      validTenant.savedProperties = validTenant.savedProperties.filter(
        (propertyId) => !invalidPropertyIds.includes(propertyId)
      );
      await validTenant.save(); // Save tenant document with updated savedProperties array
    }

    // Apply pagination to the savedProperties array
    const paginatedProperties = savedProperties.slice(skip, skip + limit);

    res.status(200).json({
      savedProperties: paginatedProperties,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(savedProperties.length / limit),
      totalProperties: savedProperties.length
    });
  } catch (error) {
    next(error);
  }
};

//Get Landlord Property
export const GetLandlordProperty = async (req, res, next) => {
  try {
    const validLandlord = await LandlordModel.findById(req.token.id);
    const{page=1,limit=10}=req.params;
    const skip=(page-1)*limit;

    if (!validLandlord) {
      return next(ErrorHandler(404, "Login as valid landlord"));
    }
    const Properties = await Promise.all(
      validLandlord.properties.map(async (propertyId) => {
        const property = await PropertyModel.findById(propertyId).populate(
          "landlord",
          "firstname lastname email"
        );
        return property;
      })
    );

    //Filters out null or undefined properties
    const createdProperties = Properties.filter((property) => property);

    // Identify invalid property IDs (not found in fetched properties)
    const validPropertyIds = createdProperties.map((property) =>
      property._id.toString()
    );
    const invalidPropertyIds = validLandlord.properties.filter(
      (propertyId) => !validPropertyIds.includes(propertyId.toString())
    );

    // Remove invalid property IDs from landlord's properties array
    if (invalidPropertyIds.length > 0) {
      validLandlord.properties = validLandlord.properties.filter(
        (propertyId) => !invalidPropertyIds.includes(propertyId)
      );
      await validLandlord.save();
    }

    const paginatedProperties=createdProperties.slice(skip,skip+limit);

    res.status(200).json({
      listedProperties:paginatedProperties,
      currentPage: parseInt(page, 10),
      totalPages: Math.ceil(createdProperties.length / limit),
      totalProperties: createdProperties.length
    });
  } catch (error) {
    next(error);
  }
};