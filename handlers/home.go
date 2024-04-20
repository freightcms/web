package handlers

import (
	"net/http"
	"os"
	"path/filepath"
	"text/template"
)

func GetHome(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	// current directory
	model := struct {
		Title    string
		Author   string
		Keywords string
	}{
		Title: "Home Page",
	}
	dir, err := os.Getwd()
	if err != nil {
		WriteError(w, err)
		return
	}
	t, err := template.ParseFiles(
		filepath.Join(dir, "templates", "layout.html"),
		filepath.Join(dir, "templates", "navigation.html"),
		filepath.Join(dir, "templates", "home.html"),
		filepath.Join(dir, "templates", "styles.html"),
	)
	if err != nil {
		WriteError(w, err)
		return
	}
	if err := t.Execute(w, model); err != nil {
		WriteError(w, err)
		return
	}
}
