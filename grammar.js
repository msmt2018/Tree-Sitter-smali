/**
 * @file Smali grammar for tree-sitter
 * @author android_zero <2049219004@qq.com and msmt8382@gmail.com> <github.com/msmt2018>
 * @author Amaan Qureshi <amaanq12@gmail.com>
 * @author Yotam Nachum <me@yotam.net>
 * @license MIT
 * @see {@link https://github.com/google/smali|official Google/smali implementation}
 * @see {@link https://source.android.com/docs/core/runtime/dalvik-bytecode|official dex bytecode reference}
 */

/* eslint-disable arrow-parens */
/* eslint-disable camelcase */
/* eslint-disable-next-line spaced-comment */
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const access_flags = [
  'public',
  'private',
  'protected',
  'static',
  'final',
  'synchronized',
  'volatile',
  'bridge',
  'transient',
  'varargs',
  'native',
  'interface',
  'abstract',
  'strictfp',
  'synthetic',
  'annotation',
  'enum',
  'declared-synchronized',
  'constructor',
];

const restriction_flags = [
  'whitelist',
  'greylist',
  'blacklist',
  'greylist-max-o',
  'greylist-max-p',
  'greylist-max-q',
  'greylist-max-r',
  'core-platform-api',
  'test-api',
];

const verification_errors = [
  'no-error',
  'generic-error',
  'no-such-class',
  'no-such-field',
  'no-such-method',
  'illegal-class-access',
  'illegal-field-access',
  'illegal-method-access',
  'class-change-error',
  'instantiation-error',
];

const primitives = ['V', 'Z', 'B', 'S', 'C', 'I', 'J', 'F', 'D'];

