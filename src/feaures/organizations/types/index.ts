export type AddressModel = Partial<{
  id: string | null;
  line1: string | null;
  line2: string | null;
  line3: string | null;
  locale: string | null;
  region: string | null;
  postalCode: string | null;
  country: string | null;
  description: string | null;
  attention: string | null;
  type: string | null;
  notes: string | null;
}>;

export type OrganizationModel = Partial<{
  id: string | null;
  dba: string | null;
  name: string | null;
  rollupId: string | null;
  mailingAddress: AddressModel | null;
  billingAddress: AddressModel | null;
}>;
