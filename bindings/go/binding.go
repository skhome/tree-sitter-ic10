package tree_sitter_ic10

// #cgo CFLAGS: -std=c11 -fPIC -I../../src
// #include "tree_sitter/parser.h"
// TSLanguage *tree_sitter_ic10(void);
import "C"

import (
	"unsafe"

	_ "github.com/skhome/tree-sitter-ic10/src"
	sitter "github.com/smacker/go-tree-sitter"
)

func GetLanguage() *sitter.Language {
	ptr := unsafe.Pointer(C.tree_sitter_ic10())
	return sitter.NewLanguage(ptr)
}
