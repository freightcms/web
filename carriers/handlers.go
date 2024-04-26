package carriers

import (
	"embed"
	"net/http"
	"text/template"

	"github.com/freightcms/web/common"
)

//go:embed templates/*.html
var templateFiles embed.FS

// Home is the handler for when a user hits the carrier home route.
func Carriers(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Load the template file
	t, err := template.ParseFS(templateFiles, "templates/(layout|navigation|styles|index).html")
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	model := CarrierHomeModel{
		PageViewModel: common.PageViewModel{
			Title: "Carriers",
		},
		TableViewMetadata: common.TableViewMetadata{
			Page:     1,
			Count:    10,
			NextLink: "/carriers?page=2",
			PrevLink: "",
		},
		TableViewModel: common.TableViewModel{
			Headers: map[string]string{
				"ID":                     "ID",
				"Name":                   "Name",
				"DBA":                    "DBA",
				"Identifying Code Count": "IdentifyingCodeCount",
				"ContactName":            "Contact Name",
				"ContactEmail":           "Contact Email",
				"ContactPhone":           "Contact Phone",
				"ContactFax":             "Contact Fax",
				"ContactMethod":          "Contact Method",
			},
			Data: []map[string]string{{
				"ID":                   "1",
				"Name":                 "FedEx",
				"DBA":                  "Federal Express",
				"IdentifyingCodeCount": "1",
				"ContactName":          "John Doe",
				"ContactEmail":         "noreply@freightcms.com",
				"ContactPhone":         "123-456-7890",
				"ContactFax":           "123-456-7890",
				"ContactMethod":        "Email",
			}},
		},
	}
	if err := t.Execute(w, model); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