const opcodes = [
  'nop',
  'move',
  'move/from16',
  'move/16',
  'move-wide',
  'move-wide/from16',
  'move-wide/16',
  'move-object',
  'move-object/from16',
  'move-object/16',
  'move-result',
  'move-result-wide',
  'move-result-object',
  'move-exception',
  'return-void',
  'return-void-barrier',
  'return-void-no-barrier',
  'return',
  'return-wide',
  'return-object',
  'const/4',
  'const/16',
  'const',
  'const/high16',
  'const-wide/16',
  'const-wide/32',
  'const-wide',
  'const-wide/high16',
  'const-string',
  'const-string/jumbo',
  'const-class',
  'const-method-handle',
  'const-method-type',
  'monitor-enter',
  'monitor-exit',
  'check-cast',
  'instance-of',
  'array-length',
  'new-instance',
  'new-array',
  'filled-new-array',
  'filled-new-array/range',
  'fill-array-data',
  'throw',
  'throw-verification-error',
  'goto',
  'goto/16',
  'goto/32',
  'packed-switch',
  'sparse-switch',
  'cmpl-float',
  'cmpg-float',
  'cmpl-double',
  'cmpg-double',
  'cmp-long',
  'if-eq',
  'if-ne',
  'if-lt',
  'if-ge',
  'if-gt',
  'if-le',
  'if-eqz',
  'if-nez',
  'if-ltz',
  'if-gez',
  'if-gtz',
  'if-lez',
  'aget',
  'aget-wide',
  'aget-object',
  'aget-boolean',
  'aget-byte',
  'aget-char',
  'aget-short',
  'aput',
  'aput-wide',
  'aput-object',
  'aput-boolean',
  'aput-byte',
  'aput-char',
  'aput-short',
  'iget',
  'iget-wide',
  'iget-object',
  'iget-boolean',
  'iget-byte',
  'iget-char',
  'iget-short',
  'iget-volatile',
  'iget-wide-volatile',
  'iget-object-volatile',
  'iput',
  'iput-wide',
  'iput-object',
  'iput-boolean',
  'iput-byte',
  'iput-char',
  'iput-short',
  'iput-volatile',
  'iput-wide-volatile',
  'iput-object-volatile',
  'sget',
  'sget-wide',
  'sget-object',
  'sget-boolean',
  'sget-byte',
  'sget-char',
  'sget-short',
  'sget-volatile',
  'sget-wide-volatile',
  'sget-object-volatile',
  'sput',
  'sput-wide',
  'sput-object',
  'sput-boolean',
  'sput-byte',
  'sput-char',
  'sput-short',
  'sput-volatile',
  'sput-wide-volatile',
  'sput-object-volatile',
  'invoke-constructor',
  'invoke-custom',
  'invoke-direct',
  'invoke-direct-empty',
  'invoke-instance',
  'invoke-interface',
  'invoke-polymorphic',
  'invoke-static',
  'invoke-super',
  'invoke-virtual',
  'invoke-custom/range',
  'invoke-direct/range',
  'invoke-interface/range',
  'invoke-object-init/range',
  'invoke-polymorphic/range',
  'invoke-static/range',
  'invoke-super/range',
  'invoke-virtual/range',
  'neg-int',
  'not-int',
  'neg-long',
  'not-long',
  'neg-float',
  'neg-double',
  'int-to-long',
  'int-to-float',
  'int-to-double',
  'long-to-int',
  'long-to-float',
  'long-to-double',
  'float-to-int',
  'float-to-long',
  'float-to-double',
  'double-to-int',
  'double-to-long',
  'double-to-float',
  'int-to-byte',
  'int-to-char',
  'int-to-short',
  'add-int',
  'sub-int',
  'mul-int',
  'div-int',
  'rem-int',
  'and-int',
  'or-int',
  'xor-int',
  'shl-int',
  'shr-int',
  'ushr-int',
  'add-long',
  'sub-long',
  'mul-long',
  'div-long',
  'rem-long',
  'and-long',
  'or-long',
  'xor-long',
  'shl-long',
  'shr-long',
  'ushr-long',
  'add-float',
  'sub-float',
  'mul-float',
  'div-float',
  'rem-float',
  'add-double',
  'sub-double',
  'mul-double',
  'div-double',
  'rem-double',
  'add-int/2addr',
  'sub-int/2addr',
  'mul-int/2addr',
  'div-int/2addr',
  'rem-int/2addr',
  'and-int/2addr',
  'or-int/2addr',
  'xor-int/2addr',
  'shl-int/2addr',
  'shr-int/2addr',
  'ushr-int/2addr',
  'add-long/2addr',
  'sub-long/2addr',
  'mul-long/2addr',
  'div-long/2addr',
  'rem-long/2addr',
  'and-long/2addr',
  'or-long/2addr',
  'xor-long/2addr',
  'shl-long/2addr',
  'shr-long/2addr',
  'ushr-long/2addr',
  'add-float/2addr',
  'sub-float/2addr',
  'mul-float/2addr',
  'div-float/2addr',
  'rem-float/2addr',
  'add-double/2addr',
  'sub-double/2addr',
  'mul-double/2addr',
  'div-double/2addr',
  'rem-double/2addr',
  'add-int/lit16',
  'sub-int/lit16',
  'mul-int/lit16',
  'div-int/lit16',
  'rem-int/lit16',
  'and-int/lit16',
  'or-int/lit16',
  'xor-int/lit16',
  'add-int/lit8',
  'sub-int/lit8',
  'mul-int/lit8',
  'div-int/lit8',
  'rem-int/lit8',
  'and-int/lit8',
  'or-int/lit8',
  'xor-int/lit8',
  'shl-int/lit8',
  'shr-int/lit8',
  'ushr-int/lit8',
  'static-get',
  'static-put',
  'instance-get',
  'instance-put',
  'execute-inline',
  'execute-inline/range',
  'iget-quick',
  'iget-wide-quick',
  'iget-object-quick',
  'iput-quick',
  'iput-wide-quick',
  'iput-object-quick',
  'iput-boolean-quick',
  'iput-byte-quick',
  'iput-char-quick',
  'iput-short-quick',
  'invoke-virtual-quick',
  'invoke-virtual-quick/range',
  'invoke-super-quick',
  'invoke-super-quick/range',
  'rsub-int',
  'rsub-int/lit8',
];

/**
 * Returns an optional tree-sitter rule that matches rule at least once, with a repeat of `,` + `rule`
 * @param {Rule} rule - tree-sitter rule
 * @param {boolean?} trailing_separator - The trailing separator to use.
 * @return {ChoiceRule}
 */
