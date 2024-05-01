# Web

## Templates

### Summary

Collection of full web pages or partial sections of pages that can be parsed and rendered individually in the project as necessary.

### Usage

```go
package main

import (
    "text/templates"
    "filepath"
    "os"
)

func main() {
    currDir, err := os.Getwd()
    if err != nil {
        panic(err) // we couldn't make a sys call to find the working directory
    }
    // because you may have overlapping names for blocks or "define"s you may want to only
    // parse just the necessary templates such as scripts, styles, navigation, headers, footers, and layouts
    t, err := templates.ParseFiles(
        filepath.Join(dir, "templates", "template1.html"), // {{ define "template1" }}Some Text Context{{ end }}
        filepath.Join(dir, "templates", "template2.html"), // {{ define "template 2" }} {{ template "template1" . }} I rendered another template {{ end }}
    )
    if err != nil {
        panic(err)
    }
    if err = t.Execute(os.Stdout, "template2" nil); err != nil {
        panic(err)
    }
}
```