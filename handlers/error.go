package handlers

import "net/http"

func WriteError(w http.ResponseWriter, err error) {
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte(err.Error()))
	w.Header().Add("Content-Type", "text/plain")
}
