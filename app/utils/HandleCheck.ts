export const HandleCheck= {
    checkOptionVehicle : async (service , name) =>{
        return await service.findByName(name);
       
    },
    checkBrandVehicle : async (service , options) =>{
        return await service.findByOptions(options);
       
    }
}