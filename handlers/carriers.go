package handlers

import (
	"html/template"
	"net/http"
)

type CarrierRouter interface {
	GetCarriers(w http.ResponseWriter, r *http.Request)
	DeleteCarrier(w http.ResponseWriter, r *http.Request)
	PostCarrier(w http.ResponseWriter, r *http.Request)
	PutCarrier(w http.ResponseWriter, r *http.Request)
}

type carrierRouter struct {
	templates *template.Template
}

func CreateRouter(t *template.Template) CarrierRouter {
	return &carrierRouter{t}
}

func (c *carrierRouter) GetCarriers(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Get Carriers"))
}

func (c *carrierRouter) DeleteCarrier(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Delete Carrier"))
}

func (c *carrierRouter) PostCarrier(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Post Carrier"))
}

func (c *carrierRouter) PutCarrier(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Put Carrier"))
}
