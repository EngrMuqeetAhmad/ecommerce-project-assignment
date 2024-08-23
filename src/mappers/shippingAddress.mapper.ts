import {
  ShippingAddressInput,
  ShippingAddressOutput,
} from '../types/shippingAddress.types';

export class ShippingAddressMapper {
  public static toShippingAddressDTOInput(model: any): ShippingAddressInput {
    return {
      userID: model.userID,
      addressLine1: model.addressLine1,
      addressLine2: model.addressLine2,
      region: model.region,
      city: model.city,
      country: model.country,
      postalCode: model.postalCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }
  public static toShippingAddressDTOOutput(model: any): ShippingAddressOutput {
    return {
      ID: model.ID,
      userID: model.userID,
      addressLine1: model.addressLine1,
      addressLine2: model.addressLine2,
      region: model.region,
      city: model.city,
      country: model.country,
      postalCode: model.postalCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    };
  }
}
