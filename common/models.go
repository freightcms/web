package common

type PageViewModel struct {
	Title string
}

type TableViewModel struct {
	Headers map[string]string   // column headers to display in table
	Data    []map[string]string // key is the column key and value is he access property
}

type TableViewMetadata struct {
	Page     int
	Count    int
	NextLink string
	PrevLink string
}
