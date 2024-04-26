package models

import "github.com/freightcms/web/common"

type CarrierViewModel struct {
	ID                   string // unique identifier for the carrier
	Url                  string // href linking to the carrier details page
	Name                 string // name of the carrier
	DBA                  string // doing business as name of the carrier
	IdentifyingCodeCount int    // number of identifying codes
	ContactName          string // name of the contact person
	ContactEmail         string // email of the contact person
	ContactPhone         string // phone number of the contact person
	ContactFax           string // fax number of the contact person
	ContactMethod        string // preferred contact method
}

type CarrierHomeModel struct {
	common.PageViewModel
	common.TableViewMetadata
	common.TableViewModel
}

type ContactViewModel struct {
	FirstName string
	LastName  string
	Email     string
	Phone     string
	Fax       string
}

type CarrierCreateViewModel struct {
	common.PageViewModel
	Name             string
	DBA              string
	PrimaryContact   ContactViewModel
	SecondaryContact ContactViewModel
}
