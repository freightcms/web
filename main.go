package main

import (
	"net/http"

	"github.com/freightcms/web/handlers"
)

func main() {
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			handlers.GetLogin(w, r)
		case "POST":
			handlers.PostLogin(w, r)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
			w.Write([]byte("Method not allowed"))
		}
	})
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		handlers.GetHome(w, r)
	})
	http.HandleFunc("/carriers", handlers.Carriers)
	http.HandleFunc("/carriers/create", handlers.CarriersCreate)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
