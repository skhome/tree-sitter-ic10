package ic10_test

import (
	"context"
	"testing"

	ic10 "github.com/skhome/tree-sitter-ic10/bindings/go"
	sitter "github.com/smacker/go-tree-sitter"
)

func TestCanLoadGrammar(t *testing.T) {
	n, _ := sitter.ParseCtx(context.Background(), []byte("move r0 42"), ic10.GetLanguage())
	if n.String() != "(program (instruction))" {
		t.Errorf("Could not parse: %s", n.String())
	}
}
