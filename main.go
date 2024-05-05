package main

import (
	"html/template"
	"net/http"
	"os"
	"path/filepath"

	"github.com/freightcms/web/handlers"
)

func main() {
	dir, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	srvr := http.NewServeMux()

	t, err := template.ParseFiles(
		filepath.Join(dir, "./templates/layouts/default.html"),
	)
	router := handlers.NewRouter(t)

	srvr.HandleFunc("/", router.GetHome)
	srvr.HandleFunc("/about", router.GetAbout)
	srvr.HandleFunc("/contact", router.GetContact)
	srvr.HandleFunc("/404", router.GetNotFound)

	http.ListenAndServe(":8080", srvr)
}
