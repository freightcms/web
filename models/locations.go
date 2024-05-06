package models

// LocationModel represents a physical location on the planet
type LocationModel struct {
	ID           string  // unique identifier for the location that belongs to the source system
	Name         *string // A way to identify the location
	Line1        string  // typically the street address including block or house number
	Line2        *string // typically the street address including a suite or apartment number
	Line3        *string // typically the street address including a floor or building number
	Region       string  // state or province
	Local        string  // city or town
	PostalCode   string  // postal code or zip code
	Country      string  // Three Letter ISO Country Code
	Latitude     float64
	Longitude    float64
	LocationType string           // Type of location, such as 'warehouse', 'store', 'office', 'residential', 'school', 'business', 'convention center', etc.
	RollupID     *string          // ID of the roll-up location. This is used to identify a parent location that may be a roll-up of multiple locations. For example, a corporate office that receives mail for multiple locations.
	References   []ReferenceModel // collection of references that can be used by consumers to identify location information
	AuditModel
}
