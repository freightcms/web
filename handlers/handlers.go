package handlers

import (
	"html/template"
	"net/http"
	"os"
	"path/filepath"
)

type Router interface {
	// GetHome handler executes the necessary templates to render the home page.
	GetHome(w http.ResponseWriter, r *http.Request)
	GetAbout(w http.ResponseWriter, r *http.Request)
	GetContact(w http.ResponseWriter, r *http.Request)
	GetNotFound(w http.ResponseWriter, r *http.Request)
	// ServerError is a helper function that returns a 500 status code with the error message.
	ServerError(w http.ResponseWriter, err error)
}

type router struct {
	templates *template.Template
}

// NewRouter creates a new router struct with the provided templates that can be parsed
// and rendered by the router.
func NewRouter(
	templates *template.Template,
) Router {
	return &router{
		templates,
	}
}

func (router *router) ServerError(w http.ResponseWriter, err error) {
	http.Error(w, err.Error(), http.StatusInternalServerError)
}

// GetNotFound uses the templates from the router struct and clones them to create a new set and combines them with the notfound.html template to render the 404 page.
// If at any time the template parsing fails, the ServerError method is called to return a 500 status code.
func (router *router) GetNotFound(w http.ResponseWriter, r *http.Request) {
	templateCop, err := router.templates.Clone()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	currDir, err := os.Getwd()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	updatedTemplates, err := templateCop.ParseFiles(
		filepath.Join(currDir, "templates/pages/404.html"),
	)
	if err != nil {
		router.ServerError(w, err)
		return
	}
	if err = updatedTemplates.ExecuteTemplate(w, "content", nil); err != nil {
		router.ServerError(w, err)
		return
	}
}

// GetAbout uses the templates from the router struct and clones them to create a new set and combines them with the about.html template to render the about page.
// If at any time the template parsing fails, the ServerError method is called to return a 500 status code.
func (router *router) GetAbout(w http.ResponseWriter, r *http.Request) {
	templateCop, err := router.templates.Clone()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	currDir, err := os.Getwd()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	updatedTemplates, err := templateCop.ParseFiles(
		filepath.Join(currDir, "templates/pages/about.html"),
	)
	if err != nil {
		router.ServerError(w, err)
		return
	}
	if err = updatedTemplates.ExecuteTemplate(w, "content", nil); err != nil {
		router.ServerError(w, err)
		return
	}
}

// GetContact uses the templates from the router struct and clones them to create a new set and combines them with the contact.html template to render the contact page.
// If at any time the template parsing fails, the ServerError method is called to return a 500 status code.
func (router *router) GetContact(w http.ResponseWriter, r *http.Request) {
	templateCop, err := router.templates.Clone()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	currDir, err := os.Getwd()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	updatedTemplates, err := templateCop.ParseFiles(
		filepath.Join(currDir, "templates/pages/contact.html"),
	)
	if err != nil {
		router.ServerError(w, err)
		return
	}
	if err = updatedTemplates.ExecuteTemplate(w, "content", nil); err != nil {
		router.ServerError(w, err)
		return
	}
}

// GetHome uses the templates from the router struct and clones them to create a new set and combines them with the home.html template to render the home page.
// If at any time the template parsing fails, the ServerError method is called to return a 500 status code.
func (router *router) GetHome(w http.ResponseWriter, r *http.Request) {
	templateCop, err := router.templates.Clone()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	currDir, err := os.Getwd()
	if err != nil {
		router.ServerError(w, err)
		return
	}
	updatedTemplates, err := templateCop.ParseFiles(
		filepath.Join(currDir, "templates/pages/home.html"),
	)
	if err != nil {
		router.ServerError(w, err)
		return
	}

	if err := updatedTemplates.ExecuteTemplate(w, "content", nil); err != nil {
		router.ServerError(w, err)
		return
	}
}
