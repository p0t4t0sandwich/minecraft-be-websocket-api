package middleware

import (
	"bufio"
	"errors"
	"log"
	"net"
	"net/http"
	"strings"
	"time"
)

// WrappedWriter - Wrapper for http.ResponseWriter
type WrappedWriter struct {
	http.ResponseWriter
	statusCode int
}

// WriteHeader - Write the header
func (w *WrappedWriter) WriteHeader(statusCode int) {
	w.ResponseWriter.WriteHeader(statusCode)
	w.statusCode = statusCode
}

// Hijack - Impl for the Hijack method
func (w *WrappedWriter) Hijack() (net.Conn, *bufio.ReadWriter, error) {
	h, ok := w.ResponseWriter.(http.Hijacker)
	if !ok {
		return nil, nil, errors.New("hijack not supported")
	}
	return h.Hijack()
}

// Middleware - Middleware type
type Middleware func(http.Handler) http.Handler

// CreateStack - Create a stack of middlewares
func CreateStack(middlewares ...Middleware) Middleware {
	return func(next http.Handler) http.Handler {
		for i := len(middlewares) - 1; i >= 0; i-- {
			next = middlewares[i](next)
		}
		return next
	}
}

// RequestLoggerMiddleware - Log all requests
func RequestLoggerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		wrapped := &WrappedWriter{w, http.StatusOK}
		next.ServeHTTP(wrapped, r)

		if strings.Contains(r.URL.Path, "playerlist") ||
			strings.Contains(r.URL.Path, "entitylist") ||
			strings.Contains(r.URL.Path, "eventlog") ||
			strings.Contains(r.URL.Path, "itemlist") ||
			strings.Contains(r.URL.Path, "playerlist") ||
			strings.Contains(r.URL.Path, "itemlist") {
			return
		}

		cfConnectingIP := r.Header.Get("CF-Connecting-IP")
		forwardedFor := r.Header.Get("X-Forwarded-For")
		if cfConnectingIP != "" {
			r.RemoteAddr = cfConnectingIP
		} else if forwardedFor != "" {
			r.RemoteAddr = forwardedFor
		}

		log.Printf("%s %d %s %s %s", r.RemoteAddr, wrapped.statusCode, r.Method, r.URL.Path, time.Since(start))
	})
}
