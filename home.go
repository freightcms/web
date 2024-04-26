package main

import (
	"net/http"
	"os"
	"path/filepath"
	"text/template"

	"github.com/freightcms/web/common"
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
		common.WriteError(w, err)
		return
	}
	t, err := template.ParseFiles(
		filepath.Join(dir, "templates", "layout.html"),
		filepath.Join(dir, "templates", "navigation.html"),
		filepath.Join(dir, "templates", "index.html"),
		filepath.Join(dir, "templates", "styles.html"),
	)
	if err != nil {
		common.WriteError(w, err)
		return
	}
	if err := t.Execute(w, model); err != nil {
		common.WriteError(w, err)
		return
	}
}
