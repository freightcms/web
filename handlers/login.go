package handlers

import (
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"text/template"

	"github.com/freightcms/web/common"
)

type loginModel struct {
	Email    string            // Email is required
	Password string            // Password is not stored in the database
	Errors   map[string]string // map of field name to error message
	Title    string            // Title of the page
}

func (m *loginModel) Validate() {
	if m.Email == "" {
		m.Errors["Email"] = "Email is required"
	} else if !m.isValidEmail(m.Email) {
		m.Errors["Email"] = "Email is invalid"
	} else {
		delete(m.Errors, "Email")
	}
	if m.Password == "" {
		m.Errors["Password"] = "Password is required"
	} else if !m.isValidPassword(m.Password) {
		m.Errors["Password"] = "Password is invalid"
	} else {
		delete(m.Errors, "Password")
	}
}

// isValid returns true if the model is valid
func (m *loginModel) isValid() bool {
	m.Validate()
	m.Errors["Email"] = "Email is invalid"
	return len(m.Errors) == 0
}

func GetLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	dir, err := os.Getwd()
	if err != nil {
		common.WriteError(w, err)
		return
	}

	t := template.Must(template.ParseFiles(
		filepath.Join(dir, "templates/layout.html"),
		filepath.Join(dir, "templates/navigation.html"),
		filepath.Join(dir, "templates/login.html"),
		filepath.Join(dir, "templates", "styles.html")))

	model := struct {
		Email    string
		Errors   map[string]string
		Password string
		Title    string
	}{
		Title:    "Login",
		Email:    "",
		Errors:   map[string]string{},
		Password: "",
	}
	if err := t.Execute(w, model); err != nil {
		common.WriteError(w, err)
		return
	}
}

func (m *loginModel) isValidEmail(email string) bool {
	return regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`).MatchString(email)
}

func (m *loginModel) isValidPassword(password string) bool {
	return regexp.MustCompile(`^.{8,}$`).MatchString(password)
}

func bind(r *http.Request) (*loginModel, error) {
	if err := r.ParseForm(); err != nil {
		return nil, err
	}

	m := loginModel{
		Title:    "Login",
		Email:    r.PostFormValue("email"),
		Password: r.PostFormValue("password"),
		Errors:   map[string]string{},
	}

	return &m, nil
}

// PostLogin handles the login form submission
func PostLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	dir, err := os.Getwd()
	if err != nil {
		common.WriteError(w, err)
		return
	}

	t := template.Must(template.ParseFiles(
		filepath.Join(dir, "templates/layout.html"),
		filepath.Join(dir, "templates/navigation.html"),
		filepath.Join(dir, "templates/login.html"),
		filepath.Join(dir, "templates", "styles.html")))

	model, err := bind(r)
	if err != nil {
		common.WriteError(w, err)
		return
	}
	if !model.isValid() {
		model.Password = "" // because we don't want to show the password in the form
		if err := t.Execute(w, model); err != nil {
			common.WriteError(w, err)
			return
		}
		return
	}
	w.Write([]byte("Login successful"))
	w.WriteHeader(http.StatusOK)
	w.Header().Add("Content-Type", "text/plain")
}
