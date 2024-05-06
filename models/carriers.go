package models

type Insurance struct {
	ID             string // unique identifier for the insurance that belongs to the Insurance Information
	Type           string // Type of insurance, such as 'liability', 'cargo', 'workers comp', etc.
	EffectiveDate  string // Effective date time in UTC
	ExpirationDate string // Expiration date time in UTC
	ProviderName   string // Name of the insurance provider
	PolicyNumber   string // Policy number for the insurance
	AuditModel
}

type FreightCarrierModel struct {
	ID               string // unique identifier for the freight carrier that belongs to the carrier
	Name             string
	DBA              string
	PhysicalAddress  LocationModel    // PhysicalAddress is the physical location of the carrier
	MailingAddress   LocationModel    // MailingAddress is the mailing address of the carrier. This may differ from the physical address because of a roll-up business address which all mail is forwarded for items such as payments or invoices.
	PrimaryContact   ContactModel     // PrimaryContact is the primary contact for the carrier
	SecondaryContact *ContactModel    // SecondaryContact is the secondary contact for the carrier
	References       []ReferenceModel // collection of references that can be used by consumers to identify carrier information
	Insurance        []Insurance      // collection of insurance information for the carrier
	AuditModel
}
