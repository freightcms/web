package handlers

import (
	"net/http"
	"os"
	"path/filepath"
	"text/template"
)

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
	PageViewModel
	TableViewMetadata
	TableViewModel
}

// Home is the handler for when a user hits the carrier home route.
func Carriers(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	dir, err := os.Getwd()
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	// Load the template file
	t, err := template.ParseFiles(
		filepath.Join(dir, "templates/styles.html"),
		filepath.Join(dir, "templates/navigation.html"),
		filepath.Join(dir, "templates/layout.html"),
		filepath.Join(dir, "templates/carriers", "index.html"))
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	model := CarrierHomeModel{
		PageViewModel: PageViewModel{
			Title: "Carriers",
		},
		TableViewMetadata: TableViewMetadata{
			Page:     1,
			Count:    10,
			NextLink: "/carriers?page=2",
			PrevLink: "",
		},
		TableViewModel: TableViewModel{
			Headers: []string{
				"ID",
				"Name",
				"DBA",
				"Identifying Code Count",
				"Contact Name",
				"Contact Email",
				"Contact Phone",
				"Contact Fax",
				"Contact Method",
			},
			Data: []map[string]string{}, // empty for now
		},
	}
	if err := t.Execute(w, &model); err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}