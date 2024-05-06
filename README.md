# FreightCMS Web

Web application hosted at https://www.freightcms.com/

## TODO

- [ ] Create base layout, styles, header, footer, for project
- [ ] Document in README about what this project is
- [ ] Load environment variables using goenv

### Support Freight Carriers

- [ ] Support Creating a Freight Carrier
   - [x] Support Carrier Location Information
   - [x] Support Contact Information
   - [ ] Support General fields, Name, DBA, Created At, Updated At, Created By, Updated By
   - [ ] Support Compliance
      - [ ] Support Insurance Information
      - [ ] Support Safety Information
      - [ ] Support uploading proof of insurance
   - [ ] Support Identifying Codes
   - [ ] Support deactivation carriers
- [ ] Support Deleting a Freight Carrier
   - [ ] Support deleting a carrier but keeping it with a shipment
- [ ] Support Updating an existing Freight Carrier
   - [ ] Support Async Updating for Compliance, i.e. insurance and safety (FMCSA and RMIS)
   - [ ] Support updating primary fields, i.e. name, dba
- [ ] Support Getting an existing Freight Carrier
   - [ ] Support Getting carrier by query field such as name or ID
- [ ] Support Pagination for Carriers
  - [ ] Support searching for carriers by field
  - [ ] Support paging through carriers that are
  - [ ] Support filtering carriers by fields
- [ ] Address/Location Support
  - [x] Create a common address/location model that can be used for pickups, stops, companies, carriers, warehouses, ports, etc.