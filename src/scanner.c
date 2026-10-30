#include "tree_sitter/parser.h"

#include <wctype.h>

enum TokenType {
    L,
    CLASS_IDENTIFIER,
};

void *tree_sitter_smali_external_scanner_create() { return NULL; }

void tree_sitter_smali_external_scanner_destroy(void *payload) {}

unsigned tree_sitter_smali_external_scanner_serialize(void *payload, char *buffer) { return 0; }

void tree_sitter_smali_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {}

static void advance(TSLexer *lexer) { lexer->advance(lexer, false); }

static void skip(TSLexer *lexer) { lexer->advance(lexer, true); }

bool tree_sitter_smali_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
    if (valid_symbols[L]) {
        while (iswspace(lexer->lookahead)) {
            skip(lexer);
        }

        if (lexer->lookahead == 'L') {
            lexer->result_symbol = L;
            advance(lexer);
            return true;
        }
    }

    if (valid_symbols[CLASS_IDENTIFIER]) {
        lexer->result_symbol = CLASS_IDENTIFIER;
        bool has_chars = false;

        // Support backtick-quoted class segments, e.g. Lmy/pkg/`Class With Spaces`;
        if (lexer->lookahead == '`') {
            advance(lexer);
            while (lexer->lookahead && lexer->lookahead != '`' && lexer->lookahead != '\n' && lexer->lookahead != '\r') {
                advance(lexer);
            }
            if (lexer->lookahead == '`') {
                advance(lexer);
            }
            return true;
        }

        // Support standard and unicode identifier characters (> 127)
        while (iswalnum(lexer->lookahead) || lexer->lookahead == '_' || lexer->lookahead == '-' ||
               lexer->lookahead == '$' || (unsigned int)lexer->lookahead > 127) {
            has_chars = true;
            advance(lexer);
        }
        return has_chars;
    }

    return false;
}