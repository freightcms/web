package handlers

import (
	"net/http"
	"os"
	"path/filepath"
	"text/template"

	"github.com/freightcms/web/common"
	"github.com/freightcms/web/models"
)

var rootTemplate *template.Template

func init() {
	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	rootTemplate, err = template.ParseFiles(
		filepath.Join(dir, "templates", "layout.html"),
		filepath.Join(dir, "templates", "navigation.html"),
		filepath.Join(dir, "templates", "styles.html"))
	if err != nil {
		panic(err)
	}
}

func renderTemplate(w http.ResponseWriter, model interface{}, templateFiles ...string) error {
	tmpl, err := rootTemplate.Clone()
	if err != nil {
		return err
	}
	// Load the template file
	t, err := tmpl.ParseFiles(templateFiles...)
	if err != nil {
		return err
	}
	if err := t.Execute(w, model); err != nil {
		return err
	}
	return nil
}

func parseCreateForm(r *http.Request) (models.CarrierCreateViewModel, error) {
	if err := r.ParseForm(); err != nil {
		return models.CarrierCreateViewModel{}, err
	}
	return models.CarrierCreateViewModel{
		Name: r.Form.Get("name"),
		DBA:  r.Form.Get("dba"),
		PrimaryContact: models.ContactViewModel{
			FirstName: r.Form.Get("primaryContactFirstName"),
			LastName:  r.Form.Get("primaryContactLastName"),
			Email:     r.Form.Get("primaryContactEmail"),
			Phone:     r.Form.Get("primaryContactPhone"),
			Fax:       r.Form.Get("primaryContactFax"),
		},
		SecondaryContact: models.ContactViewModel{
			FirstName: r.Form.Get("secondaryContactFirstName"),
			LastName:  r.Form.Get("secondaryContactLastName"),
			Email:     r.Form.Get("secondaryContactEmail"),
			Phone:     r.Form.Get("secondaryContactPhone"),
			Fax:       r.Form.Get("secondaryContactFax"),
		},
	}, nil
}

// Carriers loads the initial carrier list template to show all carriers
func Carriers(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		model := models.CarrierHomeModel{
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

		if err := renderTemplate(w, model,
			filepath.Join("templates", "carriers", "list.html")); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		return
	}

	if r.Method == "POST" {
		model, err := parseCreateForm(r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		if err := renderTemplate(w, model, filepath.Join("templates", "carriers", "create.html")); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	if r.Method == "OPTIONS" {
		w.Header().Add("Allow", "GET, POST")
		w.Header().Add("Content-Type", "text/plain")
		w.WriteHeader(http.StatusOK)
		return
	}
}

// CarriersCreate function will render a default empty form for users to populate and fill out. If the HTTP method is POST, the form will be parsed and re-rendered with the user's input.
// If the HTTP method is OPTIONS, the allowed methods will be returned in the header.
func CarriersCreate(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		if err := renderTemplate(w, models.CarrierCreateViewModel{}, filepath.Join("templates", "carriers", "create.html")); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusMethodNotAllowed)
	w.Write([]byte("Method not allowed"))
	w.Header().Add("Allow", "GET, POST")
	w.Header().Add("Content-Type", "text/plain")
}
