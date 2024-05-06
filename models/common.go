package models

type TransportationMode string

var (
	Air           TransportationMode = "Air"
	Ocean         TransportationMode = "Ocean"
	Rail          TransportationMode = "Rail"
	Truck         TransportationMode = "Truck"
	Intermodal    TransportationMode = "Intermodal"
	Courier       TransportationMode = "Courier"
	Parcel        TransportationMode = "Parcel"
	BreakBulk     TransportationMode = "Break Bulk"
	Drayage       TransportationMode = "Drayage"
	RollOnRollOf  TransportationMode = "Roll On, Roll Off"
	LoadOnLoadOff TransportationMode = "Load On, Load Off"
	LastMile      TransportationMode = "Last Mile"
	Other         TransportationMode = "Other"
)

// ReferenceModel is a way for customers to directly reference a piece of data in the source system
// using their own identifiers. Each reference should have it's unique dataset belonging to each
// resource. For example there should be a location references data set, a carrier references data,
// commodity data set, etc.
type ReferenceModel struct {
	ID    string // Database generated ID that belongs to the source system
	Name  string // Name of the reference
	Value string // Value of the reference
}

// ContactModel with basic properties necessary to identify a person or entity
type ContactModel struct {
	ID           string  // unique identifier for the contact that belongs to the source system
	Name         string  // full Name of the contact
	EmailAddress string  // Contact email address
	FaxNumber    *string // Contact fax number. there are some cases where this would be required and others
	PhoneNumber  *string // Phone number of the contact. In some instances this may be required and other's may not. It is up to validators and context to decide when a consumer would want to require this information.
}
