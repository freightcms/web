package main

import (
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/freightcms/web/handlers"
)

func main() {
	currDir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	t, err := template.ParseFiles(
		filepath.Join(currDir, "templates/pages/about.html"),
	)
	srvr := http.NewServeMux()

	router := handlers.NewRouter(t)

	srvr.HandleFunc("/about", router.GetAbout)
	srvr.HandleFunc("/contact", router.GetContact)
	srvr.HandleFunc("/", router.GetHome)

	http.ListenAndServe(":8080", srvr)
}
