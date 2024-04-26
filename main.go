package main

import (
	"net/http"

	"github.com/freightcms/web/carriers"
)

func main() {
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			GetLogin(w, r)
		case "POST":
			PostLogin(w, r)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			w.Write([]byte("Method not allowed"))
		}
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		GetHome(w, r)
	})
	http.HandleFunc("/carriers", carriers.Carriers)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