function commaSep(rule, trailing_separator = false) {
  const sep1 = trailing_separator ?
    seq(rule, repeat(seq(',', rule)), optional(',')) :
    seq(rule, repeat(seq(',', rule)));

  return optional(sep1);
}

/**
 * Creates a rule to match one or more of the rules separated by the separator
 * @param {Rule|RegExp} rule
 * @param {Rule|RegExp|string} separator
 * @return {SeqRule}
 */
function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)));
}

module.exports = grammar({
  name: 'smali',

  conflicts: $ => [
    [$.field_definition],
    [$.param_directive],
    [$.parameter_directive],
  ],

  externals: $ => [
    $.L,
    $._class_ident,
  ],

  extras: $ => [
    $.comment,
    /\s/,
  ],

  supertypes: $ => [
    $.directive,
    $.literal,
    $.register,
    $.statement,
    $.type,
    $.value,
  ],

  word: $ => $.identifier,

  rules: {
    // Google/smali allows top-level directives to appear in arbitrary order
    class_definition: $ => seq(
      $.class_directive,
      repeat(choice(
        $.super_directive,
        $.source_directive,
        $.implements_directive,
        $.annotation_directive,
        $.field_definition,
        $.method_definition,
      )),
    ),

    // class related
    class_directive: $ => seq(
      '.class',
      optional($.access_modifiers),
      $.class_identifier,
    ),
    super_directive: $ => seq('.super', $.class_identifier),
    source_directive: $ => seq('.source', optional($.string)),
    implements_directive: $ => seq('.implements', $.class_identifier),

    // field definition
    field_definition: $ => seq(
      '.field',
      optional($.access_modifiers),
      $._field_body,
      optional(seq('=', $.value)),
      optional(seq(
        repeat($.annotation_directive),
        '.end field',
      )),
    ),

    // Method definition
    method_definition: $ => seq(
      '.method',
      optional($.access_modifiers),
      $.method_signature,
      repeat($.statement),
      '.end method',
    ),

    // annotation related
    annotation_directive: $ => seq(
      '.annotation',
      $.annotation_visibility,
      $.class_identifier,
      repeat($.annotation_property),
      '.end annotation',
    ),
    annotation_visibility: _ => choice('system', 'build', 'runtime'),
    annotation_property: $ => seq($.annotation_key, '=', $.annotation_value),
    annotation_key: $ => choice($.identifier, /\w+/),
    annotation_value: $ => choice(
      $.literal,
      $.body,
      $.list,
      $.enum_reference,
      $.subannotation_directive,
      $.type,
    ),

    subannotation_directive: $ => seq(
      '.subannotation',
      $.class_identifier,
      repeat($.annotation_property),
      '.end subannotation',
    ),

    // Parameter directives according to smaliParser.g:
    param_directive: $ => seq(
      '.param',
      $.register,
      optional(seq(optional(','), choice($.string, alias($.identifier, $.param_identifier)))),
      optional(seq(
        repeat($.annotation_directive),
        '.end param',
      )),
    ),

    // Legacy baksmali .parameter directive
    parameter_directive: $ => seq(
      '.parameter',
      optional(choice($.string, alias($.identifier, $.param_identifier))),
      optional(seq(
        repeat($.annotation_directive),
        '.end parameter',
      )),
    ),

    // code lines
    statement: $ => choice(
      $.label,
      $.jmp_label,
      $.directive,
      $.annotation_directive,
      $.expression,
    ),

    // expression
    expression: $ => seq(
      $.opcode,
      commaSep($.value),
      '\n',
    ),

    opcode: _ => choice(...opcodes),

    value: $ => choice(
      $.type,
      $.list,
      $.label,
      $.jmp_label,
      $.range,
      $.register,
      $.body,
      $.literal,
      $.enum_reference,
      $.subannotation_directive,
      $.method_handle,
      $.custom_invoke,
      $.inline_index,
      $.vtable_index,
      $.field_offset,
      $.verification_error_type,
      $.identifier,
    ),

    // code declarations
    directive: $ => choice(
      $.line_directive,
      $.locals_directive,
      $.local_directive,
      $.registers_directive,
      $.param_directive,
      $.parameter_directive,
      $.catch_directive,
      $.catchall_directive,
      $.packed_switch_directive,
      $.sparse_switch_directive,
      $.array_data_directive,
      $.end_local_directive,
      $.restart_local_directive,
      $.prologue_directive,
      $.epilogue_directive,
      $.source_directive,
    ),
    line_directive: $ => seq('.line', $.number),
    locals_directive: $ => seq('.locals', $.number),
    local_directive: $ => seq(
      '.local',
      $.register,
      optional(seq(
        ',', choice($.string, $.identifier, $.null),
        ':', $.type,
        optional(seq(',', $.string)),
      )),
    ),
    end_local_directive: $ => seq('.end local', $.register),
    restart_local_directive: $ => seq('.restart local', $.register),
    registers_directive: $ => seq('.registers', $.number),

    catch_directive: $ => seq(
      '.catch',
      $.type,
      '{',
      field('start', choice($.label, $.jmp_label)),
      '..',
      field('end', choice($.label, $.jmp_label)),
      '}',
      field('handler', choice($.label, $.jmp_label)),
    ),
    catchall_directive: $ => seq(
      '.catchall',
      '{',
      field('start', choice($.label, $.jmp_label)),
      '..',
      field('end', choice($.label, $.jmp_label)),
      '}',
      field('handler', choice($.label, $.jmp_label)),
    ),
    packed_switch_directive: $ => seq(
      '.packed-switch',
      $.number,
      repeat(choice($.label, $.jmp_label)),
      '.end packed-switch',
    ),
    sparse_switch_directive: $ => seq(
      '.sparse-switch',
      repeat(seq($.number, '->', choice($.label, $.jmp_label))),
      '.end sparse-switch',
    ),
    array_data_directive: $ => seq(
      '.array-data',
      field('element_width', $.number),
      field('value', repeat($.literal)),
      '.end array-data',
    ),
    prologue_directive: _ => '.prologue',
    epilogue_directive: _ => '.epilogue',

    // Pure terminal token matching Google/smali JFlex specification
    identifier: _ => token(choice(
      /<?[a-zA-Z_$\u00a1-\u1fff\u2010-\u2027\u2030-\ud7ff\ue000-\uffef][a-zA-Z0-9_\-$\u00a1-\u1fff\u2010-\u2027\u2030-\ud7ff\ue000-\uffef]*>?/,
      /`[^`\r\n]+`/,
    )),

    class_identifier: $ => seq(
      alias($.L, 'L'),
      sep1(alias($._class_ident, $.identifier), '/'),
      ';',
    ),

    label: _ => token(seq(':', /<?[a-zA-Z0-9_\-$]+>?/)),
    jmp_label: _ => prec(-1, token(/[a-zA-Z0-9_$]+:/)),

    // various bodies
    body: $ => choice(
      $._field_body,
      $._full_field_body,
      $.method_signature,
      alias($._method_signature_body, $.method_signature),
      $.full_method_signature,
    ),
    _field_body: $ => seq(
      alias(choice($.identifier, $.number), $.field_identifier),
      ':',
      alias($.type, $.field_type),
    ),
    method_signature: $ => seq(
      alias(
        choice(
          seq(optional('-'), $.identifier),
          $.number,
        ),
        $.method_identifier,
      ),
      $._method_signature_body,
    ),
    _method_signature_body: $ => seq(
      '(',
      alias(repeat($.type), $.parameters),
      ')',
      $.type,
    ),

    method_handle: $ => seq(
      choice($.opcode, $.identifier),
      '@',
      choice($._field_body, $._full_field_body, $.method_signature, $.full_method_signature),
    ),
    _full_field_body: $ => seq(
      choice($.class_identifier, $.array_type),
      '->',
      $._field_body,
    ),
    full_method_signature: $ => seq(
      choice($.class_identifier, $.array_type),
      '->',
      $.method_signature,
    ),

    // Call site invocation (invoke-custom), strictly keeping arguments disjoint from parameter type lists
    custom_invoke: $ => seq(
      $.identifier,
      '(', commaSep(choice($.literal, $.body, $.method_handle)), ')',
      '@',
      choice($._field_body, $._full_field_body, $.method_signature, $.full_method_signature),
    ),

    // ODEX & verification tokens
    inline_index: _ => /inline@0x[0-9a-fA-F]+/,
    vtable_index: _ => /vtable@0x[0-9a-fA-F]+/,
    field_offset: _ => /field@0x[0-9a-fA-F]+/,
    verification_error_type: _ => choice(...verification_errors),

    // types
    type: $ => choice(
      $.primitive_type,
      $.class_identifier,
      $.array_type,
    ),
    array_type: $ => seq('[', $.type),
    primitive_type: _ => choice(
      token(choice(...primitives)),
      token(prec(1, choice(...primitives))),
    ),

    access_modifiers: $ => repeat1($.access_modifier),
    access_modifier: _ => choice(...access_flags.concat(restriction_flags)),

    enum_reference: $ => seq(
      '.enum',
      choice($._field_body, $._full_field_body),
    ),

    // registers
    register: $ => choice($.variable, $.parameter),
    variable: _ => /v\d+/,
    parameter: _ => /p\d+/,

    // lists & ranges
    list: $ => seq(
      '{',
      commaSep($.value),
      '}',
    ),
    range: $ => seq(
      '{',
      seq(
        field('start', choice($.register, $.number, $.jmp_label, $.label)),
        '..',
        field('end', choice($.register, $.number, $.jmp_label, $.label)),
      ),
      '}',
    ),

    // literals
    literal: $ => choice(
      $.number,
      $.float,
      $.NaN,
      $.Infinity,
      $.string,
      $.boolean,
      $.character,
      $.null,
    ),

    number: _ => token(choice(
      seq(
        optional(choice('-', '+')),
        choice(
          seq(/0[xX]/, /[0-9a-fA-F](_?[0-9a-fA-F])*/),
          seq('0', /[0-7](_?[0-7])*/),
          /[0-9](_?[0-9])*/,
        ),
        optional(/[LlSsTt]/),
      ),
    )),

    float: _ => token(choice(
      // Decimal floating-point numbers
      seq(
        optional(choice('-', '+')),
        choice(
          seq(/[0-9]+/, '.', /[0-9]*/, optional(seq(/[eE]/, optional(choice('-', '+')), /[0-9]+/))),
          seq('.', /[0-9]+/, optional(seq(/[eE]/, optional(choice('-', '+')), /[0-9]+/))),
          seq(/[0-9]+/, seq(/[eE]/, optional(choice('-', '+')), /[0-9]+/)),
          seq(/[0-9]+/, /[fFdD]/),
        ),
        optional(/[fFdD]/),
      ),
      // Hexadecimal floating-point numbers (Binary Exponent)
      seq(
        optional(choice('-', '+')),
        /0[xX]/,
        choice(
          seq(/[0-9a-fA-F]+/, optional(seq('.', /[0-9a-fA-F]*/)), seq(/[pP]/, optional(choice('-', '+')), /[0-9]+/)),
          seq('.', /[0-9a-fA-F]+/, seq(/[pP]/, optional(choice('-', '+')), /[0-9]+/)),
        ),
        optional(/[fFdD]/),
      ),
    )),

    NaN: _ => token(prec(1, /[nN][aA][nN][fFdD]?/)),

    Infinity: _ => token(prec(1, seq(
      optional(choice('-', '+')),
      /[iI][nN][fF][iI][nN][iI][tT][yY][fFdD]?/,
    ))),

    string: $ => seq(
      '"',
      repeat(choice(
        $.string_fragment,
        $._escape_sequence,
      )),
      '"',
    ),

    string_fragment: _ => token.immediate(prec(1, /[^"\\]+/)),

    _escape_sequence: $ => choice(
      prec(2, token.immediate(seq('\\', /[^abfnrtvxu'\"\\\?]/))),
      prec(1, $.escape_sequence),
    ),
    escape_sequence: _ => token.immediate(seq(
      '\\',
      choice(
        /[^xu0-7]/,
        /[0-7]{1,3}/,
        /x[0-9a-fA-F]{2}/,
        /u[0-9a-fA-F]{4}/,
        /u\{[0-9a-fA-F]+\}/,
      ),
    )),

    boolean: _ => choice('true', 'false'),

    character: $ => seq(
      '\'',
      optional(choice(
        $._escape_sequence,
        /[^\\']/,
      )),
      '\'',
    ),

    null: _ => 'null',

    comment: _ => token(seq('#', /.*/)),
  },
});