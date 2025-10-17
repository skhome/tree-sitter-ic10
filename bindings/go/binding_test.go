package tree_sitter_ic10_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_ic10 "github.com/tree-sitter/tree-sitter-ic10/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_ic10.Language())
	if language == nil {
		t.Errorf("Error loading Stationeers MIPS grammar")
	}
}
